import React, { useState, useEffect } from "react";
import axios from "axios";

const Dashboard = () => {
  const [donations, setDonations] = useState([]);
  const [totalDonations, setTotalDonations] = useState(0);

  useEffect(() => {
    const fetchDonations = async () => {
      const response = await axios.get("http://localhost:5000/donations");
      setDonations(response.data);
      const total = response.data.reduce((sum, donation) => sum + donation.amount, 0);
      setTotalDonations(total);
    };
    fetchDonations();
  }, []);

  return (
    <div className="p-8">
      <h2 className="text-3xl font-bold mb-4">Dashboard</h2>
      <div className="bg-white p-6 rounded shadow">
        <h3 className="text-xl font-semibold">Total Donations: ${totalDonations}</h3>
        <div className="grid grid-cols-2 gap-4 mt-4">
          {donations.map((donation) => (
            <div key={donation.id} className="bg-gray-100 p-4 rounded shadow">
              <p><strong>Cause:</strong> {donation.cause}</p>
              <p><strong>Amount:</strong> ${donation.amount}</p>
              <p><strong>Date:</strong> {donation.date}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
