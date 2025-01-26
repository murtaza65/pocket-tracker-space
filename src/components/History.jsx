import React, { useState, useEffect } from "react";
import axios from "axios";

const History = () => {
  const [donations, setDonations] = useState([]);
  const [totalDonations, setTotalDonations] = useState(0);
  const [filter, setFilter] = useState("all");
  const [categories, setCategories] = useState([]);
  const [filteredDonations, setFilteredDonations] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      const donationResponse = await axios.get("http://localhost:5000/donations");
      const categoryResponse = await axios.get("http://localhost:5000/categories");

      setDonations(donationResponse.data);
      setCategories(categoryResponse.data);

      const total = donationResponse.data.reduce((sum, donation) => sum + donation.amount, 0);
      setTotalDonations(total);

      setFilteredDonations(donationResponse.data); // Initially show all donations
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (filter === "all") {
      setFilteredDonations(donations);
    } else {
      const filtered = donations.filter(donation => donation.categoryId === parseInt(filter));
      setFilteredDonations(filtered);
    }
  }, [filter, donations]);

  const handleLoadMore = () => {
    setPage(page + 1);
  };

  return (
    <div className="p-8 bg-gray-100">
      <h2 className="text-3xl font-bold mb-4 font-roboto text-green-500">Donation History</h2>
      
      {/* Filters Section */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center">
          <button
            onClick={() => setFilter("all")}
            className="mr-4 p-2 bg-gray-200 font-monte rounded hover:bg-gray-300"
          >
            All Donations
          </button>
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setFilter(category.id.toString())}
              className={`mr-4 p-2 font-monte ${filter === category.id.toString() ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'} rounded hover:bg-green-400`}
            >
              {category.name}
            </button>
          ))}
        </div>
        {/* <div className="flex items-center">
          <button className="p-2 bg-gray-200 rounded hover:bg-gray-300">
            <i className="fas fa-filter"></i> Filter
          </button>
        </div> */}
      </div>

      {/* Total Donations */}
      <div className="bg-white p-4 rounded shadow mb-6">
        <h3 className="text-xl font-monte font-semibold">Total Donations: <span className="text-green-500">${totalDonations}</span> </h3>
      </div>

      {/* Donation List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDonations.slice(0, page * 6).map((donation) => (
          <div key={donation.id} className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition duration-300">
            <div className="flex items-center mb-4">
              <div
                className={`w-4 h-4 rounded-full mr-2 ${donation.categoryId === 1 ? "bg-blue-500" : 
                  donation.categoryId === 2 ? "bg-red-500" : 
                  donation.categoryId === 3 ? "bg-yellow-500" : 
                  donation.categoryId === 4 ? "bg-green-500" : "bg-orange-500"}`}
              ></div>
              <strong className="text-lg font-roboto">{donation.cause}</strong>
            </div>
            <p className="text-sm text-gray-600 font-monte"><strong>Amount:</strong> ${donation.amount}</p>
            <p className="text-sm text-gray-600 font-monte"><strong>Date:</strong> {new Date(donation.date).toLocaleDateString()}</p>
          </div>
        ))}
      </div>

      {/* Load More Button */}
      <div className="flex justify-center mt-6">
        <button
          onClick={handleLoadMore}
          className="bg-green-500 font-monte text-white px-4 py-2 rounded hover:bg-green-600 transition duration-300"
        >
          Load More
        </button>
      </div>
    </div>
  );
};

export default History;
