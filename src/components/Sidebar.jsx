import React from "react";
import { Link } from "react-router-dom";

const Sidebar = () => (
  <div className="h-screen w-64 bg-gray-800 text-white p-4 flex flex-col">
    <h1 className="text-2xl font-bold mb-8">Pocket Donations</h1>
    <Link to="/" className="mb-4 hover:text-gray-300">Dashboard</Link>
    <Link to="/history" className="mb-4 hover:text-gray-300">History</Link>
    <Link to="/analytics" className="mb-4 hover:text-gray-300">Analytics</Link>
    <Link to="/add-category" className="mb-4 hover:text-gray-300">Add Category</Link>
    <Link to="/add-donation" className="hover:text-gray-300">Add Donation</Link>
  </div>
);

export default Sidebar;
