import React, { useState } from "react"; // Import React and useState
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import axios from "axios"; // Import axios for HTTP requests
import { GoogleLogin } from "@react-oauth/google"; // Google OAuth


function DynamicBackgroundLoginPage() {
  const [isSignUp, setIsSignUp] = useState(false); // Toggle between login and signup
  const [email, setEmail] = useState(""); // State for email
  const [password, setPassword] = useState(""); // State for password
  const navigate = useNavigate(); // useNavigate for navigation

  const handleLogin = async () => {
    const endpoint = "/api/login"; // Login endpoint

    try {
      const response = await axios.post(`http://localhost:5000${endpoint}`, {
        email,
        password,
      });

      alert(response.data.message);

      // Login successful, navigate to homepage
      navigate("/Homepage");
    } catch (error) {
      if (error.response) {
        alert(`Error: ${error.response.data.message} (Status: ${error.response.status})`);
      } else if (error.request) {
        alert("No response received from the server. Please check your network connection.");
      } else {
        alert(`Request error: ${error.message}`);
      }
    }

    // Clear input fields after login attempt
    setEmail("");
    setPassword("");
  };

  const handleSignUp = async () => {
    const endpoint = "/api/signup"; // SignUp endpoint

    try {
      const response = await axios.post(`http://localhost:5000${endpoint}`, {
        email,
        password,
      });

      alert(response.data.message);

      // After successful signup, switch to login
      alert("Account created successfully. Please log in.");
      setIsSignUp(false);
    } catch (error) {
      if (error.response) {
        alert(`Error: ${error.response.data.message} (Status: ${error.response.status})`);
      } else if (error.request) {
        alert("No response received from the server. Please check your network connection.");
      } else {
        alert(`Request error: ${error.message}`);
      }
    }

    // Clear input fields after signup attempt
    setEmail("");
    setPassword("");
  };

  const handleGoogleLoginSuccess = async (response) => {
    try {
      const token = response.credential; // Extract Google token

      // Send token to backend for verification
      const backendResponse = await axios.post("http://localhost:5000/api/google-login", {
        token, // Send token in request body
      });

      alert(backendResponse.data.message);
      navigate("/Homepage"); // Navigate to homepage
    } catch (error) {
      console.error("Google login failed:", error);
      alert("Google login failed. Please try again.");
    }
  };

  const handleGoogleLoginFailure = () => {
    alert("Google login was unsuccessful. Please try again.");
  };

  const toggleForm = () => {
    setIsSignUp(!isSignUp);
  };

  return (
    <div
      style={{
        position: "relative",
        height: "100vh",
        width: "100%",
        backgroundImage:
          "url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSPSesFJO3_o3na5xCC0IPEnDGvyK-oDGUsXg&s')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Overlay */}
      <div
        style={{
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
        }}
      />
      <div
        style={{
          position: "absolute",
          left: "5%",
          top: "50%",
          transform: "translateY(-50%)",
          width: "30%",
          backgroundColor: "#f0f0f0",
          padding: "2rem",
          borderRadius: "8px",
        }}
      >
        <h2>{isSignUp ? "Sign Up" : "Log In"}</h2>
        <div>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{
              marginBottom: "1rem",
              width: "100%",
              padding: "0.8rem",
              borderRadius: "4px",
              border: "1px solid #ccc",
              transition: "all 0.3s ease",
            }}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{
              marginBottom: "1rem",
              width: "100%",
              padding: "0.8rem",
              borderRadius: "4px",
              border: "1px solid #ccc",
              transition: "all 0.3s ease",
            }}
          />
          <button
            onClick={isSignUp ? handleSignUp : handleLogin} // Use correct handler for login/signup
            style={{
              width: "100%",
              backgroundColor: "#007bff", // Blue color
              color: "white",
              padding: "0.8rem",
              borderRadius: "4px",
              border: "none",
              cursor: "pointer",
              transition: "transform 0.3s ease, background-color 0.3s ease", // Add transition for hover effect
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = "scale(1.05)"; // Scale effect on hover
              e.target.style.backgroundColor = "#0056b3"; // Darken the button color on hover
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = "scale(1)"; // Reset scale effect
              e.target.style.backgroundColor = "#007bff"; // Reset button color
            }}
          >
            {isSignUp ? "Sign Up" : "Log In"}
          </button>

          <p style={{ textAlign: "center", margin: "1rem 0" }}>OR</p>

          {/* Google Login Button */}
          <div style={{ display: "flex", justifyContent: "center" }}>
            <GoogleLogin
              onSuccess={handleGoogleLoginSuccess}
              onError={handleGoogleLoginFailure}
            />
          </div>
        </div>

        <p>
          {isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
          <span
            onClick={toggleForm}
            style={{ cursor: "pointer", color: "blue" }}
          >
            {isSignUp ? "Log In" : "Sign Up"}
          </span>
        </p>
      </div>
    </div>
  );
}

export default DynamicBackgroundLoginPage;
