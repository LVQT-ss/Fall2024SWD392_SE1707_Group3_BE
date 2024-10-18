import { DataTypes } from 'sequelize';
import sequelize from '../config/db.config.js';
import Product from './Product.model.js'; // Import model Product để liên kết

const Category = sequelize.define('Category', {
  categoryId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  productId: {
    type: DataTypes.INTEGER,
    references: {
      model: Product, // Liên kết với model Product
      key: 'productId',
    },
    onDelete: 'CASCADE', // Khi xóa product thì category sẽ bị xóa theo
  },
  categoryName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  categoryType: {
    type: DataTypes.STRING,
  },
}, {
  tableName: 'categories',
  timestamps: false,
});

Product.hasMany(Category, { foreignKey: 'productId' }); // 1 product có nhiều categories
Category.belongsTo(Product, { foreignKey: 'productId' });

export default Category;
