// server.js
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const authMiddleware = require('./middleware/auth');
const kpiRoutes = require('./routes/kpi');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('Successfully connected to database');
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
    process.exit(1); // Exit the process with failure
  });

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/kpi', kpiRoutes);

// Add a protected route
app.get('/api/protected', authMiddleware, (req, res) => {
    res.json({ message: 'This is a protected route', userId: req.userId });
  });

const PORT = process.env.PORT || 4002;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
