// models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  phoneNumber: String,
  password: String,
  avatar: String,
  userType: String 
});

module.exports = mongoose.model('User', userSchema);
