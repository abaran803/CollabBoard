import { Sequelize } from 'sequelize';

// Validate DATABASE_URL is defined
const databaseUrl = process.env.DATABASE_URL;
if (!databaseUrl) {
  throw new Error('DATABASE_URL environment variable is not defined.');
}

// Initialize Sequelize
const sequelize = new Sequelize(databaseUrl);

// Authenticate connection inside async IIFE
(async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
})();

export default sequelize;
