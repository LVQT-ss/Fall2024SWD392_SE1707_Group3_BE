import Pond from '../models/Pond.model.js';
import User from '../models/user.models.js';
import KoiFish from '../models/Koifish.model.js';

// Create a new pond
export const createPond = async (req, res) => {
  try {
    const { pondName, pondImage, pondSize, pondDepth, pondVolume, pondDrains, pondAeroCapacity, pondCapacityOfKoiFish } = req.body;

    const userId = req.userId; // From verifyToken middleware

    const newPond = await Pond.create({
      userId,
      pondName,
      pondImage,
      pondSize,
      pondDepth,
      pondVolume,
      pondDrains,
      pondAeroCapacity,
      pondCapacityOfKoiFish
    });

    res.status(201).json({
      success: true,
      message: 'Pond created successfully',
      data: newPond
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Failed to create pond',
      error: error.message
    });
  }
};


// Get all ponds for a user
export const getAllPondsByUser = async (req, res) => {
  try {
    const userId = req.userId;
    const ponds = await Pond.findAll({ where: { userId } });

    const pondsWithCapacity = await Promise.all(ponds.map(async pond => {
      const currentKoiCount = await KoiFish.count({
        where: { currentPondId: pond.pondId }
      });

      return {
        ...pond.toJSON(),
        pondCapacity: {
          maxCapacity: pond.pondCapacityOfKoiFish,
          currentCount: currentKoiCount,
          remainingSlots: pond.pondCapacityOfKoiFish - currentKoiCount
        }
      };
    }));

    res.status(200).json({
      success: true,
      data: pondsWithCapacity
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve ponds',
      error: error.message
    });
  }
};


// Update a pond by ID
export const updatePond = async (req, res) => {
  try {
    const { id } = req.params;
    const { pondName, pondImage, pondSize, pondDepth, pondVolume, pondDrains, pondAeroCapacity, pondCapacityOfKoiFish } = req.body;

    const pond = await Pond.findByPk(id);
    if (!pond) {
      return res.status(404).json({
        success: false,
        message: 'Pond not found'
      });
    }

    await pond.update({ pondName, pondImage, pondSize, pondDepth, pondVolume, pondDrains, pondAeroCapacity, pondCapacityOfKoiFish });

    res.status(200).json({
      success: true,
      message: 'Pond updated successfully',
      data: pond
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Failed to update pond',
      error: error.message
    });
  }
};

// Delete a pond by ID
export const deletePond = async (req, res) => {
  try {
    const { id } = req.params;

    const pond = await Pond.findByPk(id);
    if (!pond) {
      return res.status(404).json({
        success: false,
        message: 'Pond not found'
      });
    }

    await pond.destroy();

    res.status(200).json({
      success: true,
      message: 'Pond deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to delete pond',
      error: error.message
    });
  }
};




// New method specifically for owner/admin deletion
export const deletePondByOwner = async (req, res) => {
  try {
    const { id } = req.params;  // This should be pondId
    const userId = req.userId; // From verifyToken middleware

    // Find the pond
    const pond = await Pond.findByPk(id);
    if (!pond) {
      return res.status(404).json({
        success: false,
        message: 'Pond not found'
      });
    }

    // Check if user is the pond owner
    if (pond.userId !== userId) {
      return res.status(403).json({
        success: false,
        message: 'Unauthorized: You can only update the status of your own ponds'
      });
    }

    // Update the pond status to 'inactive'
    const updatedPond = await pond.update({ status: 'inactive' });

    if (!updatedPond) {
      return res.status(404).json({
        success: false,
        message: 'Failed to update pond status'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Pond status updated to inactive successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to update pond status',
      error: error.message
    });
  }
};



export const getAllPonds = async (req, res) => {
  try {
    // Get user from request (added by verifyToken middleware)
    const userId = req.userId;
    
    // Find the user and check if they are an admin
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    // Verify user is an admin
    if (user.usertype !== 'Manager' && user.usertype !== 'Staff') {
      return res.status(403).json({
        success: false,
        message: 'Unauthorized: Only manager can access all ponds'
      });
    }

    // If user is admin, proceed with fetching all ponds
    const ponds = await Pond.findAll({
      include: [{
        model: User,
        attributes: ['username']
      }]
    });

    const pondsWithDetails = await Promise.all(ponds.map(async pond => {
      const currentKoiCount = await KoiFish.count({
        where: { currentPondId: pond.pondId }
      });

      return {
        ...pond.toJSON(),
        username: pond.User ? pond.User.username : null,
        pondCapacity: {
          maxCapacity: pond.pondCapacityOfKoiFish,
          currentCount: currentKoiCount,
          remainingSlots: pond.pondCapacityOfKoiFish - currentKoiCount
        }
      };
    }));

    res.status(200).json({
      success: true,
      data: pondsWithDetails
    });
  } catch (err) {
    console.error('Error fetching ponds:', err);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch ponds',
      error: err.message
    });
  }
};


export const getPondByIdforManager = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.userId;

    const pond = await Pond.findOne({
      where: { pondId: id },
      attributes: [
        'pondId',
        'pondName',
        'pondImage',
        'pondSize',
        'pondDepth',
        'pondVolume',
        'pondDrains',
        'pondAeroCapacity',
        'pondCapacityOfKoiFish',
        'userId'
      ]
    });

    if (!pond) {
      return res.status(404).json({
        success: false,
        message: 'Pond not found'
      });
    }

    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    if (user.usertype !== 'Manager' && user.usertype !== 'Staff') {
      return res.status(403).json({
        success: false,
        message: 'You do not have permission to view this pond'
      });
    }


    
    const currentKoiCount = await KoiFish.count({
      where: { 
        currentPondId: pond.pondId,
        status: 'active'  // Using ENUM value directly
      },
    });


    const pondWithCapacity = {
      ...pond.toJSON(),
      pondCapacity: {
        maxCapacity: pond.pondCapacityOfKoiFish,
        currentCount: currentKoiCount,
        remainingSlots: pond.pondCapacityOfKoiFish - currentKoiCount
      }
    };

    return res.status(200).json({
      success: true,
      data: pondWithCapacity
    });

  } catch (error) {
    console.error('Error in getPondById:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to fetch pond',
      error: error.message
    });
  }
};

export const getPondById = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.userId;

    const pond = await Pond.findOne({
      where: { pondId: id },
      attributes: [
        'pondId',
        'pondName',
        'pondImage',
        'pondSize',
        'pondDepth',
        'pondVolume',
        'pondDrains',
        'pondAeroCapacity',
        'pondCapacityOfKoiFish',
        'userId'
      ]
    });

    if (!pond) {
      return res.status(404).json({
        success: false,
        message: 'Pond not found'
      });
    }

    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    if (pond.userId !== userId) {
      return res.status(403).json({
        success: false,
        message: 'You do not have permission to view this pond'
      });
    }

    // Add logging for debugging

    
    const currentKoiCount = await KoiFish.count({
      where: { 
        currentPondId: pond.pondId,
        status: 'active'  // Using ENUM value directly
      },
    });


    const pondWithCapacity = {
      ...pond.toJSON(),
      pondCapacity: {
        maxCapacity: pond.pondCapacityOfKoiFish,
        currentCount: currentKoiCount,
        remainingSlots: pond.pondCapacityOfKoiFish - currentKoiCount
      }
    };

    return res.status(200).json({
      success: true,
      data: pondWithCapacity
    });

  } catch (error) {
    console.error('Error in getPondById:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to fetch pond',
      error: error.message
    });
  }
};