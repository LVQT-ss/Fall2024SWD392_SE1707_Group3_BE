import KoiFish from '../models/KoiFish.model.js';
import Pond from '../models/Pond.model.js';

export const addKoi = async (req, res) => {
  try {
    const { koiName, koiImage, koiGender, koiBreed, koiOrigin, price, currentPondId } = req.body;

    // Validate required fields
    if (!koiName || !currentPondId) {
      return res.status(400).json({ success: false, message: 'Koi name and current pond ID are required' });
    }

    // Check if the pond exists
    const pond = await Pond.findByPk(currentPondId);
    if (!pond) {
      return res.status(400).json({ success: false, message: 'Invalid pond ID' });
    }

    // Create new Koi fish
    const newKoi = await KoiFish.create({
      koiName,
      koiImage,
      koiGender,
      koiBreed,
      koiOrigin,
      price,
      currentPondId
    });

    res.status(201).json({
      success: true,
      message: 'Koi fish added successfully',
      data: newKoi
    });
  } catch (error) {
    console.error('Error adding Koi fish:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to add Koi fish',
      error: error.message
    });
  }
};