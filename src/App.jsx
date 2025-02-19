import React from "react";
// import LandingPage from "./components/LandingPage";

// function App() {
//   return (
//     <div>
//       <LandingPage />
//     </div>
//   );
// }

// export default App;

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import UpdateProfile from './components/UpdateProfile';
import Homepage from "./HomePage";
import DynamicBackgroundLoginPage from "./DynamicBackgroundLoginPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<DynamicBackgroundLoginPage />} />
        <Route path="/update-profile" element={<UpdateProfile />} />
        <Route path="/Homepage" element={<Homepage />} />
      </Routes>
    </Router>
  );
}

export default App;
