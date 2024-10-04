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
    allowNull: false,  // Không cho phép để trống
  },
  blogContent: {
    type: DataTypes.TEXT,  // Định nghĩa blogContent là TEXT vì nội dung có thể dài
    allowNull: false,
  },
  blogDate: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,  // Tự động gán ngày giờ hiện tại khi tạo blog
  },
  blogStatus: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true,  // Mặc định là true (blog đang hoạt động)
  },
}, {
  tableName: 'blog',
  timestamps: false,
});

// Quan hệ giữa blog và User
Blog.belongsTo(User, { foreignKey: 'userId' });
User.hasMany(Blog, { foreignKey: 'userId' });

export default Blog;
