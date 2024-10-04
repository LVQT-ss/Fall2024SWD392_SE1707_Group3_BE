import { DataTypes } from 'sequelize';
import sequelize from '../database/db.js';
import User from './user.models.js';
import Blog from './Blog.model.js';
const Comment = sequelize.define('Comment', {
  commentId: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  commentText: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  commentDate: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,  // Tự động generate thời gian hiện tại
  },
}, {
  tableName: 'comment',
  timestamps: false,
});

// Quan hệ giữa comment và User, blog
Comment.belongsTo(User, { foreignKey: 'userId' });
User.hasMany(Comment, { foreignKey: 'userId' });
Blog.hasMany(Comment, { foreignKey: 'blogId' })
export default Comment;
