// App.js
import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Dashboard from "./components/Dashboard";
import History from "./components/History";
import Analytics from "./components/Analytics";
import AddCategory from "./components/AddCategory";
import AddDonation from "./components/AddDonation";
import Splashscreen from "./components/Splashscreen"; // Import Splashscreen

const App = () => {
  const [isSplash, setIsSplash] = useState(true); // This state controls the splash screen

  const handleGetStarted = () => {
    setIsSplash(false); // Hide splash screen when button is clicked
  };

  return (
    <Router>
      <>
        {isSplash ? (
          <Splashscreen onGetStarted={handleGetStarted} /> // Pass the handler as a prop
        ) : (
          <div className="flex">
            <Sidebar />
            <div className="flex-1 h-screen overflow-y-auto">
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/history" element={<History />} />
                <Route path="/analytics" element={<Analytics />} />
                <Route path="/add-category" element={<AddCategory />} />
                <Route path="/add-donation" element={<AddDonation />} />
              </Routes>
            </div>
          </div>
        )}
      </>
    </Router>
  );
};

export default App;
