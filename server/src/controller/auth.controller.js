import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/user.models.js';

export const register = async (req, res) => {
  const { usertype, username, email, password, userAddress, userPhoneNumber } = req.body;

  if (!usertype || !username || !email || !password) {
    return res.status(400).json({ message: 'Please provide all required fields.' });
  }

  const validusertypes = ['Staff', 'Customer'];
  if (!validusertypes.includes(usertype)) {
    return res.status(400).json({ message: 'Invalid usertype. Must be one of  Staff, Customer.' });
  }

  if (username.length > 50 || email.length > 50 || password.length > 50 || (userAddress && userAddress.length > 255) || (userPhoneNumber && userPhoneNumber.length > 50)) {
    return res.status(400).json({ message: 'Input data exceeds allowed length.' });
  }

  try {
    const hashedPassword = await bcryptjs.hash(password, 10);

    const user = await User.create({
      usertype,
      username,
      email,
      password: hashedPassword,
      userAddress: userAddress || null,
      userPhoneNumber: userPhoneNumber || null
    });

    res.status(201).json({ message: 'User successfully registered!', user });
  } catch (err) {
    if (err.name === 'SequelizeUniqueConstraintError') {
      return res.status(409).json({ message: 'Username or email already exists. Please choose a different one.' });
    }
    console.error('Error creating user:', err);
    res.status(500).send(err.message);
  }
};

export const login = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: "Username and password are required" });
  }

  try {
    const user = await User.findOne({ where: { username } });

    if (!user) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    const passwordMatch = await bcryptjs.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    const token = jwt.sign(
      { id: user.userId, userType: user.usertype },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    const { password: pass, ...userWithoutPassword } = user.dataValues;

    res.status(200).json({
      message: "Login successful",
      token: token,
      user: userWithoutPassword,
    });

  } catch (err) {
    console.error('Login error:', err.message);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

export const staffRegister = async (req, res) => {
  const { username, email, password, userAddress, userPhoneNumber } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ message: 'Please provide all required fields: username, email, and password.' });
  }

  if (username.length > 50 || email.length > 50 || password.length > 50 || (userAddress && userAddress.length > 255) || (userPhoneNumber && userPhoneNumber.length > 50)) {
    return res.status(400).json({ message: 'Input data exceeds allowed length.' });
  }

  try {
    const hashedPassword = await bcryptjs.hash(password, 10);

    const user = await User.create({
      usertype: 'Staff',
      username,
      email,
      password: hashedPassword,
      userAddress: userAddress || null,
      userPhoneNumber: userPhoneNumber || null,
      userStatus: 'Pending' // Set initial status to 'Pending'
    });

    res.status(201).json({ 
      message: 'Staff member successfully registered! Awaiting Manager approval.',
      user: {
        userId: user.userId,
        username: user.username,
        email: user.email,
        usertype: user.usertype,
        userStatus: user.userStatus
      }
    });
  } catch (err) {
    if (err.name === 'SequelizeUniqueConstraintError') {
      return res.status(409).json({ message: 'Username or email already exists. Please choose a different one.' });
    }
    console.error('Error creating staff user:', err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

export const approveStaff = async (req, res) => {
  const { userId } = req.params;

  try {
    // Check if the user making the request is an Manager using the decoded token value
    if (req.userType !== 'Manager') {
      return res.status(403).json({ message: 'Access denied. Only Manager can approve staff.' });
    }

    // Find the staff member to approve
    const staffMember = await User.findOne({ 
      where: { 
        userId, 
        usertype: 'Staff', 
        userStatus: 'Pending' 
      } 
    });

    if (!staffMember) {
      return res.status(404).json({ message: 'Pending staff member not found.' });
    }

    // Update the staff member's status
    staffMember.userStatus = 'Active';
    await staffMember.save();

    res.status(200).json({
      message: 'Staff member successfully approved.',
      user: {
        userId: staffMember.userId,
        username: staffMember.username,
        email: staffMember.email,
        usertype: staffMember.usertype,
        userStatus: staffMember.userStatus
      },
    });
  } catch (err) {
    console.error('Error approving staff member:', err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

export const getAllPendingStaff = async (req, res) => {
  try {
    // Find all users where usertype is 'Staff' and userStatus is 'Pending'
    const pendingStaff = await User.findAll({
      where: {
        usertype: 'Staff',
        userStatus: 'Pending'
      },
      attributes: ['userId', 'username', 'email', 'userStatus']  // Select specific fields to return
    });

    if (pendingStaff.length === 0) {
      return res.status(404).json({ message: 'No pending staff members found.' });
    }

    res.status(200).json({
      message: 'Pending staff members retrieved successfully.',
      data: pendingStaff
    });
  } catch (err) {
    console.error('Error fetching pending staff members:', err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};