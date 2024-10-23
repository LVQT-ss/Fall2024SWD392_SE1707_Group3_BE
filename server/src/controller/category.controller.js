import Category from '../models/category.model.js';
import Product from '../models/Product.model.js';

// Tạo danh mục mới (Category)
export const createCategory = async (req, res) => {
  const { categoryName, categoryType } = req.body;

  if (!categoryName || !categoryType) {
    return res.status(400).json({ message: 'Category name and Category type are required' });
  }

  try {
    const newCategory = await Category.create({
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
        attributes: ['productId', 'productName'], // Bao gồm thông tin sản phẩm
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
        as: 'products',
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

export const updateCategory = async (req, res) => {
  const { categoryId } = req.params;
  const { categoryName, categoryType } = req.body;

  if (!categoryId) {
    return res.status(400).json({ message: 'Category ID is required' });
  }

  try {
    const category = await Category.findByPk(categoryId);

    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }

    // Cập nhật thông tin
    await category.update({
      categoryName: categoryName !== undefined ? categoryName : category.categoryName,
      categoryType: categoryType !== undefined ? categoryType : category.categoryType,
    });

    res.status(200).json({ message: 'Category updated successfully', category });
  } catch (err) {
    console.error('Error updating category:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Xóa danh mục (Category)
export const deleteCategory = async (req, res) => {
  const { categoryId } = req.params;

  if (!categoryId) {
    return res.status(400).json({ message: 'Category ID is required' });
  }

  try {
    const category = await Category.findByPk(categoryId);

    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }

    await category.destroy();
    res.status(200).json({ message: 'Category deleted successfully' });
  } catch (err) {
    console.error('Error deleting category:', err);
    res.status(500).json({ message: 'Server error' });
  }
};
