// import React from "react";

// function LandingPage() {
//   return (
//     <div className="bg-gradient-to-b from-blue-500 to-purple-700 min-h-screen text-white">
//       <header className="p-6 flex justify-between items-center">
//         <h1 className="text-2xl font-bold">ArtConnect</h1>
//         <nav>
//           <a href="/signup" className="mr-4">Sign Up</a>
//           <a href="/login">Log In</a>
//         </nav>
//       </header>
//       <main className="text-center mt-20">
//         <h2 className="text-4xl font-bold">Where Creativity Meets Collaboration</h2>
//         <p className="mt-6 text-lg">Discover artists, showcase your talent, and collaborate on projects!</p>
//         <button className="mt-10 px-6 py-3 bg-yellow-400 text-black rounded-lg hover:bg-yellow-300">
//           Get Started
//         </button>
//       </main>
//       <footer className="absolute bottom-0 w-full text-center p-4 bg-gray-900">
//         <p>© 2024 ArtConnect | All Rights Reserved</p>
//       </footer>
//     </div>
//   );
// }

// export default LandingPage;
import React from "react";
import LandingPage from "./components/LandingPage";

function App() {
  return (
    <div>
      <LandingPage />
    </div>
  );
}

export default App;
