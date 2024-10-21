import ProductRecommend from '../models/productRecommend.model.js';

// Create a new product recommendation
export const createProductRecommend = async (req, res) => {
  const { productId, waterParameterId } = req.body;

  if (!productId || !waterParameterId) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  try {
    const newRecommendation = await ProductRecommend.create({
      productId,
      waterParameterId,
    });
    res.status(201).json(newRecommendation);
  } catch (err) {
    console.error('Error creating recommendation:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get all product recommendations
export const getAllProductRecommends = async (req, res) => {
  try {
    const recommendations = await ProductRecommend.findAll();
    res.status(200).json(recommendations);
  } catch (err) {
    console.error('Error fetching recommendations:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get a recommendation by ID
export const getProductRecommendById = async (req, res) => {
  const { recommendId } = req.params;

  if (!recommendId) {
    return res.status(400).json({ message: 'Recommendation ID is required' });
  }

  try {
    const recommendation = await ProductRecommend.findByPk(recommendId);
    if (!recommendation) {
      return res.status(404).json({ message: 'Recommendation not found' });
    }
    res.status(200).json(recommendation);
  } catch (err) {
    console.error('Error fetching recommendation:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

