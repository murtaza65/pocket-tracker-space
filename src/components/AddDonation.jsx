import React, { useState, useEffect } from "react";
import axios from "axios";

const AddDonation = () => {
  const [categories, setCategories] = useState([]);
  const [amount, setAmount] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [notes, setNotes] = useState("");
  const [date, setDate] = useState("");

  useEffect(() => {
    const fetchCategories = async () => {
      const response = await axios.get("http://localhost:5000/categories");
      setCategories(response.data);
    };
    fetchCategories();
  }, []);

  const handleAddDonation = async () => {
    if (!date) {
      alert("Please select a date.");
      return;
    }

    await axios.post("http://localhost:5000/donations", {
      amount: parseFloat(amount),
      categoryId: parseInt(categoryId),
      notes,
      date: date,
      cause: categories.find((cat) => cat.id === parseInt(categoryId)).name,
    });
    alert("Donation added successfully!");
    setAmount("");
    setCategoryId("");
    setNotes("");
    setDate("");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-xl w-[80%]">
        <h2 className="text-3xl font-bold text-center mb-6 text-gray-700">Add Donation</h2>
        
        <div className="space-y-4">
          {/* Category Selection */}
          <select
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            <option value="">Select Category</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>

          {/* Amount Input */}
          <input
            type="number"
            placeholder="Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          />

          {/* Notes Input */}
          <textarea
            placeholder="Notes"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            rows="4"
          ></textarea>

          {/* Date Picker */}
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          />

          {/* Submit Button */}
          <button
            onClick={handleAddDonation}
            className="w-full py-3 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 transition duration-300"
          >
            Add Donation
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddDonation;
