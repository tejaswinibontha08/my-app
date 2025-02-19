const express = require('express');
const bcrypt = require('bcrypt');
const { User } = require('../models'); // Assuming User model is defined in models

const router = express.Router();

// Sign Up Route (Now includes name, email, password, creative domain)
router.post('/signup', async (req, res) => {
  const { name, email, password, creativeDomain } = req.body;

  try {
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash password before storing
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({ name, email, password: hashedPassword, creativeDomain });
    res.status(201).json({ message: "User registered successfully", user: newUser });
  } catch (error) {
    res.status(500).json({ message: "Error registering user", error });
  }
});

// Update Profile Route (For work samples, experience, and skills)
router.put('/update-profile', async (req, res) => {
  const { email, workSamples, professionalExperience, skills } = req.body;

  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    // Update fields in user profile
    user.workSamples = workSamples || user.workSamples;
    user.professionalExperience = professionalExperience || user.professionalExperience;
    user.skills = skills || user.skills;

    await user.save();
    res.status(200).json({ message: "Profile updated successfully", user });
  } catch (error) {
    res.status(500).json({ message: "Error updating profile", error });
  }
});

module.exports = router;
