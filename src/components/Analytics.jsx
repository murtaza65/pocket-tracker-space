import React, { useState, useEffect, useMemo } from "react";
import { Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import axios from "axios";

// Register chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

const Analytics = () => {
  const [donations, setDonations] = useState([]);
  const [categories, setCategories] = useState([]);
  const [donationGoal, setDonationGoal] = useState(50000); // Default goal

  useEffect(() => {
    const fetchData = async () => {
      try {
        const donationResponse = await axios.get("http://localhost:5000/donations");
        const categoryResponse = await axios.get("http://localhost:5000/categories");
        setDonations(donationResponse.data);
        setCategories(categoryResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const handleDonationGoalChange = (event) => {
    setDonationGoal(Number(event.target.value));
  };

  // Group donations by month - optimized with useMemo
  const monthlyData = useMemo(() => {
    return donations.reduce((acc, donation) => {
      const month = new Date(donation.date).getMonth();
      acc[month] = (acc[month] || 0) + donation.amount;
      return acc;
    }, []);
  }, [donations]);

  // Calculate total donations by category - optimized with useMemo
  const categoryData = useMemo(() => {
    return categories.reduce((acc, category) => {
      const categoryDonations = donations.filter(
        (donation) => donation.categoryId === category.id
      );
      acc[category.name] = categoryDonations.reduce((sum, donation) => sum + donation.amount, 0);
      return acc;
    }, {});
  }, [donations, categories]);

  // Bar chart data for month-to-month donations
  const barChartData = useMemo(
    () => ({
      labels: [...Array(12)].map((_, index) =>
        new Date(0, index).toLocaleString("default", { month: "long" })
      ),
      datasets: [
        {
          label: "Monthly Donations ($)",
          data: monthlyData,
          backgroundColor: "#4A90E2", // Soft blue
          borderColor: "#4A90E2",
          borderWidth: 1,
        },
      ],
    }),
    [monthlyData]
  );

  // Pie chart data for donations by category with percentages
  const totalCategoryDonations = Object.values(categoryData).reduce(
    (sum, value) => sum + value,
    0
  );
  const pieChartData = useMemo(
    () => ({
      labels: Object.keys(categoryData),
      datasets: [
        {
          data: Object.values(categoryData),
          backgroundColor: ["#4A90E2", "#50E3C2", "#FF8C00", "#F5A623", "#D0021B"], // Color-coded
          hoverOffset: 4,
        },
      ],
    }),
    [categoryData]
  );

  const pieChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      tooltip: {
        callbacks: {
          label: function (context) {
            const label = context.label || "";
            const value = context.raw;
            const percentage = ((value / totalCategoryDonations) * 100).toFixed(2);
            return `${label}: $${value.toLocaleString()} (${percentage}%)`;
          },
        },
      },
    },
  };

  // Donation goal progress
  const totalDonated = donations.reduce((sum, donation) => sum + donation.amount, 0);
  const progressPercentage = (totalDonated / donationGoal) * 100;

  return (
    <div className="p-8 bg-gray-100 font-monte">
      <h2 className="text-3xl font-bold mb-6 text-green-500 font-roboto">Analytics & Progress</h2>

      {/* Donation Goal Selector */}
      <div className="mb-6">
        <label
          htmlFor="donationGoal"
          className="block text-lg font-monte font-medium mb-2"
        >
          Set Donation Goal ($):
        </label>
        <select
          id="donationGoal"
          className="border border-gray-300 rounded-md p-2 w-full mb-4"
          value={donationGoal}
          onChange={handleDonationGoalChange}
        >
          <option value={10000}>$10,000</option>
          <option value={25000}>$25,000</option>
          <option value={50000}>$50,000</option>
          <option value={100000}>$100,000</option>
          <option value={200000}>$200,000</option>
        </select>
      </div>

      {/* Donation Goal Progress */}
      <div className="mb-8">
        <h3 className="text-2xl font-semibold mb-4 text-green-500 font-lato">Donation Goal Progress</h3>
        <div className="w-full bg-gray-200 rounded-full h-6">
          <div
            className="bg-blue-500 h-6 rounded-full"
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>
        <p className="mt-2 text-lg">
          {totalDonated.toLocaleString()} / {donationGoal.toLocaleString()} donated (
          {Math.round(progressPercentage)}%)
        </p>
      </div>

      {/* Month-to-Month Donations Bar Chart */}
      <div className="mb-8" style={{ height: "300px", width: "100%" }}>
        <h3 className="text-2xl font-semibold mb-4 text-green-500 font-lato">Month-to-Month Donations</h3>
        <Bar
          data={barChartData}
          options={{ responsive: true, maintainAspectRatio: false }}
          style={{ height: "100%", width: "100%" }}
        />
      </div>

      {/* Donations by Category Pie Chart */}
      <div className="mt-24 mb-10" style={{ height: "300px", width: "100%" }}>
        <h3 className="text-2xl font-semibold mb-4 text-green-500 font-lato">Donations by Category</h3>
        <Pie
          data={pieChartData}
          options={pieChartOptions}
          style={{ height: "100%", width: "100%" }}
        />
      </div>
    </div>
  );
};

export default Analytics;
