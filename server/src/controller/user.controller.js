// src/controller/user.controller.js
import User from '../models/user.models.js';

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (err) {
    console.error('Error fetching users:', err);
    res.status(500).send(err.message);
  }
};

export const getUserById = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ message: "User ID is required" });
  }

  try {
    const user = await User.findByPk(id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (err) {
    console.error('Error fetching user:', err);
    res.status(500).json({ message: "Server error" });
  }
};

export const updateUser = async (req, res) => {
  const { userId } = req.params;
  const { username, usertype, userAddress, userPhoneNumber, email, userStatus } = req.body;

  if (!userId) {
    return res.status(400).json({ message: 'User ID is required' });
  }

  try {
    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    await user.update({
      username,
      usertype,
      userAddress,
      userPhoneNumber,
      email,
      userStatus,
    });

    res.json({ message: 'User updated successfully' });
  } catch (err) {
    console.error('Error updating user:', err);
    res.status(500).send('Server error');
  }
};


export const deleteUser = async (req, res) => {
  const { userId } = req.params;

  if (!userId) {
    return res.status(400).json({ message: 'User ID is required' });
  }

  try {
    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check if the user type is Admin
    if (user.usertype === 'Admin') {
      return res.status(403).json({ message: 'Admin users cannot be deleted' });
    }

    await user.destroy();
    res.json({ message: 'User deleted successfully' });
  } catch (err) {
    console.error('Error deleting user:', err);
    res.status(500).send('Server error');
  }
};



export const getAllStaff = async (req, res) => {
  try {
    const staffUsers = await User.findAll({
      where: { usertype: 'Staff' },
    });

    if (staffUsers.length === 0) {
      return res.status(404).json({ message: 'No staff users found' });
    }

    res.status(200).json(staffUsers);
  } catch (error) {
    console.error('Error fetching staff users:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const getAllCustomer = async (req, res) => {
  try {
    const customerUsers = await User.findAll({
      where: { usertype: 'Customer' },
    });

    if (customerUsers.length === 0) {
      return res.status(404).json({ message: 'No customer users found' });
    }

    res.status(200).json(customerUsers);
  } catch (error) {
    console.error('Error fetching customer users:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};