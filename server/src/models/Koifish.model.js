import { DataTypes } from 'sequelize';
import sequelize from '../database/db.js';
import Pond from './Pond.model.js';
import User from './user.models.js';

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
}, {
  tableName: 'koi_fish',
  timestamps: false,
});

// KoiFish and  Pond relationship
KoiFish.belongsTo(Pond, { foreignKey: 'currentPondId' });
Pond.hasMany(KoiFish, { foreignKey: 'currentPondId' });

KoiFish.belongsTo(User, { foreignKey: 'userId' });
User.hasMany(KoiFish, { foreignKey: 'userId' });

export default KoiFish;
