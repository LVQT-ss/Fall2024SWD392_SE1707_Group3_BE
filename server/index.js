const sql = require('mssql');
const express = require('express');

const app = express();

// SQL Server configuration
const config = {
  user: 'sa',
  password: '123456789',
  server: 'DESKTOP-CTMNVDO',
  database: 'KOI',
  options: {
    encrypt: true, // Use this if you're on Windows Azure
    trustServerCertificate: true, // Use this if you're using a self-signed certificate
  },
};

// Create a function to get a SQL Server connection
async function getConnection() {
  try {
    const pool = await sql.connect(config);
    console.log('Connected to SQL Server');
    return pool;
  } catch (err) {
    console.error('Database connection failed:', err);
    throw err;
  }
}

// Example route using the SQL Server connection
app.get('/users', async (req, res) => {
  try {
    const pool = await getConnection();
    const result = await pool.request().query('SELECT * FROM [User]');
    res.json(result.recordset);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Handle application shutdown
process.on('SIGINT', () => {
  sql.close();
  process.exit();
});