import KoiFish from '../models/Koifish.model.js';
import Pond from '../models/Pond.model.js';
import KoiRecord from '../models/KoiRecord.model.js';
import User from '../models/user.models.js';
import KoiHealth from '../models/koiHealth.model.js';
import FishTransfer from '../models/FishTransfer.model.js';

export const addKoi = async (req, res) => {
  try {
    const userId = req.userId;
    const { 
      koiName, 
      koiBreed, 
      koiGender, 
      koiImage,
      koiOrigin,
      currentPondId
    } = req.body;

    // Validate required fields
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

    // Get current number of koi in the pond
    const currentKoiCount = await KoiFish.count({
      where: { currentPondId: currentPondId }
    });

    // Check if pond has reached its capacity
    const maxCapacity = pond.pondCapacityOfKoiFish;
    const remainingSlots = maxCapacity - currentKoiCount;

    if (remainingSlots <= 0) {
      return res.status(400).json({
        success: false,
        message: `Pond has reached its maximum capacity of ${maxCapacity} koi fish.`,
        pondCapacity: {
          maxCapacity,
          currentCount: currentKoiCount,
          remainingSlots: 0
        }
      });
    }

    // Create the koi fish
    const newKoiFish = await KoiFish.create({
      koiName,
      koiBreed,
      koiGender,
      koiImage,
      koiOrigin,
      currentPondId,
      userId
    });

    res.status(201).json({
      success: true,
      message: 'Koi fish added successfully',
      data: newKoiFish,
      pondCapacity: {
        maxCapacity,
        currentCount: currentKoiCount + 1,
        remainingSlots: remainingSlots - 1
      }
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
    if (req.userType !== 'Manager' && req.userType !== 'Staff') {
      return res.status(403).json({ message: 'Access denied. Only Manager can  access.' });
    }
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
    const { fishId } = req.params; 
    const { koiName, koiImage, koiGender, koiBreed, koiOrigin, currentPondId } = req.body;

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

// Get a specific Koi record by ID
export const getKoiRecordById = async (req, res) => {
  try {
    const { id } = req.params;
    
    // Find the KoiRecord by primary key (ID)
    const koiRecord = await KoiRecord.findByPk(id);

    // If the record is not found, return a 404 error
    if (!koiRecord) {
      return res.status(404).json({ success: false, message: 'KoiRecord not found' });
    }

    // Return the found KoiRecord
    return res.status(200).json({ success: true, data: koiRecord });
  } catch (error) {
    console.error('Error fetching KoiRecord by ID:', error);
    return res.status(500).json({ success: false, message: 'An error occurred while fetching the KoiRecord', error: error.message });
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

// DELETE KOI BY USER 
export const deleteKoiByUser = async (req, res) => {
  try {
    const { fishId } = req.params;
    
    if (!fishId) {
      return res.status(400).json({ success: false, message: "Fish ID is required" });
    }

    const result = await KoiFish.update(
      { status: 'inactive' },
      { where: { fishId: fishId } }
    );

    if (result[0] === 0) {
      return res.status(404).json({ success: false, message: "Koi fish not found" });
    }

    res.status(200).json({ success: true, message: "Koi fish deleted successfully" });
  } catch (error) {
    console.error("Error deleting Koi fish:", error);
    res.status(500).json({ success: false, message: "Failed to delete Koi fish", error: error.message });
  }
};

// Get all Koi fish owned by a specific user
export const getAllKoiByUser = async (req, res) => {
  try {
    const userId = req.userId; // Extract userId from the verifyToken middleware

    // Find all koi fish that belong to the user
    const userKoiFish = await KoiFish.findAll({
      where: { userId: userId }
    });

    // Check if any koi fish are found for the user
    if (userKoiFish.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'No koi fish found for this user',
      });
    }

    // Return the list of koi fish owned by the user
    res.status(200).json({
      success: true,
      data: userKoiFish,
    });
  } catch (error) {
    console.error('Error fetching koi fish for user:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch koi fish for user',
      error: error.message,
    });
  }
};
// Controller function (add to Koifish.controller.js)
export const getKoiFishById = async (req, res) => {
  try {
    const { fishId } = req.params;
    const userId = req.userId; // From verifyToken middleware
    
    // Find the koi fish by ID with associated pond data
    const koiFish = await KoiFish.findOne({
      where: { fishId: fishId },
     
      attributes: [
        'fishId',
        'koiName',
        'koiImage',
        'koiGender',
        'koiBreed',
        'koiOrigin',
        'currentPondId'
      ]
    });

    // Check if koi fish exists
    if (!koiFish) {
      return res.status(404).json({
        success: false,
        message: 'Koi fish not found'
      });
    }

    // If user is not admin, check if they own the koi fish
    // We need to query the full koi fish data (including userId) for this check
    const koiFishWithUser = await KoiFish.findByPk(fishId, {
      attributes: ['userId']
    });

    if (req.usertype !== 'Manager' && koiFishWithUser.userId !== userId) {
      return res.status(403).json({
        success: false,
        message: 'You do not have permission to view this koi fish'
      });
    }

    res.status(200).json({
      success: true,
      data: koiFish
    });
  } catch (error) {
    console.error('Error fetching koi fish:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch koi fish',
      error: error.message
    });
  }
};
// ONLY FOR Manager USERTYPE 
export const getKoiFishByIdForManager = async (req, res) => {
  try {
    if (req.userType !== 'Manager') {
      return res.status(403).json({ 
        success: false, 
        message: 'Access denied. Only Manager can access.' 
      });
    }

    const { fishId } = req.params;

    const koiFish = await KoiFish.findByPk(fishId);

    if (!koiFish) {
      return res.status(404).json({ 
        success: false, 
        message: 'Koi fish not found' 
      });
    }

    res.status(200).json({ 
      success: true, 
      data: koiFish 
    });
  } catch (err) {
    console.error('Error fetching koi fish:', err);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to fetch koi fish', 
      error: err.message 
    });
  }
};

export const addKoiHealth = async (req, res) => {
  try {
    const { fishId, healthDate, illness, endDate, address, medicine, price } = req.body;

    // Check if the koi fish exists
    const koiFish = await KoiFish.findByPk(fishId);
    if (!koiFish) {
      return res.status(404).json({ success: false, message: 'Koi fish not found' });
    }

    // Create a new KoiHealth record
    const koiHealthRecord = await KoiHealth.create({
      fishId,
      healthDate,
      illness,
      endDate,
      address,
      medicine,
      price,
    });

    return res.status(201).json({
      success: true,
      message: 'Koi health record added successfully',
      data: koiHealthRecord,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
};

export const updateKoiHealth = async (req, res) => {
  try {
    const { healthId } = req.params;
    const { healthDate, illness, endDate, address, medicine, price } = req.body;

    // Check if the koi health record exists
    const koiHealthRecord = await KoiHealth.findByPk(healthId);
    if (!koiHealthRecord) {
      return res.status(404).json({ success: false, message: 'Koi health record not found' });
    }

    // Update the KoiHealth record
    koiHealthRecord.healthDate = healthDate || koiHealthRecord.healthDate;
    koiHealthRecord.illness = illness || koiHealthRecord.illness;
    koiHealthRecord.endDate = endDate || koiHealthRecord.endDate;
    koiHealthRecord.address = address || koiHealthRecord.address;
    koiHealthRecord.medicine = medicine || koiHealthRecord.medicine;
    koiHealthRecord.price = price || koiHealthRecord.price;

    await koiHealthRecord.save();

    return res.status(200).json({
      success: true,
      message: 'Koi health record updated successfully',
      data: koiHealthRecord,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
};
export const deleteKoiHealth = async (req, res) => {
  try {
    const { healthId } = req.params;

    // Check if the koi health record exists
    const koiHealthRecord = await KoiHealth.findByPk(healthId);
    if (!koiHealthRecord) {
      return res.status(404).json({ success: false, message: 'Koi health record not found' });
    }

    // Delete the record
    await koiHealthRecord.destroy();

    return res.status(200).json({
      success: true,
      message: 'Koi health record deleted successfully',
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
};

// Get health records for a specific koi fish
export const getKoiHealthByFishId = async (req, res) => {
  try {
    const { fishId } = req.params;
    const userId = req.userId; // From verifyToken middleware

    // First verify the koi fish exists and belongs to the user (unless manager)
    const koiFish = await KoiFish.findOne({
      where: { fishId }
    });

    if (!koiFish) {
      return res.status(404).json({
        success: false,
        message: 'Koi fish not found'
      });
    }

    // Check ownership if not manager
    if (req.userType !== 'Manager' && koiFish.userId !== userId) {
      return res.status(403).json({
        success: false,
        message: 'You do not have permission to view this koi fish\'s health records'
      });
    }

    // Get health records
    const healthRecords = await KoiHealth.findAll({
      where: { fishId },
      order: [['healthDate', 'DESC']], // Most recent first
      include: [
        {
          model: KoiFish,
          attributes: ['koiName', 'koiBreed']
        }
      ]
    });

    if (healthRecords.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'No health records found for this koi fish'
      });
    }

    res.status(200).json({
      success: true,
      data: healthRecords
    });

  } catch (error) {
    console.error('Error fetching koi health records:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch koi health records',
      error: error.message
    });
  }
};


export const transferKoiFish = async (req, res) => {
  try {
    const { fishId, newPondId, reason } = req.body;
    const userId = req.userId;  // From verifyToken middleware

    // Find the koi fish
    const koiFish = await KoiFish.findOne({ where: { fishId, userId } });
    if (!koiFish) {
      return res.status(404).json({ success: false, message: 'Koi fish not found' });
    }

    // Check if the new pond exists and belongs to the user
    const newPond = await Pond.findOne({ where: { pondId: newPondId, userId } });
    if (!newPond) {
      return res.status(404).json({ success: false, message: 'New pond not found' });
    }

    // Check if the old pond is valid
    const oldPondId = koiFish.currentPondId;

    // Update the koi fish's pond
    await koiFish.update({ currentPondId: newPondId });

    // Save the fish transfer record
    const fishTransfer = await FishTransfer.create({
      fishId,
      oldPondId,
      newPondId,
      reason,
      transferDate: new Date()
    });

    res.status(201).json({
      success: true,
      message: 'Koi fish transferred successfully',
      data: fishTransfer
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to transfer koi fish', error: error.message });
  }
};


// Get fish transfer details by fishId or globally
export const getFishTransfers = async (req, res) => {
  try {
    const { fishId } = req.params; // Extract fishId from params if provided
    
    let transfers;
    
    if (fishId) {
      // Fetch transfers for a specific fish
      transfers = await FishTransfer.findAll({
        where: { fishId },
        include: [
          { model: KoiFish, attributes: ['koiName'] },
          { model: Pond, as: 'OldPond', attributes: ['pondName'] },
          { model: Pond, as: 'NewPond', attributes: ['pondName'] },
        ],
      });
      
      if (!transfers.length) {
        return res.status(404).json({ success: false, message: 'No transfers found for this fish' });
      }
    } else {
      // Fetch all transfers globally
      transfers = await FishTransfer.findAll({
        include: [
          { model: KoiFish, attributes: ['koiName'] },
          { model: Pond, as: 'OldPond', attributes: ['pondName'] },
          { model: Pond, as: 'NewPond', attributes: ['pondName'] },
        ],
      });
    }

    res.status(200).json({ success: true, data: transfers });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to retrieve transfers', error: error.message });
  }
};
