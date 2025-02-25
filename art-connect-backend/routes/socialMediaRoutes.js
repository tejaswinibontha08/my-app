const express = require('express');
const router = express.Router();
const User = require('../userModel'); // Import User model

// Fetch user's social media links
router.get('/get-social-media/:username', async (req, res) => {
  try {
    const user = await User.findOne({ username: req.params.username });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ socialMedia: user.socialMedia });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update or add social media links
router.put('/update-social-media', async (req, res) => {
  const { username, platform, link } = req.body;

  try {
    const updatedUser = await User.findOneAndUpdate(
      { username },
      { $set: { [`socialMedia.${platform}`]: link } }, // Dynamic field update
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ message: "Social media link updated!", updatedUser });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete a social media link
router.delete('/delete-social-media', async (req, res) => {
  const { username, platform } = req.body;

  try {
    const updatedUser = await User.findOneAndUpdate(
      { username },
      { $unset: { [`socialMedia.${platform}`]: "" } }, // Remove only the specified platform
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ message: "Social media link deleted!", updatedUser });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;