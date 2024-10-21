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

