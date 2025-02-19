const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const multer = require("multer");
const { OAuth2Client } = require("google-auth-library");
require("dotenv").config();
const { GoogleGenerativeAI } = require("@google/generative-ai");
const stringSimilarity = require("string-similarity");

const app = express();
const PORT = process.env.PORT || 5000;
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID); // Ensure this is in your .env
const GEMINI_API_KEY = "AIzaSyDDNZqoNrPJBBWK17tFivCikC4gHoX5nGw"; 

// Middleware
app.use(bodyParser.json({ limit: "50mb" })); // Increased limit for large images
app.use(cors());

// MongoDB Connection
const mongoURI = process.env.MONGO_URI || "mongodb://localhost:27017/art_connect";
mongoose
  .connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// Configure Multer for File Uploads (Memory Storage)
const storage = multer.memoryStorage();
const upload = multer({ storage });

// *Schemas*
// User Schema
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});
const User = mongoose.model("User", userSchema)

// Google Login API
app.post("/api/google-login", async (req, res) => {
  try {
    const { token } = req.body;
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    const email = payload.email;
    res.json({ message: `Welcome ${email}!` });
  } catch (error) {
    res.status(400).json({ message: "Invalid Google token" });
  }
});

// User Signup
app.post("/api/signup", async (req, res) => {
  const { email, password ,username} = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "User already exists" });

    const newUser = new User({ email, password });
    await newUser.save();
    res.status(201).json({ message: "✅ User registered successfully", user: newUser });
  } catch (error) {
    res.status(500).json({ message: "❌ Error registering user", error });
  }
});

// User Login
app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user || user.password !== password) {
      return res.status(400).json({ message: "❌ Invalid credentials" });
    }
    res.status(200).json({ message: "✅ Login successful", user });
  } catch (error) {
    res.status(500).json({ message: "❌ Error logging in", error });
  }
});

// Domain Schema
const domainSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  keySkills: [String],
});
const Domain = mongoose.model("Domain", domainSchema);

// Get All Domains
app.get("/api/domains", async (req, res) => {
  try {
    const domains = await Domain.find();
    res.json(domains);
  } catch (error) {
    res.status(500).json({ message: "❌ Error fetching domains", error });
  }
});

// Post Schema (Supports Image URL or Base64)
const postSchema = new mongoose.Schema({
  domain: { type: mongoose.Schema.Types.ObjectId, ref: "Domain", required: true },
  user: { type: String, required: true },
  content: { type: String },
  image: { type: String }, // Can store image URL or Base64
  timestamp: { type: Date, default: Date.now },
});
const Post = mongoose.model("Post", postSchema);


// Get Posts for a Specific Domain
app.get("/api/posts/:domainId", async (req, res) => {
  try {
    const posts = await Post.find({ domain: req.params.domainId }).sort({ timestamp: -1 });
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: "❌ Error fetching posts", error });
  }
});

// Create a New Post (With Image URL or File Upload)
// Create a New Post
app.post("/api/posts", upload.single("imageFile"), async (req, res) => {
  const { domainId, user, content, image } = req.body;
  let imageData = image;

  if (req.file) {
    imageData = `data:${req.file.mimetype};base64,${req.file.buffer.toString("base64")}`;
  }

  try {
    const post = new Post({ domain: domainId, user, content, image: imageData });
    await post.save();
    res.status(201).json({ message: "✅ Post created successfully", post });
  } catch (error) {
    res.status(500).json({ message: "❌ Error creating post", error });
  }
});

// *Delete a Post*
app.delete("/api/posts/:postId", async (req, res) => {
  try {
    const { postId } = req.params;
    const deletedPost = await Post.findByIdAndDelete(postId);
    
    if (!deletedPost) {
      return res.status(404).json({ message: "❌ Post not found" });
    }

    res.status(200).json({ message: "✅ Post deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "❌ Error deleting post", error });
  }
});

// Initialize Google AI Client
const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

// 1️⃣ *Rule-Based Responses (FAQs)*
const faqResponses = {
    // 🤖 Chatbot Personality & Purpose
    "who are you?": "I'm Art Connect's virtual assistant! 🤖 I'm here to help you with anything related to Art Connect—profiles, portfolios, collaboration, and more!",
    "what is your name?": "You can call me ArtBot! 🎨🤖 I'm here to assist you with everything on Art Connect!",
    "how are you useful to this?": "I can help you navigate Art Connect, answer your questions, and assist with profile setup, collaboration, and content protection!",
    "what can you do?": "I can help you create a profile, upload your portfolio, find artists, and understand Art Connect’s features! Just ask me anything!",
    "are you human?": "Nope, I'm a virtual assistant! 🤖 But I’m here 24/7 to help you with Art Connect!",
    "why are you here?": "I'm here to make your Art Connect experience smooth and hassle-free! Ask me anything about the platform! 😊",
    "how do you work?": "I use a mix of *predefined answers and AI* to assist you! If I don't know something, I ask my AI friend, Gemini! 😃",

    // General FAQs
    "what is art connect?": "✨ Art Connect is a vibrant platform where artists can showcase their work, connect with like-minded creators, and explore collaboration opportunities!",
    "who can use art connect?": "🎭 Musicians, directors, editors, scriptwriters, dancers—anyone passionate about creativity is welcome here!",
    "is art connect free?": "Yes! 🌟 Our core features are completely free, but we may introduce premium features in the future.",
    "how do i join art connect?": "Joining is simple! Click 'Sign Up,' enter your details, and choose your artistic domain. Welcome aboard! 🎨🎶",

    // Profile & Account Management
    "how do i create a profile?": "Creating your profile is easy! Simply sign up, fill in your details, and select your artistic domain. Your creative journey starts here! 🚀",
    "can i edit my profile later?": "Absolutely! Go to 'Profile Settings' anytime and update your details as needed. 😊",
    "can i delete my art connect account?": "We're sad to see you go! 😢 But yes, you can delete your account from 'Settings' > 'Delete Account'.",
    "how do i reset my password?": "No worries! Click 'Forgot Password' on the login page and follow the steps to reset it. 🔑",

    // Portfolio & Content Upload
    "how do i upload my portfolio?": "Uploading your work is easy! Go to your dashboard, click 'Add Portfolio Item,' and share your creativity with the world. 🌍",
    "what file types are supported?": "Art Connect supports images, videos, audio, and documents! (MP4, MP3, PNG, JPG, PDF, etc.) 🎵📸",
    "can i organize my portfolio?": "Of course! You can categorize your work and add tags to make it easier for others to find. 🔍",
    "how do i make my content private?": "You have full control! Set your portfolio visibility to 'Private' when uploading or editing. 🔒",

    // Connecting & Collaborating
    "how do i find other artists?": "You can use the 'Explore' tab to search for artists by name, skill, or artistic domain. Connect and create magic together! 🎭✨",
    "can i message other users?": "Yes! Simply visit their profile and click 'Send Message' to start a conversation. 💬",
    "how do i collaborate on a project?": "Once you find an artist, start a chat and discuss your ideas. You can even create a group chat for team collaborations! 🤝",
    "can i join multiple domains?": "Yes, you’re free to explore multiple artistic domains! Creativity knows no limits. 🎨🎶🎭",

    // Security & Copyright Protection
    "how is my content protected?": "Your work is safe with us! We offer copyright protection, encryption, and digital fingerprinting to keep your content secure. 🔐",
    "can others download my content?": "Only if you allow it! Your content is private by default unless you choose to make it public. 🛡",
    "how do i report stolen content?": "If you find someone misusing your work, go to 'Report Issue' and provide details. We take copyright seriously! 📢",
    "what is ‘upcoming project’ protection?": "With this feature, only a *preview* of your content is visible while the full work remains private and protected. 🚀",

    // Troubleshooting & Assistance
    "i can’t log in. what should i do?": "No worries! Try resetting your password or contact our support team for help. 💡",
    "why is my portfolio not uploading?": "Check if your file format and size meet the requirements. If you still face issues, please reach out to us. 📩",
    "how do i contact art connect support?": "We’re here to help! Visit the ‘Help’ section or email our support team. 💙",
    "can i recover deleted content?": "Unfortunately, deleted content is permanently removed. Make sure to back up your work before deleting. 📂",

    // 🏁 End-of-Conversation Responses
    "thank you": "You're very welcome! 😊 Let me know if you need help anytime!",
    "thanks": "Happy to help! 🎨 Have a great day!",
    "bye": "Goodbye! 👋 Keep creating amazing art!",
    "see you later": "See you soon! 🎭 Feel free to come back anytime!",
    "that’s all": "Got it! If you need anything else, just ask. 😊",
    "no more questions": "Alright! If anything comes up, I’m here to help!"
};

// 2️⃣ *Function to check FAQ database*
function checkFAQ(userMessage) {
    const userInput = userMessage.toLowerCase();

    // Find the most similar question in the FAQ database
    const faqKeys = Object.keys(faqResponses);
    const bestMatch = stringSimilarity.findBestMatch(userInput, faqKeys);

    // If similarity score is high (above 0.6), return the matched response
    if (bestMatch.bestMatch.rating > 0.6) {
        return faqResponses[bestMatch.bestMatch.target];
    }
    
    return null; // No close match found, fallback to Gemini AI
}

// 3️⃣ *Function to call Gemini API*
async function getGeminiResponse(userMessage) {
    try {
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        const systemInstruction = `
        You are Art Connect's AI assistant. Keep responses short, engaging, and relevant to Art Connect.
        If unsure, say: "I’m not sure. Please check the website for details."
        `;

        const result = await model.generateContent({
            contents: [{ role: "user", parts: [{ text: userMessage }] }],
            systemInstruction: systemInstruction
        });

        let responseText = result.response.text();

        if (responseText.length > 175) {
            responseText = responseText.split(". ").slice(0, 2).join(". ") + ".\n\nWant more details? Just ask!";
        }

        return responseText;
    } catch (error) {
        console.error("Gemini API Error:", error);
        return "Sorry, I couldn't process that. Check the website for details.";
    }
}

// 4️⃣ *Chatbot API Route*
app.post('/api/chat', async (req, res) => {
    const userMessage = req.body.message;

    // Check if the input matches an FAQ
    const faqResponse = checkFAQ(userMessage);
    if (faqResponse) {
        return res.json({ response: faqResponse });
    }

    // If no FAQ match, use Gemini API
    const aiResponse = await getGeminiResponse(userMessage);
    res.json({ response: aiResponse });
});

const server = app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});

server.on("error", (err) => {
  if (err.code === "EADDRINUSE") {
    const newPort = PORT + 1;
    console.log(`⚠ Port ${PORT} is in use, trying port ${newPort}...`);
    app.listen(newPort, () => {
      console.log(`🚀 Server running on http://localhost:${newPort}`);
    });
  }
});