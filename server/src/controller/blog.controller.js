import Blog from '../models/Blog.model.js'; 
import User from '../models/user.models.js'; 

// Tạo một blog mới
export const createBlog = async (req, res) => {
  try {
    const { blogTitle, blogContent } = req.body;
    const x = req.body.title;
    console.log(x);
    const userId = req.userId;
  if (!blogTitle || !blogContent) {
    return res.status(400).json({ message: 'blogTitle, and blogContent are required' });
  }
    // Kiểm tra xem user có tồn tại hay không
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const newBlog = await Blog.create({
      userId,
      blogTitle,
      blogContent,
      blogStatus: true,  // Mặc định blog mới sẽ có trạng thái active
    });

    res.status(201).json(newBlog);
  } catch (err) {
    console.error('Error creating blog:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Lấy tất cả các blog
export const getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.findAll({
      include: User, // Bao gồm thông tin người dùng
    });
    res.status(200).json(blogs);
  } catch (err) {
    console.error('Error fetching blogs:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Lấy blog theo ID
export const getBlogById = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ message: 'Blog ID is required' });
  }

  try {
    const blog = await Blog.findByPk(id, {
      include: User, // Bao gồm thông tin người dùng
    });

    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }

    res.status(200).json(blog);
  } catch (err) {
    console.error('Error fetching blog:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Cập nhật blog
export const updateBlog = async (req, res) => {
  const { id } = req.params;
  const { blogTitle, blogContent, blogStatus } = req.body;

  if (!id || (!blogTitle && !blogContent && blogStatus === undefined)) {
    return res.status(400).json({ message: 'Blog ID, and at least one of blogTitle, blogContent, or blogStatus are required' });
  }

  try {
    const blog = await Blog.findByPk(id);

    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }

    // Cập nhật blog với các thông tin mới
    await blog.update({
      blogTitle: blogTitle || blog.blogTitle,
      blogContent: blogContent || blog.blogContent,
      blogStatus: blogStatus !== undefined ? blogStatus : blog.blogStatus,
    });

    res.status(200).json({ message: 'Blog updated successfully', blog });
  } catch (err) {
    console.error('Error updating blog:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Xóa blog
export const deleteBlog = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ message: 'Blog ID is required' });
  }

  try {
    const blog = await Blog.findByPk(id);

    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }

    // Xóa blog
    await blog.destroy();
    res.status(200).json({ message: 'Blog deleted successfully' });
  } catch (err) {
    console.error('Error deleting blog:', err);
    res.status(500).json({ message: 'Server error' });
  }
};
