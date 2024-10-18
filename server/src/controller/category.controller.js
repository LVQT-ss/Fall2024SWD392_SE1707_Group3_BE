import Category from '../models/category.model.js';
import Product from '../models/Product.model.js';

// Tạo danh mục mới (Category)
export const createCategory = async (req, res) => {
  const { productId, categoryName, categoryType } = req.body;

  if (!productId || !categoryName) {
    return res.status(400).json({ message: 'Product ID and Category name are required' });
  }

  try {
    // Kiểm tra xem product có tồn tại không
    const product = await Product.findByPk(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    const newCategory = await Category.create({
      productId,
      categoryName,
      categoryType,
    });
    res.status(201).json(newCategory);
  } catch (err) {
    console.error('Error creating category:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

