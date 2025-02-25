const express = require('express');
const router = express.Router();
const User = require('../userModel'); // Import user model

// Fetch user bio using username
router.get('/get-bio/:username', async (req, res) => {
  try {
    const user = await User.findOne({ username: req.params.username });
    if (user) {
      res.json({ bio: user.bio || "" });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update/Add bio using username
router.put('/update-bio', async (req, res) => {
  try {
    const { username, bio } = req.body;
    const updatedUser = await User.findOneAndUpdate(
      { username },
      { bio },
      { new: true }
    );
    if (updatedUser) {
      res.json({ bio: updatedUser.bio });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete bio using username
router.delete('/delete-bio', async (req, res) => {
  try {
    const { username } = req.body;
    const updatedUser = await User.findOneAndUpdate(
      { username },
      { bio: "" },
      { new: true }
    );
    if (updatedUser) {
      res.json({ message: "Bio deleted", bio: "" });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;