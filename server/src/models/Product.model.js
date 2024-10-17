import { DataTypes } from 'sequelize';
import sequelize from '../database/db.js';
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
      model: User, // Liên kết với model User
      key: 'userId',
    },
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
  inStock: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
  tableName: 'Product',
  timestamps: false,
});

Product.belongsTo(User, { foreignKey: 'userId' }); // Quan hệ giữa Product và User
User.hasMany(Product, { foreignKey: 'userId' });
export default Product;
