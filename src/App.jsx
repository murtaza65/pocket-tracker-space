import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Dashboard from "./components/Dashboard";
import History from "./components/History";
import Analytics from "./components/Analytics";
import AddCategory from "./components/AddCategory";
import AddDonation from "./components/AddDonation";

const App = () => (
  <Router>
    <div className="flex">
      <Sidebar />
      <div className="flex-1">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/history" element={<History />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/add-category" element={<AddCategory />} />
          <Route path="/add-donation" element={<AddDonation />} />
        </Routes>
      </div>
    </div>
  </Router>
);

export default App;
