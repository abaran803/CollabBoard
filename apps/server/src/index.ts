import '@/helpers/loadEnv';

// app.ccaconst express = require("express");
import cors from 'cors';
import express from 'express';
import userRoutes from '@/routes/users.route';
import authRoutes from '@/routes/auth.route';

import sequelize from '@/config/db';

const app = express(); // Create an Express application

sequelize.sync();

// Middleware configuration
app.use(express.json()); // Parse incoming JSON requests
app.use(express.urlencoded({ extended: false })); // Parse URL-encoded data
app.use(cors()); // Enable CORS for cross-origin requests

const PORT = process.env.PORT || 5000;

app.get('/api/hello', (_, res) => {
  res.json({ message: 'Hello from server!' });
});

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/users', userRoutes);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
