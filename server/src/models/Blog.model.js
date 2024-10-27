import { DataTypes } from 'sequelize';
import sequelize from '../database/db.js';
import User from './user.models.js';

const Blog = sequelize.define('Blog', {
  blogId: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  blogTitle: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  blogContent: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  blogDate: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
  blogStatus: {
    type: DataTypes.ENUM('active', 'inActive', 'waiting'), // Cập nhật giá trị ở đây
    allowNull: false,
    defaultValue: 'waiting', // Mặc định là pending nếu không chỉ định
  },
  image: {
    type: DataTypes.STRING,
    allowNull: true,  // Trường tùy chọn cho hình ảnh
  },
}, {
  tableName: 'blog',
  timestamps: false,
});

// Relationships
Blog.belongsTo(User, { foreignKey: 'userId' });
User.hasMany(Blog, { foreignKey: 'userId' });

export default Blog;
