import { DataTypes } from 'sequelize';
import sequelize from '../database/db.js';
import KoiFish from './Koifish.model.js';

const KoiHealth = sequelize.define('KoiHealth', {
  healthId: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  healthDate: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  illness: {
    type: DataTypes.STRING(100),
    allowNull: true,
  },
  endDate: {
    type: DataTypes.DATEONLY,
    allowNull: true,
  },
  address: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  medicine: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  price: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
}, {
  tableName: 'koi_health',
  timestamps: false,
});

// Relationship between KoiHealth and KoiFish
KoiHealth.belongsTo(KoiFish, { foreignKey: 'fishId' });
KoiFish.hasMany(KoiHealth, { foreignKey: 'fishId' });

export default KoiHealth;
