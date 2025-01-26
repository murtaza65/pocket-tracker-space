import React, { useState, useEffect } from "react";
import axios from "axios";
import { MdAdd } from "react-icons/md";
import { useNavigate } from "react-router-dom";


const Dashboard = () => {
  const [donations, setDonations] = useState([]);
  const [totalDonations, setTotalDonations] = useState(0);

  const navigate = useNavigate()

  const handleAdd = () =>{
    navigate("/add-donation")
  }

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
    <div className="realtive bg-gray-100 p-8 h-screen flex flex-1 justify-center items-center ">
      {/* donation card */}
      <div className=" bg-white p-6 rounded shadow-lg w-full h-full text-center">
      
        <h2 className="text-4xl text-center font-bold mb-4 font-roboto text-green-500 ">Welcome </h2>
        <div className="flex flex-col flex-1 justify-center items-center mt-42">
        <h3 className="text-4xl font-semibold font-monte"> <span className="text-green-500">${totalDonations}</span>  donated this <span className="text-green-500">month</span></h3>
        <h3 className="text-xl font-medium font-lato mt-6">You have donated <span className="text-green-500">${totalDonations}</span> total this year</h3>


        </div>
        
      </div>
      <div className="absolute bottom-16 right-10 ">
      <button onClick={handleAdd} className="btn text-white bg-green-500 h-14 w-14 rounded-full">
  <MdAdd size={24}/>
</button>
      </div>
    </div>
  );
};

export default Dashboard;
