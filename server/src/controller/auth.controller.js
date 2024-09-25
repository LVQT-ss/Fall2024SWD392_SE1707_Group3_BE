import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { getConnection } from '../database/db.js';
import { errorHandler } from '../utils/error.js';
import dotenv from 'dotenv';
dotenv.config()

export const register = async (req, res) => {
    const { usertype, username, email, password, userAddress, userPhoneNumber } = req.body;
  
    // Validate required fields
    if (!usertype || !username || !email || !password) {
      return res.status(400).json({ message: 'Please provide all required fields.' });
    }
  
    // Check for valid user types
    const validusertypes = ['Staff', 'Customer', 'Admin', 'Shop'];
    if (!validusertypes.includes(usertype)) {
      return res.status(400).json({ message: 'Invalid usertype. Must be one of Admin, Shop, Staff, Customer.' });
    }
  
    // Validate length of input data
    if (username.length > 50 || email.length > 50 || password.length > 50 || (userAddress && userAddress.length > 255) || (userPhoneNumber && userPhoneNumber.length > 50)) {
      return res.status(400).json({ message: 'Input data exceeds allowed length.' });
    }
  
    try {
      const client = await getConnection();
  
      // Insert into User table with unique userName
      const query = `
        INSERT INTO "User" (usertype, userName, email, password, userAddress, userPhoneNumber)
        VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`;
      const values = [usertype, username, email, password, userAddress || null, userPhoneNumber || null];
      const result = await client.query(query, values);
  
      res.status(201).json({ message: 'User successfully registered!', user: result.rows[0] });
    } catch (err) {
      // Handle unique constraint violation (PostgreSQL specific code: 23505)
      if (err.code === '23505') {
        return res.status(409).json({ message: 'Username or email already exists. Please choose a different one.' });
      }
      console.error('Error executing query:', err);
      res.status(500).send(err.message);
    }
  };


  export const login = async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: "Username and password are required" });
    }

    try {
        const client = await getConnection();
        
        const query = 'SELECT * FROM "User" WHERE "username" = $1';
        const values = [username];
        
        const result = await client.query(query, values);

        if (result.rows.length === 0) {
            return res.status(401).json({ message: "Invalid username or password" });
        }
        
        const user = result.rows[0];
        
        if (password !== user.password) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }
        
        const token = jwt.sign(
            { id: user.userId, userType: user.userType },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );
        
        const { password: pass, ...userWithoutPassword } = user;
        
        res.status(200).json({
            message: "Login successful",
            token: token,
            user: userWithoutPassword,
        });

    } catch (err) {
        console.error('Database query error:', err.message);
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};