import React, { useState, useEffect } from "react";
import axios from "axios";

const AddDonation = () => {
  const [categories, setCategories] = useState([]);
  const [amount, setAmount] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [notes, setNotes] = useState("");

  useEffect(() => {
    const fetchCategories = async () => {
      const response = await axios.get("http://localhost:5000/categories");
      setCategories(response.data);
    };
    fetchCategories();
  }, []);

  const handleAddDonation = async () => {
    await axios.post("http://localhost:5000/donations", {
      amount: parseFloat(amount),
      categoryId: parseInt(categoryId),
      notes,
      date: new Date().toISOString().split("T")[0],
      cause: categories.find((cat) => cat.id === parseInt(categoryId)).name,
    });
    alert("Donation added successfully!");
    setAmount("");
    setCategoryId("");
    setNotes("");
  };

  return (
    <div className="p-8">
      <h2 className="text-3xl font-bold mb-4">Add Donation</h2>
      <div className="bg-white p-4 rounded shadow">
        <select
          value={categoryId}
          onChange={(e) => setCategoryId(e.target.value)}
          className="border p-2 rounded w-full mb-4"
        >
          <option value="">Select Category</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="border p-2 rounded w-full mb-4"
        />
        <textarea
          placeholder="Notes"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          className="border p-2 rounded w-full mb-4"
        ></textarea>
        <button
          onClick={handleAddDonation}
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          Add Donation
        </button>
      </div>
    </div>
  );
};

export default AddDonation;
