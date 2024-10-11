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
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true,  
  },
}, {
  tableName: 'blog',
  timestamps: false,
});

// Quan hệ giữa blog và User
Blog.belongsTo(User, { foreignKey: 'userId' });
User.hasMany(Blog, { foreignKey: 'userId' });

export default Blog;
