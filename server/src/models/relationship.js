import KoiFish from './Koifish.model.js';
import Pond from './Pond.model.js';
import FishTransfer from './FishTransfer.model.js';
import User from './User.model.js';

const applyRelationships = () => {
  // User relationships
  User.hasMany(KoiFish, { foreignKey: 'userId' });
  User.hasMany(Pond, { foreignKey: 'userId' });

  // KoiFish relationships
  KoiFish.belongsTo(Pond, { foreignKey: 'currentPondId' });
  KoiFish.belongsTo(User, { foreignKey: 'userId' });
  KoiFish.hasMany(FishTransfer, { foreignKey: 'fishId' });

  // Pond relationships
  Pond.hasMany(KoiFish, { foreignKey: 'currentPondId' });
  Pond.belongsTo(User, { foreignKey: 'userId' });
  Pond.hasMany(FishTransfer, { as: 'OldTransfers', foreignKey: 'oldPondId' });
  Pond.hasMany(FishTransfer, { as: 'NewTransfers', foreignKey: 'newPondId' });

  // FishTransfer relationships
  FishTransfer.belongsTo(KoiFish, { foreignKey: 'fishId' });
  FishTransfer.belongsTo(Pond, { as: 'OldPond', foreignKey: 'oldPondId' });
  FishTransfer.belongsTo(Pond, { as: 'NewPond', foreignKey: 'newPondId' });
};

export default applyRelationships;