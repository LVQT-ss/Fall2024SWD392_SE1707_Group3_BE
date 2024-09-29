import express from 'express';
import cors from 'cors';
import initDB from './src/database/init.js';
import swaggerDocs from './src/utils/swagger.js';
import userRoutes from './src/routes/user.route.js';
import authRoutes from './src/routes/auth.route.js';
import dotenv from 'dotenv';

dotenv.config();
console.log('JWT Secret:', process.env.JWT_SECRET);
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);

// Khởi tạo và đồng bộ cơ sở dữ liệu
initDB().then(() => {
  app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
    swaggerDocs(app, port);
  });
}).catch(error => {
  console.error('Invalid database connection:', error);
});

process.on('SIGINT', () => {
  console.log('Closing PostgreSQL connection');
  process.exit();
});
