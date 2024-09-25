import { getConnection } from '../database/db.js';


// GET ALL USERS 
export const getAllUsers = async (req, res) => {
  try {
    const client = await getConnection();
    const result = await client.query('SELECT * FROM "User"');
    res.json(result.rows);
  } catch (err) {
    console.error('Error executing query:', err);
    res.status(500).send(err.message);
  }
};

// REGISTER 
export const register = async (req, res) => {
  const { userType, username, email, password, userAddress, userPhoneNumber } = req.body;

  if (!userType || !username || !email || !password) {
    return res.status(400).json({ message: 'Please provide all required fields.' });
  }

  const validUserTypes = ['Admin', 'Shop', 'Staff', 'Customer'];
  if (!validUserTypes.includes(userType)) {
    return res.status(400).json({ message: 'Invalid userType. Must be one of Admin, Shop, Staff, Customer.' });
  }

  try {
    const client = await getConnection();
    const query = `
      INSERT INTO "User" (userType, userName, email, password, userAddress, userPhoneNumber)
      VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`;
    const values = [userType, username, email, password, userAddress || null, userPhoneNumber || null];
    const result = await client.query(query, values);

    res.status(201).json({ message: 'User successfully registered!', user: result.rows[0] });
  } catch (err) {
    console.error('Error executing query:', err);
    res.status(500).send(err.message);
  }
};
