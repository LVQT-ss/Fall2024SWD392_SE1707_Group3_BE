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


