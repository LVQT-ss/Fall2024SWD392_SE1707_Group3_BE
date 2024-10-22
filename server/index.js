import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import initDB from './src/database/init.js';
import swaggerDocs from './src/utils/swagger.js';
import userRoutes from './src/routes/user.route.js';
import authRoutes from './src/routes/auth.route.js';
import pondRoutes from './src/routes/pond.route.js';
import koiRoutes from './src/routes/koi.route.js';
import blogRoutes from './src/routes/blog.route.js'; 
import waterParaRoutes from './src/routes/waterPara.route.js';
import productRoutes from './src/routes/product.route.js';
import categoryRoutes from './src/routes/category.route.js';
import productRecommendRoutes from './src/routes/productRecommend.route.js';
import dotenv from 'dotenv';

dotenv.config();
const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors());

// Register the routes
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/pond', pondRoutes);
app.use('/api/koi', koiRoutes);
app.use('/api/blog', blogRoutes); 
app.use('/api/waterPara', waterParaRoutes);
app.use('/api/products', productRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/productRecommends', productRecommendRoutes);
// Initialize and synchronize the database
initDB().then(() => {
  app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
    // Initialize Swagger docs
    swaggerDocs(app, port);
  });
}).catch(error => {
  console.error('Invalid database connection:', error);
});

// Handle graceful shutdown
process.on('SIGINT', () => {
  console.log('Closing PostgreSQL connection');
  process.exit();
});
