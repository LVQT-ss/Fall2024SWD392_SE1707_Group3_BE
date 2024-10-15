import Product from "../models/Product.model";
import User from "../models/user.models";

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

