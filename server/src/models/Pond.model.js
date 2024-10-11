import { DataTypes } from 'sequelize';
import sequelize from '../database/db.js';
import User from './user.models.js';

const Pond = sequelize.define('Pond', {
  pondId: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  pondName: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  pondImage: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  pondSize: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  pondDepth: {
    type: DataTypes.DECIMAL(5, 2),
    allowNull: false,
  },
  pondVolume: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  pondDrains: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  pondAeroCapacity: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  pondCapacityOfKoiFish: {  // New attribute
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
  tableName: 'pond',
  timestamps: false,
});

// Relationship between Pond and User
Pond.belongsTo(User, { foreignKey: 'userId' });
User.hasMany(Pond, { foreignKey: 'userId' });

export default Pond;
