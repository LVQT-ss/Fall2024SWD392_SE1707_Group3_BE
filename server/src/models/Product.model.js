import { DataTypes } from 'sequelize';
import sequelize from '../database/db.js';
import User from './user.models.js';
import Category from './Category.model.js';

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
      model: Category,
      key: 'categoryId',
    },
    onDelete: 'CASCADE',
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
    type: DataTypes.ENUM('active', 'inActive', 'waiting'),  // Updated values
    defaultValue: 'waiting',
  },
  image: {  
    type: DataTypes.STRING,
    allowNull: true,
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
