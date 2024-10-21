import { DataTypes } from 'sequelize';
import sequelize from '../database/db.js';

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
    type: DataTypes.STRING(20),
    allowNull: true,
  },
  koiOrigin: {
    type: DataTypes.STRING(20),
    allowNull: true,
  },
  price: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  status: {
    type: DataTypes.ENUM('active', 'inactive'),
    defaultValue: 'active',
    allowNull: false,
  },
  currentPondId: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
  tableName: 'koi_fish',
  timestamps: false,
});

export default KoiFish;