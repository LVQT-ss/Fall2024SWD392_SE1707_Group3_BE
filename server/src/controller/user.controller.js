import { getConnection } from '../database/db.js';

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