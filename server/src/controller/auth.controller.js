import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/user.models.js';

export const register = async (req, res) => {
  const { usertype, username, email, password, userAddress, userPhoneNumber } = req.body;

  if (!usertype || !username || !email || !password) {
    return res.status(400).json({ message: 'Please provide all required fields.' });
  }

  const validusertypes = ['Staff', 'Customer', 'Admin', 'Shop'];
  if (!validusertypes.includes(usertype)) {
    return res.status(400).json({ message: 'Invalid usertype. Must be one of Admin, Shop, Staff, Customer.' });
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
