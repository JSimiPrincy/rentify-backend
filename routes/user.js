// routes/users.js
const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');

// Register
router.post('/register', async (req, res) => {
  const { name, email, phoneNumber, password, userType } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new User({ name, email, phoneNumber, password: hashedPassword, userType });
  try {
    await user.save();
    res.status(201).send(user);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user && await bcrypt.compare(password, user.password)) {
    res.send(user);
  } else {
    res.status(400).send('Invalid credentials');
  }
});

module.exports = router;
