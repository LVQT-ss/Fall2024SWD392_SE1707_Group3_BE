import express from 'express';
import cors from 'cors';
import { getConnection } from './src/database/db.js';
import swaggerDocs from './src/utils/swagger.js';
import userRoutes from './src/routes/user.route.js';
import authRoutes from './src/routes/auth.route.js'
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());



app.use('/api/auth',authRoutes)

app.use('/api/user', userRoutes);





getConnection().then(() => {
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