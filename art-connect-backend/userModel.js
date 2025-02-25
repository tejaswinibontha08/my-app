const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, default: ""},
  firstName: { type: String, default: ""},
  lastName: { type: String, default: ""},
  bio: { type: String, default: "" },
  socialMedia: {
    twitter: { type: String, default: "" },
    linkedin: { type: String, default: "" },
    facebook: { type: String, default: "" },
    instagram: { type: String, default: "" }
  },
  interests: { type: [String], default: [] }, // Array of interests
  experience: [
    {
      jobTitle: String,
      productionName: String,
      startDate: String,
      endDate: String,
      isPresent: Boolean,
      responsibilities: String
    }
  ],
  skills: { type: [String], default: [] }
});

module.exports = mongoose.model('User', userSchema);