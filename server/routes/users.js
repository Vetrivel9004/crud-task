// server/routes/users.js
const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Get all users
router.get('/', async (req, res) => {
  const users = await User.find();
  res.json(users);
});

// Create a new user
router.post('/', async (req, res) => {
  const { name, email } = req.body;
  const user = new User({ name, email });
  await user.save();
  res.json(user);
});

// Update a user
router.put('/:id', async (req, res) => {
  const { name, email } = req.body;
  const updatedUser = await User.findByIdAndUpdate(req.params.id, { name, email }, { new: true });
  res.json(updatedUser);
});

// Delete a user
router.delete('/:id', async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.status(204).send();
});

module.exports = router;
