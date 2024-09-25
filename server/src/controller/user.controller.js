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

// export const register = async (req, res) => {
//   const { userType, username, email, password, userAddress, userPhoneNumber } = req.body;

//   // Validate required fields
//   if (!userType || !username || !email || !password) {
//     return res.status(400).json({ message: 'Please provide all required fields.' });
//   }

//   // Check for valid user types
//   const validUserTypes = ['Staff', 'Customer', 'Admin', 'Shop'];
//   if (!validUserTypes.includes(userType)) {
//     return res.status(400).json({ message: 'Invalid userType. Must be one of Admin, Shop, Staff, Customer.' });
//   }

//   try {
//     const client = await getConnection();
    
//     // Insert into User table with unique userName
//     const query = `
//       INSERT INTO "User" (userType, userName, email, password, userAddress, userPhoneNumber)
//       VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`;
//     const values = [userType, username, email, password, userAddress || null, userPhoneNumber || null];
//     const result = await client.query(query, values);

//     res.status(201).json({ message: 'User successfully registered!', user: result.rows[0] });
//   } catch (err) {
//     // Handle unique constraint violation (PostgreSQL specific code: 23505)
//     if (err.code === '23505') {  
//       return res.status(409).json({ message: 'Username already exists. Please choose a different username.' });
//     }
//     console.error('Error executing query:', err);
//     res.status(500).send(err.message);
//   }
// };


// // login user 
// export const login = async (req, res) => {
//   const { username, email, password } = req.body;

//   if ((!username && !email) || !password) {
//     return res.status(400).json({ message: "Username or Email and password are required" });
//   }

//   try {
//     const client = await getConnection();
//     let query, values;

//     // Determine whether to search by username or email
//     if (username) {
//       query = 'SELECT * FROM "User" WHERE "username" = $1 AND "password" = $2';
//       values = [username, password];
//     } else if (email) {
//       query = 'SELECT * FROM "User" WHERE "email" = $1 AND "password" = $2';
//       values = [email, password];
//     }

//     const result = await client.query(query, values);

//     if (result.rows.length === 0) {
//       return res.status(401).json({ message: "Invalid username/email or password" });
//     }

//     const user = result.rows[0];
//     res.status(200).json({
//       message: "Login successful",
//       user: {
//         id: user.userId,
//         username: user.userName,
//         email: user.email,
//         userType: user.userType,
//         status: user.userStatus
//       }
//     });
//   } catch (err) {
//     console.error('Error executing login query:', err);
//     res.status(500).send('Server error');
//   }
// };



// get user by id 
export const getUserById = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ message: "User ID is required" });
  }

  try {
    const client = await getConnection();
    const query = 'SELECT * FROM "User" WHERE "userId" = $1';
    const values = [id];
    const result = await client.query(query, values);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    const user = result.rows[0];
    res.status(200).json({
      id: user.userId,
      username: user.userName,
      email: user.email,
      userType: user.userType,
      status: user.userStatus,
      phone: user.userPhoneNumber,
      address: user.userAddress
    });
  } catch (err) {
    console.error('Error executing query:', err);
    res.status(500).json({ message: "Server error" });
  }
};


// Update user information based on userId
export const updateUser = async (req, res) => {
  const { userId } = req.params;
  const { userName, userType, userAddress, userPhoneNumber, email, userStatus } = req.body;

  if (!userId) {
    return res.status(400).json({ message: 'User ID is required' });
  }

  try {
    const client = await getConnection();
    const query = `
      UPDATE "User" 
      SET "userName" = $1, "userType" = $2, "userAddress" = $3, 
          "userPhoneNumber" = $4, "email" = $5, "userStatus" = $6
      WHERE "userId" = $7`;
    const values = [userName, userType, userAddress, userPhoneNumber, email, userStatus, userId];
    const result = await client.query(query, values);

    if (result.rowCount === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ message: 'User updated successfully' });
  } catch (err) {
    console.error('Error updating user:', err);
    res.status(500).send('Server error');
  }
};


// Delete a user based on userId
export const deleteUser = async (req, res) => {
  const { userId } = req.params;

  if (!userId) {
    return res.status(400).json({ message: 'User ID is required' });
  }

  try {
    const client = await getConnection();
    const query = 'DELETE FROM "User" WHERE "userId" = $1';
    const values = [userId];
    const result = await client.query(query, values);

    if (result.rowCount === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ message: 'User deleted successfully' });
  } catch (err) {
    console.error('Error deleting user:', err);
    res.status(500).send('Server error');
  }
};