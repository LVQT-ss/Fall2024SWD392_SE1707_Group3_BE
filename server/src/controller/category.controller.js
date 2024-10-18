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

// Lấy tất cả danh mục (Categories)
export const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.findAll({
      include: {
        model: Product,
        attributes: ['productId', 'productName'], // Bao gồm thông tin sản phẩm (Product)
      },
    });
    res.status(200).json(categories);
  } catch (err) {
    console.error('Error fetching categories:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Lấy danh mục theo ID
export const getCategoryById = async (req, res) => {
  const { categoryId } = req.params;

  if (!categoryId) {
    return res.status(400).json({ message: 'Category ID is required' });
  }

  try {
    const category = await Category.findByPk(categoryId, {
      include: {
        model: Product,
        attributes: ['productId', 'productName'],
      },
    });

    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }

    res.status(200).json(category);
  } catch (err) {
    console.error('Error fetching category:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

