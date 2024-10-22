import { DataTypes } from 'sequelize';
import sequelize from '../database/db.js';
import Product from './Product.model.js';  
import WaterParameter from './waterPara.model.js';  

const ProductRecommend = sequelize.define('ProductRecommend', {
  recommendId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  productId: {
    type: DataTypes.INTEGER,
    references: {
      model: Product,  
      key: 'productId',
    },
  },
  waterParameterId: {
    type: DataTypes.INTEGER,
    references: {
      model: WaterParameter,  
      key: 'waterParameterId',
    },
  },
}, {
  tableName: 'ProductRecommends',
  timestamps: false,
});

// Associations
ProductRecommend.belongsTo(Product, { foreignKey: 'productId', onDelete: 'CASCADE' });
Product.hasMany(ProductRecommend, { foreignKey: 'productId', onDelete: 'CASCADE' });

ProductRecommend.belongsTo(WaterParameter, { foreignKey: 'waterParameterId', onDelete: 'CASCADE' });
WaterParameter.hasMany(ProductRecommend, { foreignKey: 'waterParameterId', onDelete: 'CASCADE' });

export default ProductRecommend;
