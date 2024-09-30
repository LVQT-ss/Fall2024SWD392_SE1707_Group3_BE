import { DataTypes } from 'sequelize';
import sequelize from '../database/db.js';
import Pond from './Pond.model.js';

const KoiFish = sequelize.define('KoiFish', {
  fishId: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  koiName: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  koiImage: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  koiGender: {
    type: DataTypes.STRING(50),
    allowNull: true,
  },
  koiBreed: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  koiOrigin: {
    type: DataTypes.DECIMAL(5, 2),
    allowNull: true,
  },
  price: {
    type: DataTypes.DECIMAL(5, 2),
    allowNull: true,
  },
}, {
  tableName: 'koi_fish',
  timestamps: false,
});

// Quan hệ giữa KoiFish và Pond
KoiFish.belongsTo(Pond, { foreignKey: 'currentPondId' });
Pond.hasMany(KoiFish, { foreignKey: 'currentPondId' });

export default KoiFish;
