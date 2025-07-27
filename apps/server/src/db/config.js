// src/loadEnv.ts
import dotenv from 'dotenv';
dotenv.config();

export default {
  development: {
    username: process.env.DEV_DB_USER,
    password: process.env.DEV_DB_PASSWORD,
    database: process.env.DEV_DB_NAME,
    host: process.env.DEV_DB_HOST || '127.0.0.1',
    dialect: 'postgres',
  },
  test: {
    username: process.env.TEST_DB_USER,
    password: process.env.TEST_DB_PASSWORD,
    database: process.env.TEST_DB_NAME,
    host: process.env.TEST_DB_HOST || '127.0.0.1',
    dialect: 'postgres',
  },
  production: {
    username: process.env.PROD_DB_USER,
    password: process.env.PROD_DB_PASSWORD,
    database: process.env.PROD_DB_NAME,
    host: process.env.PROD_DB_HOST || '127.0.0.1',
    dialect: 'postgres',
  },
};
