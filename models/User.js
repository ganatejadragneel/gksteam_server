const mongoose = require('mongoose');
const crypto = require('crypto');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  refreshToken: { type: String },
  kpiResponses: {
    1: [Date],
    2: [Date],
    3: [Date],
    4: [Date],
    5: [Date],
    6: [Date],
    7: [Date],
    8: [Date],
    9: [Date],
    10: [Date],
    11: [Date],
    12: [Date],
    13: [Date],
    14: [Date]
  }
});

userSchema.methods.generateRefreshToken = function() {
  return crypto.randomBytes(40).toString('hex');
};

module.exports = mongoose.model('User', userSchema);