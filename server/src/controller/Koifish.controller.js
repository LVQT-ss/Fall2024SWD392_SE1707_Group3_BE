import KoiFish from '../models/Koifish.model.js';
import Pond from '../models/Pond.model.js'
import KoiRecord from '../models/KoiRecord.model.js';
export const addKoi = async (req, res) => {
  try {
    const { koiName, koiImage, koiGender, koiBreed, koiOrigin, price, currentPondId } = req.body;

    // Validate required fields
    if (!koiName || !currentPondId) {
      return res.status(400).json({ success: false, message: 'Koi name and current pond ID are required' });
    }

    // Check if the pond exists
    const Pond = await Pond.findByPk(currentPondId);
    if (!Pond) {
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


