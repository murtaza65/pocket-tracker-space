import React, { useState, useEffect } from "react";
import axios from "axios";

const AddCategory = () => {
  const [name, setName] = useState("");
  const [categories, setCategories] = useState([]);

  // Fetch categories when the component loads
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("http://localhost:5000/categories");
        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, []);

  const handleAddCategory = async () => {
    try {
      // Determine the next numeric ID
      const nextId =
        Math.max(0, ...categories.map((cat) => Number(cat.id))) + 1;

      // Add the new category
      await axios.post("http://localhost:5000/categories", {
        id: nextId,
        name,
      });

      // Update the categories list
      setCategories((prev) => [...prev, { id: nextId, name }]);

      alert("Category added successfully!");
      setName("");
    } catch (error) {
      console.error("Error adding category:", error);
      alert("Failed to add category. Please try again.");
    }
  };

  return (
    <div className="p-8 min-h-screen bg-gray-100">
      <div className="container mx-auto">
        {/* Page Header */}
        <h1 className="text-4xl font-bold  text-green-500 mb-10 font-roboto">
          Manage Categories
        </h1>

        <div className="flex flex-col md:flex-row gap-8">
            {/* Display Categories Section */}
          <div className="bg-white p-8 rounded-xl shadow-lg w-full md:w-1/2">
            <h2 className="text-2xl font-semibold text-green-500 mb-6 font-lato">
              Existing Categories
            </h2>
            {categories.length > 0 ? (
              <ul className="space-y-4">
                {categories.map((category) => (
                  <li
                    key={category.id}
                    className="p-4 bg-gray-100 rounded-lg shadow-sm flex justify-between items-center"
                  >
                    <span className="text-lg font-medium text-gray-700">
                      {category.name}
                    </span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500">No categories available.</p>
            )}
          </div>
          {/* Add Category Section */}
          <div className="bg-white p-8 rounded-xl shadow-lg w-full md:w-1/2">
            <h2 className="text-2xl font-semibold text-green-500 mb-6 font-lato">
              Add a New Category
            </h2>
            <div className="mb-6">
              <input
                type="text"
                placeholder="Category Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-4 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none"
              />
            </div>
            <button
              onClick={handleAddCategory}
              className="w-full py-3 bg-green-500 text-white text-lg font-semibold rounded-lg hover:bg-green-600 transition duration-200"
            >
              Add Category
            </button>
          </div>

          
        </div>
      </div>
    </div>
  );
};

export default AddCategory;
