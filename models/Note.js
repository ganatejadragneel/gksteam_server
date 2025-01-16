const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  notes: {
    type: Map,
    of: {
      type: Map,
      of: String
    }
  }
});

module.exports = mongoose.model('Note', noteSchema);