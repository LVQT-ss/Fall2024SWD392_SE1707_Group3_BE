import { DataTypes } from 'sequelize';
import sequelize from '../database/db.js';
import Category from './Category.model.js';  
import WaterParameter from './waterPara.model.js';  
import Product from './Product.model.js';

const ProductRecommend = sequelize.define('ProductRecommend', {
  recommendId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  categoryId: {
    type: DataTypes.INTEGER,
    references: {
      model: Category,  
      key: 'categoryId',
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
ProductRecommend.belongsTo(Category, { foreignKey: 'categoryId', onDelete: 'CASCADE' });
Category.hasMany(ProductRecommend, { foreignKey: 'categoryId', onDelete: 'CASCADE' });

ProductRecommend.belongsTo(WaterParameter, { foreignKey: 'waterParameterId', onDelete: 'CASCADE' });
WaterParameter.hasMany(ProductRecommend, { foreignKey: 'waterParameterId', onDelete: 'CASCADE' });

ProductRecommend.belongsTo(Product, { foreignKey: 'categoryId', targetKey: 'categoryId' });
Product.hasMany(ProductRecommend, { foreignKey: 'categoryId' });

export default ProductRecommend;
