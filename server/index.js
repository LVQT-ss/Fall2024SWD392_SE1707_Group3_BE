import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import initDB from './src/database/init.js';
import swaggerDocs from './src/utils/swagger.js';
import userRoutes from './src/routes/user.route.js';
import authRoutes from './src/routes/auth.route.js';
import pondRoutes from './src/routes/pond.route.js';
import koiRoutes from  './src/routes/koi.route.js'
import dotenv from 'dotenv';

dotenv.config();
console.log('JWT Secret:', process.env.JWT_SECRET);
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cookieParser());
app.use(cors());

app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/pond', pondRoutes);
app.use('/api/koi', koiRoutes);
// Initialize and synchronize the database
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