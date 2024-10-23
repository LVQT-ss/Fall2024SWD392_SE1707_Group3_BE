import { DataTypes } from 'sequelize';
import sequelize from '../database/db.js';
import Category from './category.model.js';
import User from './user.models.js';

const Product = sequelize.define('Product', {
  productId: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: 'userId',
    },
  },
  categoryId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Category, // Link to Category model
      key: 'categoryId',
    },
    onDelete: 'CASCADE', // When a category is deleted, related products will also be deleted
  },
  productName: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  productDescription: {
    type: DataTypes.STRING(256),
    allowNull: false,
  },
  productPrice: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  isActive: {  
    type: DataTypes.BOOLEAN,
    defaultValue: true,  // Products are active by default
  },
}, {
  tableName: 'Product',
  timestamps: false,
});

// Set up relationships
Product.belongsTo(Category, { foreignKey: 'categoryId' }); // Each product belongs to a category
Category.hasMany(Product, { foreignKey: 'categoryId' }); // A category has many products

Product.belongsTo(User, { foreignKey: 'userId' }); // Each product belongs to a user
User.hasMany(Product, { foreignKey: 'userId' });

export default Product;
