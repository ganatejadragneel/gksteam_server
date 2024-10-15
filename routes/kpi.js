const express = require('express');
const User = require('../models/User');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

router.get('/responses', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    const today = new Date().toISOString().split('T')[0];
    const responses = {};
    for (let i = 1; i <= 14; i++) {
      responses[i] = user.kpiResponses[i].some(date => date.toISOString().startsWith(today));
    }
    res.json({ responses });
  } catch (error) {
    console.error('Error fetching responses:', error);
    res.status(500).json({ message: 'Error fetching responses' });
  }
});

router.post('/submit', authMiddleware, async (req, res) => {
  try {
    const { responses } = req.body;
    const user = await User.findById(req.userId);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    for (let i = 1; i <= 14; i++) {
      const dates = user.kpiResponses[i];
      const todayIndex = dates.findIndex(date => date.getTime() === today.getTime());

      if (responses[i] && todayIndex === -1) {
        dates.push(today);
      } else if (!responses[i] && todayIndex !== -1) {
        dates.splice(todayIndex, 1);
      }
    }

    await user.save();
    res.json({ message: 'Responses updated successfully' });
  } catch (error) {
    console.error('Error updating responses:', error);
    res.status(500).json({ message: 'Error updating responses' });
  }
});

module.exports = router;