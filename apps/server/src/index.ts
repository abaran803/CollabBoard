import '@/helpers/loadEnv';

// app.ccaconst express = require("express");
import cors from 'cors';
import express from 'express';

const app = express();
app.use(cors()); // Enable CORS for cross-origin requests
const PORT = process.env.PORT || 5000;

app.get('/api/hello', (_, res) => {
  res.json({ message: 'Hello from server!' });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
