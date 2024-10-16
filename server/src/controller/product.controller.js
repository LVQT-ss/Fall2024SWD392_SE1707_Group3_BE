import Product from "../models/Product.model.js";
import User from "../models/user.models.js";

// Tạo sản phẩm mới
export const createProduct = async (req, res) => {
  const { userId, productName, productDescription, productPrice, inStock } = req.body;
  // Kiểm tra các trường bắt buộc
  if (!userId || !productName || !productDescription || productPrice === undefined || inStock === undefined) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  try {
    const newProduct = await Product.create({
      userId,
      productName,
      productDescription,
      productPrice,
      inStock,
    });
    res.status(201).json(newProduct);
  } catch (err) {
    console.error('Error creating product:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Lấy tất cả các sản phẩm
export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.findAll({
      include: {
        model: User,
        attributes: ['userId', 'username'], // Bao gồm thông tin người dùng (User)
      },
    });
    res.status(200).json(products);
  } catch (err) {
    console.error('Error fetching products:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Lấy sản phẩm theo ID
export const getProductById = async (req, res) => {
  const { productId } = req.params;  // Use 'productId' to match the route parameter
  if (!productId) {
    return res.status(400).json({ message: 'Product ID is required' });
  }

  try {
    const product = await Product.findByPk(productId, {
      include: {
        model: User,
        attributes: ['userId', 'username'], // Include user info
      },
    });

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.status(200).json(product);
  } catch (err) {
    console.error('Error fetching product:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Cập nhật sản phẩm
export const updateProduct = async (req, res) => {
  const { productId } = req.params;  // Sử dụng đúng biến productId
  const { productName, productDescription, productPrice, inStock } = req.body;

  if (!productId) {
    return res.status(400).json({ message: 'Product ID is required' });
  }

  try {
    const product = await Product.findByPk(productId);  // Sử dụng productId thay vì id

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Cập nhật thông tin sản phẩm nếu được cung cấp
    await product.update({
      productName: productName !== undefined ? productName : product.productName,
      productDescription: productDescription !== undefined ? productDescription : product.productDescription,
      productPrice: productPrice !== undefined ? productPrice : product.productPrice,
      inStock: inStock !== undefined ? inStock : product.inStock,
    });

    res.status(200).json({ message: 'Product updated successfully', product });
  } catch (err) {
    console.error('Error updating product:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Xóa sản phẩm
// Xóa sản phẩm
export const deleteProduct = async (req, res) => {
  const { productId } = req.params;  // Thay đổi từ 'id' thành 'productId'

  if (!productId) {
    return res.status(400).json({ message: 'Product ID is required' });
  }

  try {
    const product = await Product.findByPk(productId);  // Sử dụng 'productId'

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    await product.destroy();
    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (err) {
    console.error('Error deleting product:', err);
    res.status(500).json({ message: 'Server error' });
  }
};