// import React, { useState, useEffect } from "react";
// import io from "socket.io-client";
// import axios from "axios";

// const socket = io("http://localhost:5000");

// const Chat = () => {
//   const [message, setMessage] = useState("");
//   const [messages, setMessages] = useState([]);
//   const [users, setUsers] = useState([]);
//   const [selectedUser, setSelectedUser] = useState(null);
//   const loggedInEmail = localStorage.getItem("userEmail");

//   useEffect(() => {
//     const fetchUsers = async () => {
//       try {
//         const response = await axios.get(
//           `http://localhost:5000/get-users?email=${loggedInEmail}`
//         );
//         setUsers(response.data);
//       } catch (error) {
//         console.error("Error fetching users:", error);
//       }
//     };

//     fetchUsers();

//     socket.on("receiveMessage", (data) => {
//       if (
//         selectedUser &&
//         ((data.sender === loggedInEmail && data.receiver === selectedUser.email) ||
//           (data.sender === selectedUser.email && data.receiver === loggedInEmail))
//       ) {
//         setMessages((prevMessages) => [...prevMessages, data]);
//       }
//     });

//     return () => {
//       socket.off("receiveMessage");
//     };
//   }, [loggedInEmail, selectedUser]);

//   const selectUser = async (user) => {
//     setSelectedUser(user);
//     try {
//       const response = await axios.get(
//         `http://localhost:5000/get-messages?user1=${loggedInEmail}&user2=${user.email}`
//       );
//       setMessages(response.data);
//     } catch (error) {
//       console.error("Error fetching chat history:", error);
//     }
//   };

//   const sendMessage = () => {
//     if (message.trim() !== "" && selectedUser) {
//       const newMessage = {
//         text: message,
//         sender: loggedInEmail,
//         receiver: selectedUser.email,
//       };
//       socket.emit("sendMessage", newMessage);
//       setMessage(""); // Clear input after sending
//     }
//   };
  
//   return (
//     <div className="flex h-screen bg-gray-100">
//       {/* User List */}
//       <div className="w-1/4 bg-white p-4 border-r shadow-md">
//         <h3 className="text-lg font-semibold mb-4">Users</h3>
//         <div className="space-y-2">
//           {users.map((user) => (
//             <div
//               key={user.email}
//               onClick={() => selectUser(user)}
//               className={`p-3 rounded-md cursor-pointer text-sm font-medium transition duration-200 ${
//                 selectedUser?.email === user.email
//                   ? "bg-blue-500 text-white"
//                   : "hover:bg-gray-200"
//               }`}
//             >
//               {user.username}
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Chat Section */}
//       <div className="w-3/4 flex flex-col">
//         {selectedUser ? (
//           <>
//             <div className="bg-blue-500 text-white p-4 text-lg font-semibold">
//               Chat with {selectedUser.username}
//             </div>

//             <div className="flex-1 p-4 overflow-y-auto h-96 space-y-2 bg-gray-50">
//               {messages.map((msg, index) => (
//                 <div
//                   key={index}
//                   className={`p-3 rounded-lg max-w-xs ${
//                     msg.sender === loggedInEmail
//                       ? "bg-blue-500 text-white self-end ml-auto"
//                       : "bg-gray-200 text-black self-start"
//                   }`}
//                 >
//                   <strong>
//                     {msg.sender === loggedInEmail ? "You" : selectedUser.username}:
//                   </strong>{" "}
//                   {msg.text}
//                 </div>
//               ))}
//             </div>

//             <div className="p-4 border-t bg-white flex items-center">
//               <input
//                 type="text"
//                 value={message}
//                 onChange={(e) => setMessage(e.target.value)}
//                 placeholder="Type a message..."
//                 className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//               />
//               <button
//                 onClick={sendMessage}
//                 className="bg-blue-500 text-white px-4 py-2 rounded-lg ml-2 hover:bg-blue-600"
//               >
//                 Send
//               </button>
//             </div>
//           </>
//         ) : (
//           <div className="flex-1 flex items-center justify-center text-gray-500">
//             Select a user to start chatting
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Chat;
import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import axios from "axios";

const socket = io("http://localhost:5000");

const Chat = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const loggedInEmail = localStorage.getItem("userEmail");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/get-users?email=${loggedInEmail}`
        );
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();

    socket.on("receiveMessage", (data) => {
      if (
        selectedUser &&
        ((data.sender === loggedInEmail && data.receiver === selectedUser.email) ||
          (data.sender === selectedUser.email && data.receiver === loggedInEmail))
      ) {
        setMessages((prevMessages) => [...prevMessages, data]);
      }
    });

    return () => {
      socket.off("receiveMessage");
    };
  }, [loggedInEmail, selectedUser]);

  const selectUser = async (user) => {
    setSelectedUser(user);
    try {
      const response = await axios.get(
        `http://localhost:5000/get-messages?user1=${loggedInEmail}&user2=${user.email}`
      );
      setMessages(response.data);
    } catch (error) {
      console.error("Error fetching chat history:", error);
    }
  };

  const sendMessage = () => {
    if (message.trim() !== "" && selectedUser) {
      const newMessage = {
        text: message,
        sender: loggedInEmail,
        receiver: selectedUser.email,
      };
      socket.emit("sendMessage", newMessage);
      setMessage(""); // Clear input after sending
    }
  };
  
  return (
    <div className="flex h-screen bg-gray-100">
      {/* User List */}
      <div className="w-1/4 bg-white p-4 border-r shadow-md">
        <h3 className="text-lg font-semibold mb-4">Users</h3>
        <div className="space-y-2">
          {users.map((user) => (
            <div
              key={user.email}
              onClick={() => selectUser(user)}
              className={`p-3 rounded-md cursor-pointer text-sm font-medium transition duration-200 ${
                selectedUser?.email === user.email
                  ? "bg-blue-500 text-white"
                  : "hover:bg-gray-200"
              }`}
            >
              {user.username}
            </div>
          ))}
        </div>
      </div>

      {/* Chat Section */}
      <div className="w-3/4 flex flex-col">
        {selectedUser ? (
          <>
            <div className="bg-blue-500 text-white p-4 text-lg font-semibold">
              Chat with {selectedUser.username}
            </div>

            <div className="flex-1 p-4 overflow-y-auto h-96 space-y-2 bg-gray-50">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`p-3 rounded-lg max-w-xs ${
                    msg.sender === loggedInEmail
                      ? "bg-blue-500 text-white self-end ml-auto"
                      : "bg-gray-200 text-black self-start"
                  }`}
                >
                  <strong>
                    {msg.sender === loggedInEmail ? "You" : selectedUser.username}:
                  </strong>{" "}
                  {msg.text}
                </div>
              ))}
            </div>

            <div className="p-4 border-t bg-white flex items-center">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type a message..."
                className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                onClick={sendMessage}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg ml-2 hover:bg-blue-600"
              >
                Send
              </button>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-gray-500">
            Select a user to start chatting
          </div>
        )}
      </div>
    </div>
  );
};

export default Chat;
