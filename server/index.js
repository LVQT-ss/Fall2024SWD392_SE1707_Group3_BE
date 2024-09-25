const sql = require('mssql');
const express = require('express');
import swaggerDocs from './src/utils/swagger.js';
const app = express();


const port = process.env.PORT || 3000;


app.use('/api/user', userRoutes);

getConnection().then(() => {
  app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
    swaggerDocs(app, port);
  });
}).catch(error => {
  console.error('Invalid database connection:', error);
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