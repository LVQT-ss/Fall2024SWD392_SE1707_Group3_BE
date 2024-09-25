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

// login user 

export const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  try {
    const client = await getConnection();
    const query = 'SELECT * FROM "User" WHERE email = $1 AND password = $2';
    const values = [email, password];
    const result = await client.query(query, values);

    if (result.rows.length === 0) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const user = result.rows[0];
    res.status(200).json({
      message: "Login successful",
      user: {
        id: user.userId,
        username: user.userName,
        email: user.email,
        userType: user.userType,
        status: user.userStatus
      }
    });
  } catch (err) {
    console.error('Error executing login query:', err);
    res.status(500).send('Server error');
  }
};
