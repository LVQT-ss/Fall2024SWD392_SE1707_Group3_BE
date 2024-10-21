import { DataTypes } from 'sequelize';
import sequelize from '../database/db.js';
import KoiFish from './Koifish.model.js';
import Pond from './Pond.model.js';

const FishTransfer = sequelize.define('FishTransfer', {
  transferId: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  fishId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: KoiFish,
      key: 'fishId'
    }
  },
  oldPondId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Pond,
      key: 'pondId'
    }
  },
  newPondId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Pond,
      key: 'pondId'
    }
  },
  transferDate: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW
  },
  reason: {
    type: DataTypes.STRING(255),
    allowNull: true
  }
}, {
  tableName: 'fish_transfer',
  timestamps: false
});

// Associations
FishTransfer.belongsTo(KoiFish, { foreignKey: 'fishId' });
FishTransfer.belongsTo(Pond, { as: 'OldPond', foreignKey: 'oldPondId' });
FishTransfer.belongsTo(Pond, { as: 'NewPond', foreignKey: 'newPondId' });

export default FishTransfer;
