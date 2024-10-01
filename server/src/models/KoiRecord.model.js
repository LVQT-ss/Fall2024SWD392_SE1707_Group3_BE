import { DataTypes } from 'sequelize';
import sequelize from '../database/db.js';
import KoiFish from './KoiFish.model.js';  

const KoiRecord = sequelize.define('KoiRecord', {
  koiRecordId: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  fishId: {
    type: DataTypes.INTEGER,
    references: {
      model: KoiFish, 
      key: 'fishId'
    },
    allowNull: false,
  },
  recordDate: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,  // Automatically set the record date
  },
  length: {
    type: DataTypes.DECIMAL(5, 2),
    allowNull: false,
  },
  weight: {
    type: DataTypes.DECIMAL(5, 2),
    allowNull: false,
  },
  bodyShape: {
    type: DataTypes.ENUM('slim', 'normal', 'heavy'),
    allowNull: false,
  },
  age: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  calculateWeight: {
    type: DataTypes.DECIMAL(10, 4),
  },
  foodRequire: {
    type: DataTypes.DECIMAL(10, 4),
  },
}, {
  tableName: 'koi_record',
  timestamps: false,
  hooks: {
    beforeCreate: (record) => {
      // Calculate body shape factor
      const bodyShapeFactor = record.bodyShape === 'slim' ? 1.5 :
                             record.bodyShape === 'normal' ? 1.7 : 2;

      // Calculate age factor
      let ageFactor;
      if (record.age <= 12) {
        ageFactor = 1; // Young (1-12 months)
      } else if (record.age <= 24) {
        ageFactor = 0.9; // Adult (13-24 months)
      } else {
        ageFactor = 0.85; // Old (25+ months)
      }

      // Calculate weight
      record.calculateWeight = record.length * record.length * record.length * bodyShapeFactor * ageFactor * 0.0001;

      // Calculate food percentage based on age
      let foodPercentage;
      if (record.age <= 12) {
        foodPercentage = 0.025; // 2.5% for young koi
      } else if (record.age <= 24) {
        foodPercentage = 0.0175; // 1.75% for adult koi
      } else {
        foodPercentage = 0.0125; // 1.25% for old koi
      }

      // Calculate food requirement
      record.foodRequire = record.calculateWeight * ageFactor * foodPercentage;
    }
  }
});

// Associate KoiRecord with KoiFish
KoiRecord.belongsTo(KoiFish, { foreignKey: 'fishId' });
KoiFish.hasMany(KoiRecord, { foreignKey: 'fishId' });

export default KoiRecord;
