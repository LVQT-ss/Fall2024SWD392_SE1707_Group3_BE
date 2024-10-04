
import Comment from './models/comment.model.js';

// Tạo một bình luận mới
export const createComment = async (req, res) => {
  const { commentText, userId, blogId } = req.body;

  // Kiểm tra xem các trường cần thiết có được cung cấp không
  if (!commentText || !userId || !blogId) {
    return res.status(400).json({ message: 'Comment text, userId, and blogId are required' });
  }

  try {
    const newComment = await Comment.create({
      commentText,
      commentDate: new Date(),  // Thời gian bình luận
      userId,
      blogId,
    });

    res.status(201).json(newComment);
  } catch (err) {
    console.error('Error creating comment:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Cập nhật bình luận
export const updateComment = async (req, res) => {
  const { id } = req.params;
  const { commentText } = req.body;

  // Kiểm tra nếu id hoặc dữ liệu mới không được cung cấp
  if (!id || !commentText) {
    return res.status(400).json({ message: 'Comment ID and new comment text are required' });
  }

  try {
    const comment = await Comment.findByPk(id);

    if (!comment) {
      return res.status(404).json({ message: 'Comment not found' });
    }

    // Cập nhật nội dung bình luận
    await comment.update({
      commentText,
    });

    res.json({ message: 'Comment updated successfully' });
  } catch (err) {
    console.error('Error updating comment:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Xóa bình luận
export const deleteComment = async (req, res) => {
  const { id } = req.params;

  // Kiểm tra nếu id không được cung cấp
  if (!id) {
    return res.status(400).json({ message: 'Comment ID is required' });
  }

  try {
    const comment = await Comment.findByPk(id);

    if (!comment) {
      return res.status(404).json({ message: 'Comment not found' });
    }

    // Xóa bình luận
    await comment.destroy();
    res.json({ message: 'Comment deleted successfully' });
  } catch (err) {
    console.error('Error deleting comment:', err);
    res.status(500).json({ message: 'Server error' });
  }
};
