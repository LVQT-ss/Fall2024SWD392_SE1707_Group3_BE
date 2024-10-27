import Blog from '../models/Blog.model.js'; 
import User from '../models/user.models.js'; 

// Tạo một blog mới
export const createBlog = async (req, res) => {
  try {
    const { blogTitle, blogContent, image } = req.body;
    const userId = req.userId;
    
    if (!blogTitle || !blogContent) {
      return res.status(400).json({ message: 'blogTitle and blogContent are required' });
    }

    // Check if user exists
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const newBlog = await Blog.create({
      userId,
      blogTitle,
      blogContent,
      blogStatus: 'active',  // Mặc định là active
      image,  // Thêm trường hình ảnh nếu có
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

// Get all active blogs (with status active)
export const getActiveBlogs = async (req, res) => {
  try {
    const activeBlogs = await Blog.findAll({
      where: { blogStatus: 'active' }, // Sửa thành 'active'
      include: User, // Optionally include user information
    });
    res.status(200).json(activeBlogs);
  } catch (err) {
    console.error('Error fetching active blogs:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Update blog status only
export const updateBlogStatus = async (req, res) => {
  const { id } = req.params;
  const { blogStatus } = req.body;

  if (!id || !['active', 'inActive', 'waiting'].includes(blogStatus)) { // Cập nhật kiểm tra
    return res.status(400).json({ message: 'Invalid blog ID or status value' });
  }

  try {
    const blog = await Blog.findByPk(id);

    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }

    await blog.update({ blogStatus });

    res.status(200).json({ message: 'Blog status updated successfully', blog });
  } catch (err) {
    console.error('Error updating blog status:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Cập nhật blog
export const updateBlog = async (req, res) => {
  const { id } = req.params;
  const { blogTitle, blogContent, image } = req.body;

  if (!id || (!blogTitle && !blogContent && !image)) {
    return res.status(400).json({ message: 'No fields to update' });
  }

  try {
    const blog = await Blog.findByPk(id);
    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }

    // Update blog with new information (excluding blogStatus)
    await blog.update({
      blogTitle: blogTitle || blog.blogTitle,
      blogContent: blogContent || blog.blogContent,
      image: image || blog.image,  // Update the image if provided
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
