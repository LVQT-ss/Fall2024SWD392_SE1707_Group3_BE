import Pond from '../models/Pond.model.js';

// Create a new pond (Already Implemented)
export const createPond = async (req, res) => {
  try {
    const { pondName, pondImage, pondSize, pondDepth, pondVolume, pondDrains, pondAeroCapacity } = req.body;
    const userId = req.userId; // From verifyToken middleware

    const newPond = await Pond.create({
      userId,
      pondName,
      pondImage,
      pondSize,
      pondDepth,
      pondVolume,
      pondDrains,
      pondAeroCapacity
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
export const getAllPonds = async (req, res) => {
  try {
    const userId = req.userId;
    const ponds = await Pond.findAll({ where: { userId } });

    res.status(200).json({
      success: true,
      data: ponds
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
    const { pondName, pondImage, pondSize, pondDepth, pondVolume, pondDrains, pondAeroCapacity } = req.body;

    const pond = await Pond.findByPk(id);
    if (!pond) {
      return res.status(404).json({
        success: false,
        message: 'Pond not found'
      });
    }

    await pond.update({ pondName, pondImage, pondSize, pondDepth, pondVolume, pondDrains, pondAeroCapacity });

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
