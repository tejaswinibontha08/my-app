const express = require('express');
const router = express.Router();
const User = require('../userModel'); // Import User model

// Fetch Interests, Experience, and Skills
router.get('/get-ise/:username', async (req, res) => {
  try {
    const user = await User.findOne({ username: req.params.username });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({
      interests: user.interests,
      experience: user.experience,
      skills: user.skills
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update Interests
router.put('/update-interests', async (req, res) => {
  const { username, interests } = req.body;

  try {
    const updatedUser = await User.findOneAndUpdate(
      { username },
      { $set: { interests } },
      { new: true }
    );

    res.json({ message: "Interests updated!", updatedUser });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Add Experience
router.post('/add-experience', async (req, res) => {
  const { username, experience } = req.body;

  try {
    const updatedUser = await User.findOneAndUpdate(
      { username },
      { $push: { experience } },
      { new: true }
    );

    res.json({ message: "Experience added!", updatedUser });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update Experience
router.put('/update-experience', async (req, res) => {
  const { username, experienceIndex, experience } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user) return res.status(404).json({ message: "User not found" });

    user.experience[experienceIndex] = experience;
    await user.save();

    res.json({ message: "Experience updated!", updatedUser: user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete Experience
router.delete('/delete-experience', async (req, res) => {
  const { username, experienceIndex } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user) return res.status(404).json({ message: "User not found" });

    user.experience.splice(experienceIndex, 1);
    await user.save();

    res.json({ message: "Experience deleted!", updatedUser: user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Add Skill
router.post('/add-skill', async (req, res) => {
  const { username, skill } = req.body;

  try {
    const updatedUser = await User.findOneAndUpdate(
      { username },
      { $push: { skills: skill } },
      { new: true }
    );

    res.json({ message: "Skill added!", updatedUser });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update Skill
router.put('/update-skill', async (req, res) => {
  const { username, skillIndex, skill } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user) return res.status(404).json({ message: "User not found" });

    user.skills[skillIndex] = skill;
    await user.save();

    res.json({ message: "Skill updated!", updatedUser: user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete Skill
router.delete('/delete-skill', async (req, res) => {
  const { username, skillIndex } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user) return res.status(404).json({ message: "User not found" });

    user.skills.splice(skillIndex, 1);
    await user.save();

    res.json({ message: "Skill deleted!", updatedUser: user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;