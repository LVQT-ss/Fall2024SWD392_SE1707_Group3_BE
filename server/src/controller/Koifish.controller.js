import KoiFish from '../models/Koifish.model.js';
import Pond from '../models/Pond.model.js';
import KoiRecord from '../models/KoiRecord.model.js';
import User from '../models/user.models.js';

export const addKoi = async (req, res) => {
  try {
    const userId = req.userId; // From verifyToken middleware
    const { 
      koiName, 
      koiBreed, 
      koiGender, 
      koiImage,
      currentPondId  // Match this to your model foreign key
    } = req.body;

    // Validate that required fields are provided
    if (!koiName || !currentPondId) {
      return res.status(400).json({
        success: false,
        message: 'koiName and currentPondId are required.'
      });
    }

    // Check if pond exists and belongs to the user
    const pond = await Pond.findOne({
      where: {
        pondId: currentPondId,
        userId: userId
      }
    });

    if (!pond) {
      return res.status(404).json({
        success: false,
        message: 'No available pond found. Please create a pond first or specify a valid pond.'
      });
    }

    // Optional: Check if pond has capacity (you can add your own logic here)
    const currentKoiCount = await KoiFish.count({
      where: { currentPondId: currentPondId }
    });

    // Example capacity calculation (adjust based on your requirements)
    const maxCapacity = Math.floor(pond.pondVolume / 100); // Assuming each koi needs 100 units of volume
    if (currentKoiCount >= maxCapacity) {
      return res.status(400).json({
        success: false,
        message: `Pond has reached its maximum capacity of ${maxCapacity} koi fish.`
      });
    }

    // Create the koi fish
    const newKoiFish = await KoiFish.create({
      koiName,
      koiBreed,
      koiGender,
      koiImage,
      currentPondId,
      userId
    });

    res.status(201).json({
      success: true,
      message: 'Koi fish added successfully',
      data: newKoiFish
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to add koi fish',
      error: error.message
    });
  }
};




export const getAllKoi = async (req, res) => {
  try {
    const kois = await KoiFish.findAll();
    if (kois.length === 0) {
      return res.status(404).json({ success: false, message: 'No koi fish found' });
    }
    res.status(200).json({ success: true, data: kois });
  } catch (err) {
    console.error('Error fetching koi fish:', err);
    res.status(500).json({ success: false, message: 'Failed to fetch koi fish', error: err.message });
  }
};



export const updateKoi = async (req, res) => {
  try {
    const { fishId } = req.params; // Extract koi fish ID from route params
    const { koiName, koiImage, koiGender, koiBreed, koiOrigin, price, currentPondId } = req.body; // Extract fields to update

    // Check if the koi fish exists
    const koi = await KoiFish.findByPk(fishId);
    if (!koi) {
      return res.status(404).json({ success: false, message: 'Koi fish not found' });
    }

    // Update koi fish details
    await koi.update({
      koiName: koiName || koi.koiName,
      koiImage: koiImage || koi.koiImage,
      koiGender: koiGender || koi.koiGender,
      koiBreed: koiBreed || koi.koiBreed,
      koiOrigin: koiOrigin || koi.koiOrigin,
      price: price || koi.price,
      currentPondId: currentPondId || koi.currentPondId,
    });

    res.status(200).json({
      success: true,
      message: 'Koi fish updated successfully',
      data: koi,
    });
  } catch (error) {
    console.error('Error updating Koi fish:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update Koi fish',
      error: error.message,
    });
  }
};



  //// KOI RECORD 
// Add a new record for a Koi fish
export const addKoiRecord = async (req, res) => {
  try {
    const { fishId, recordDate, length, weight, bodyShape, age } = req.body;

    // Check if the koi fish exists
    const koiFish = await KoiFish.findByPk(fishId);
    if (!koiFish) {
      return res.status(404).json({ error: 'KoiFish not found' });
    }

    // Create the new KoiRecord
    const koiRecord = await KoiRecord.create({
      fishId,
      recordDate,
      length,
      weight,
      bodyShape,
      age
    });

    return res.status(201).json({ message: 'KoiRecord added successfully', koiRecord });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'An error occurred while adding the KoiRecord' });
  }
};


export const getAllKoiRecord = async (req, res) => {
  try {
    const kois = await KoiRecord.findAll();
    if (kois.length === 0) {
      return res.status(404).json({ success: false, message: 'No koi fish record found' });
    }
    res.status(200).json({ success: true, data: kois });
  } catch (err) {
    console.error('Error fetching koi fish record:', err);
    res.status(500).json({ success: false, message: 'Failed to fetch koi fish record', error: err.message });
  }
};

export const deleteKoi = async (req, res) => {
  try {
    const { fishId } = req.params; // Extract koi fish ID from route params

    // Check if the koi fish exists
    const koi = await KoiFish.findByPk(fishId);
    if (!koi) {
      return res.status(404).json({ success: false, message: 'Koi fish not found' });
    }

    // First, delete all related koi records
    await KoiRecord.destroy({
      where: { fishId: fishId }
    });

    // Then, delete the koi fish
    await koi.destroy();

    res.status(200).json({
      success: true,
      message: 'Koi fish deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting Koi fish:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete Koi fish',
      error: error.message,
    });
  }
};


