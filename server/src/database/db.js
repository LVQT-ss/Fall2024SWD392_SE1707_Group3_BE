// src/database/sequelize.js
import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const sequelize = new Sequelize({
  host: process.env.DB_HOST || "dpg-crpdsv88fa8c73e0lpgg-a.singapore-postgres.render.com",
  port: process.env.DB_PORT || 5432,
  username: process.env.DB_USER || "koi_user",
  password: process.env.DB_PASSWORD || "lvGPTj8NnRhC6xn3KKhlT2lEzmjUvmu7",
  database: process.env.DB_NAME || "koi",
  dialect: 'postgres',
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
  logging: false, // Tắt log query để console gọn gàng hơn
});

export default sequelize;
