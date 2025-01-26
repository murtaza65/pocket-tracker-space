import React from "react";
import { Link } from "react-router-dom";
import { MdHome, MdList,MdAnalytics ,MdCategory} from "react-icons/md";


const Sidebar = () => (
  <div className="min-h-screen w-64 bg-green-800 text-white p-4 flex flex-col">
        
    <h1 className="text-lg uppercase font-bold mb-8 font-roboto">Pocket Donations Tracker</h1>

    <Link to="/" className="mb-4 flex items-center gap-1  hover:bg-green-600 rounded p-1 font-monte "><MdHome/>Home</Link>
    <Link to="/history" className="mb-4 flex items-center gap-1  hover:bg-green-600 rounded p-1 font-monte"><MdList/>History</Link>
    <Link to="/analytics" className="mb-4 flex items-center gap-1  hover:bg-green-600 rounded p-1 font-monte"><MdAnalytics/>Analytics</Link>
    <Link to="/add-category" className="mb-4 flex items-center gap-1  hover:bg-green-600 rounded p-1 font-monte"><MdCategory/>Categories</Link>
  </div>
);

export default Sidebar;
