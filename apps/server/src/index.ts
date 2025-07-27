import '@/helpers/loadEnv';

// app.ccaconst express = require("express");
import cors from 'cors';
import express from 'express';
import userRoutes from '@/routes/users.route';
import authRoutes from '@/routes/auth.route';

import sequelize from '@/config/db';
import session from 'express-session';
import passport from './auth/passport';
import errorHandler from '@/middleware/errorHandler';

const app = express(); // Create an Express application

sequelize.sync(); // Sync the database, force: true for development to drop tables if they exist;

// Middleware configuration
app.use(express.json()); // Parse incoming JSON requests
app.use(express.urlencoded({ extended: false })); // Parse URL-encoded data
app.use(cors()); // Enable CORS for cross-origin requests

const PORT = process.env.PORT || 5000;

app.use(
  session({
    secret: process.env.JWT_SECRET!,
    resave: false,
    saveUninitialized: false,
  }),
);

app.use(passport.initialize());
app.use(passport.session());

app.get('/api/hello', (_, res) => {
  res.json({ message: 'Hello from server!' });
});

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/users', userRoutes);

app.use(errorHandler); // Error handling middleware

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
