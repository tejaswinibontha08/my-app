// import React from "react";
// import { useNavigate } from "react-router-dom";
// import './Homepage.css'; // Add CSS for profile icon and general styling
// import Chatbot from "./Chatbot";

// function Homepage() {
//   const navigate = useNavigate();

//   // Domains and descriptions
//   const domains = [
//     { name: "Cinematography", description: "Art of visual storytelling" },
//     { name: "Screenwriting", description: "Writing compelling scripts" },
//     { name: "Directing", description: "Guiding film production" },
//     { name: "Editing", description: "Arranging visual footage" },
//     { name: "Production", description: "Managing film process" },
//     { name: "SoundDesign", description: "Creating sound effects" },
//     { name: "VisualEffects", description: "Creating digital effects" },
//     { name: "CostumeDesign", description: "Designing character costumes" },
//     { name: "FilmMusic", description: "Composing film scores" },
//   ];

//   // Handle domain click (navigate to a new page or update content)
//   const handleDomainClick = (domain) => {
//     navigate(`/domain/${domain.name}`);
//   };

//   return (
//     <div
//       style={{
//         textAlign: "center",
//         padding: "2rem",
//         backgroundImage:
//           "url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQjz2oifUiW_M37QTkFUm8vjs26409hashFRCFJ0W87Y3fZp0T0fCOC_8zzVm4pRBr920A&usqp=CAU')",
//         backgroundSize: "cover",
//         backgroundPosition: "center",
//         minHeight: "100vh",
//       }}
//     >
//       <link
//         href="https://fonts.googleapis.com/css2?family=Dancing+Script:wght@700&display=swap"
//         rel="stylesheet"
//       />

//       <h1
//         style={{
//           fontFamily: "'Dancing Script', cursive",
//           fontSize: "3rem",
//           color: "#fff",
//           marginBottom: "2rem",
//         }}
//       >
//         Welcome to ArtConnect
//       </h1>

//       {/* Profile Icon */}
//       <div
//         style={{
//           position: "absolute",
//           top: "20px",
//           right: "20px",
//           cursor: "pointer",
//         }}
//         onClick={() => navigate("/profile")}
//       >
//         <img
//           src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSd3Z1x2Gh1fwbXhqvNekPS4DfWm0rdweKQjA&s"
//           alt="Profile"
//           style={{
//             width: "40px",
//             height: "40px",
//             borderRadius: "50%",
//             border: "2px solid #fff",
//             backgroundColor: "#fff",
//             padding: "5px",
//           }}
//         />
//       </div>

//       {/* Domains display */}
//       <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
//         {domains.map((domain) => (
//           <div
//             key={domain.name}
//             onClick={() => handleDomainClick(domain)}
//             style={{
//               backgroundColor: "rgba(255, 255, 255, 0.7)",
//               margin: "1rem",
//               padding: "1rem",
//               borderRadius: "8px",
//               cursor: "pointer",
//               boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
//               transition: "transform 0.3s ease, box-shadow 0.3s ease",
//               width: "200px",
//               textAlign: "center",
//             }}
//             onMouseEnter={(e) => {
//               e.target.style.transform = "scale(1.05)";
//               e.target.style.boxShadow = "0px 6px 10px rgba(0, 0, 0, 0.2)";
//             }}
//             onMouseLeave={(e) => {
//               e.target.style.transform = "scale(1)";
//               e.target.style.boxShadow = "0px 4px 6px rgba(0, 0, 0, 0.1)";
//             }}
//           >
//             <h3 style={{ fontSize: "1.5rem", marginBottom: "0.5rem" }}>{domain.name}</h3>
//             <p>{domain.description}</p>
//           </div>
//         ))}
//       </div>
//       {/* Chatbot */}
//       <Chatbot />
//     </div>
//   );
// }

// export default Homepage;
import { useNavigate } from "react-router-dom";
import './Homepage.css'; // Add CSS for profile icon and general styling
import Chatbot from "./Chatbot";
import React, { useState } from "react";
import { Send } from "lucide-react";

import Chat from "./Chat"; 

function Homepage() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const navigate = useNavigate();

  // Domains and descriptions
  const domains = [
    { name: "Cinematography", description: "Art of visual storytelling" },
    { name: "Screenwriting", description: "Writing compelling scripts" },
    { name: "Directing", description: "Guiding film production" },
    { name: "Editing", description: "Arranging visual footage" },
    { name: "Production", description: "Managing film process" },
    { name: "SoundDesign", description: "Creating sound effects" },
    { name: "VisualEffects", description: "Creating digital effects" },
    { name: "CostumeDesign", description: "Designing character costumes" },
    { name: "FilmMusic", description: "Composing film scores" },
  ];

  // Handle domain click (navigate to a new page or update content)
  const handleDomainClick = (domain) => {
    navigate(`/domain/${domain.name}`);
  };

  return (<div
    style={{
      textAlign: "center",
      padding: "2rem",
      backgroundImage:
        "url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQjz2oifUiW_M37QTkFUm8vjs26409hashFRCFJ0W87Y3fZp0T0fCOC_8zzVm4pRBr920A&usqp=CAU')",
      backgroundSize: "cover",
      backgroundPosition: "center",
      minHeight: "100vh",
      position: "relative",
    }}
  >
    <link
      href="https://fonts.googleapis.com/css2?family=Dancing+Script:wght@700&display=swap"
      rel="stylesheet"
    />

    <h1
      style={{
        fontFamily: "'Dancing Script', cursive",
        fontSize: "3rem",
        color: "#fff",
        marginBottom: "2rem",
      }}
    >
      Welcome to ArtConnect
    </h1>

    {/* Profile Icon */}
    <div
      style={{
        position: "absolute",
        top: "20px",
        right: "20px",
        cursor: "pointer",
      }}
      onClick={() => navigate("/components/ProfilePage")}
    >
      <img
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSd3Z1x2Gh1fwbXhqvNekPS4DfWm0rdweKQjA&s"
        alt="Profile"
        style={{
          width: "40px",
          height: "40px",
          borderRadius: "50%",
          border: "2px solid #fff",
          backgroundColor: "#fff",
          padding: "5px",
        }}
      />
    </div>

    {/* Domains Display */}
    <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
      {domains.map((domain) => (
        <div
          key={domain.name}
          onClick={() => handleDomainClick(domain)}
          style={{
            backgroundColor: "rgba(255, 255, 255, 0.7)",
            margin: "1rem",
            padding: "1rem",
            borderRadius: "8px",
            cursor: "pointer",
            boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
            transition: "transform 0.3s ease, box-shadow 0.3s ease",
            width: "200px",
            textAlign: "center",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "scale(1.05)";
            e.currentTarget.style.boxShadow = "0px 6px 10px rgba(0, 0, 0, 0.2)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "scale(1)";
            e.currentTarget.style.boxShadow = "0px 4px 6px rgba(0, 0, 0, 0.1)";
          }}
        >
          <h3 style={{ fontSize: "1.5rem", marginBottom: "0.5rem" }}>{domain.name}</h3>
          <p>{domain.description}</p>
        </div>
      ))}
    </div>

    {/* Floating Chat Button */}
    <button
      onClick={() => setIsChatOpen(true)}
      style={{
        position: "fixed",
        bottom: "20px",
        left: "20px",
        backgroundColor: "#007bff",
        color: "white",
        border: "none",
        borderRadius: "50%",
        width: "50px",
        height: "50px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.3)",
      }}
    >
      <Send size={24} />
    </button>

    {/* Chat Popup */}
    {isChatOpen && (
      <div
        style={{
          position: "fixed",
          bottom: "80px",
          left: "20px",
          width: "750px",
          height: "500px",
          backgroundColor: "white",
          borderRadius: "10px",
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.3)",
          padding: "10px",
          display: "flex",
          flexDirection: "column",
          zIndex: 1000,
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <h3>Chat</h3>
          <button onClick={() => setIsChatOpen(false)} style={{ cursor: "pointer" }}>
            ✖
          </button>
        </div>
        <Chat />
      </div>
    )}

    {/* Chatbot Component */}
    <Chatbot />
  </div>
);
}

export default Homepage;
