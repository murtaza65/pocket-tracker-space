import React, { useState } from "react";
import axios from "axios";

const AddCategory = () => {
  const [name, setName] = useState("");

  const handleAddCategory = async () => {
    try {
      // Fetch existing categories to determine the next numeric ID
      const response = await axios.get("http://localhost:5000/categories");
      const categories = response.data;

      // Determine the next numeric ID
      const nextId = Math.max(0, ...categories.map((cat) => Number(cat.id))) + 1;

      // Add the new category with a numeric ID
      await axios.post("http://localhost:5000/categories", {
        id: nextId,
        name,
      });

      alert("Category added successfully!");
      setName("");
    } catch (error) {
      console.error("Error adding category:", error);
      alert("Failed to add category. Please try again.");
    }
  };

  return (
    <div className="p-8">
      <h2 className="text-3xl font-bold mb-4">Add Category</h2>
      <div className="bg-white p-4 rounded shadow">
        <input
          type="text"
          placeholder="Category Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border p-2 rounded w-full mb-4"
        />
        <button
          onClick={handleAddCategory}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Add Category
        </button>
      </div>
    </div>
  );
};

export default AddCategory;
