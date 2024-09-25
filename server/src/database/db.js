// db.js (Using ES modules)

import pkg from 'pg';
const { Client } = pkg;

const config = {
  host: "dpg-crpdsv88fa8c73e0lpgg-a.singapore-postgres.render.com",
  port: 5432,
  user: "koi_user",
  password: "lvGPTj8NnRhC6xn3KKhlT2lEzmjUvmu7",
  database: "koi",
  ssl: {
    rejectUnauthorized: false,
  },
};

export async function getConnection() {
  const client = new Client(config);
  try {
    await client.connect();
    console.log('Connected to PostgreSQL');
    return client;
  } catch (err) {
    console.error('Database connection failed:', err);
    throw err;
  }
}

export { Client };
