// Splashscreen.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom'; // to navigate after button click

const Splashscreen = ({ onGetStarted }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    onGetStarted(); // Call the handler passed from App.js to hide the splash screen
    navigate('/'); // Redirect to the main application (Dashboard)
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-200">
      <div className="bg-white p-8 rounded-lg shadow-xl w-96 text-center">
        <img src="/images/logo.jpg" alt="App Logo" className="mx-auto h-48 w-full object-contain mb-4" />
        <h1 className="text-2xl text-green-500 font-bold mb-4 font-roboto">Welcome to Pocket Tracker</h1>
        <p className="text-gray-600 mb-6 font-monte">Track your donations and manage your categories.</p>
        <button
          onClick={handleClick}
          className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition duration-300"
        >
          Get Started
        </button>
      </div>
    </div>
  );
};

export default Splashscreen;
