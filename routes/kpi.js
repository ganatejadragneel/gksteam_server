const express = require('express');
const User = require('../models/User');
const authMiddleware = require('../middleware/auth');
const Note = require('../models/Note');

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

router.get('/notes', authMiddleware, async (req, res) => {
  try {
    const userNotes = await Note.findOne({ userId: req.userId });
    
    if (!userNotes || !userNotes.notes) {
      return res.json({ notes: {} });
    }

    // Convert Mongoose Map to plain object
    const notesObject = {};
    for (const [date, dateNotes] of userNotes.notes) {
      notesObject[date] = {};
      for (const [questionId, note] of dateNotes) {
        notesObject[date][questionId] = note;
      }
    }

    // console.log('Sending notes:', notesObject); // Debug log
    res.json({ notes: notesObject });
  } catch (error) {
    console.error('Error fetching notes:', error);
    res.status(500).json({ message: 'Error fetching notes' });
  }
});

router.post('/notes', authMiddleware, async (req, res) => {
  try {
    const { date, notes } = req.body;
    
    let userNotes = await Note.findOne({ userId: req.userId });
    
    if (!userNotes) {
      userNotes = new Note({
        userId: req.userId,
        notes: new Map()
      });
    }

    // Create a new Map for today's notes
    const todayNotes = new Map();
    
    // Add all non-empty notes to the Map
    Object.entries(notes).forEach(([questionId, note]) => {
      if (note && note.trim() !== '') {
        todayNotes.set(questionId.toString(), note.trim());
      }
    });

    // Only save if there are notes
    if (todayNotes.size > 0) {
      userNotes.notes.set(date, todayNotes);
      await userNotes.save();
    }

    res.json({ message: 'Notes updated successfully' });
  } catch (error) {
    console.error('Error updating notes:', error);
    res.status(500).json({ message: 'Error updating notes' });
  }
});

module.exports = router;