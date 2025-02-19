import React, { useState, useEffect } from "react";
import "./Chatbot.css"; // Import the CSS file



const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState("");  

  const toggleChat = () => setIsOpen(!isOpen);

  const sendMessage = async () => {
    if (!userInput.trim()) return;
    
    const newMessages = [...messages, { text: userInput, sender: "user" }];
    setMessages(newMessages);
    setUserInput("");

    try {
      const response = await fetch("http://localhost:5000/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userInput }),
      });

      const data = await response.json();
      setMessages([...newMessages, { text: data.response, sender: "bot" }]);
    } catch (error) {
      setMessages([...newMessages, { text: "Error: Unable to fetch response.", sender: "bot" }]);
    }
  };

  // Auto-scroll to the latest message
  useEffect(() => {
    const chatContainer = document.querySelector(".chatbot-messages");
    if (chatContainer) {
      chatContainer.scrollTop = chatContainer.scrollHeight;
    }
  }, [messages]); // Runs whenever messages update

  return (
    <div>
      <div className="chatbot-button" onClick={toggleChat}>
        💬
      </div>

      {isOpen && (
        <div className="chatbot-container">
          <div className="chatbot-header">
            <span>Art Connect Chatbot</span>
            <button className="close-btn" onClick={toggleChat}>✖</button>
          </div>

          <div className="chatbot-messages">
            {messages.map((msg, index) => (
              <div key={index} className={`chat-message ${msg.sender}`}>
                {msg.text}
              </div>
            ))}
          </div>

          <div className="chatbot-input">
                <input
                type="text"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                placeholder="Type a message..."
                onKeyDown={(e) => e.key === "Enter" && sendMessage()} // Detect Enter key
                />
            <button onClick={sendMessage}>Send</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot;
