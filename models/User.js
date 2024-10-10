const mongoose = require('mongoose');
const crypto = require('crypto');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  refreshToken: { type: String }
});

userSchema.methods.generateRefreshToken = function() {
  return crypto.randomBytes(40).toString('hex');
};

module.exports = mongoose.model('User', userSchema);