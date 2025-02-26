import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import LoginPage from "./LoginPage";
import HomePage from "./HomePage";
import Chatbot from "./Chatbot";
import Cinematography from "./domain/Cinematography";
import Screenwriting from "./domain/Screenwriting";
import Editing from "./domain/Editing";
import Direction from "./domain/Direction";
import Production from "./domain/Production";
import SoundDesign from "./domain/SoundDesign";
import VisualEffects from "./domain/VisualEffects";
import CostumeDesign from "./domain/CostumeDesign";
import FilmMusic from "./domain/FilmMusic";
import Chat from "./Chat";

import ProfilePage from './components/ProfilePage';
import Navbar from './components/Navbar';

function App() {
  const clientId = "81814304503-p9g82oi381oa5vv272o6rkn2dcbj2ggb.apps.googleusercontent.com"; // Replace with actual Client ID

  if (!clientId) {
    console.error("Google Client ID is missing!");
  }

  return (
    <GoogleOAuthProvider clientId={clientId}>
      <Router>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/HomePage" element={<HomePage />} />
          <Route path="/chatbot" element={<Chatbot />} />
          <Route path="/domain/cinematography" element={<Cinematography />} />
          <Route path="/domain/screenwriting" element={<Screenwriting />} />
          <Route path="/domain/editing" element={<Editing />} />
          <Route path="/domain/directing" element={<Direction />} />
          <Route path="/domain/production" element={<Production />} />
          <Route path="/domain/sounddesign" element={<SoundDesign />} />
          <Route path="/domain/visualeffects" element={<VisualEffects />} />
          <Route path="/domain/costumedesign" element={<CostumeDesign />} />
          <Route path="/domain/filmmusic" element={<FilmMusic />} />
          <Route path ="/Chat" element={<Chat />} />
          <Route path="/components/ProfilePage" element={<ProfilePage />} />
          <Route path="/profile/:username" element={<ProfilePage />} />
          <Route path="/components/Navbar" element={<Navbar />} />
        </Routes>
      </Router>
    </GoogleOAuthProvider>
  );
}

export default App; 