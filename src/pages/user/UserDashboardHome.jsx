import React from "react";
import { Link } from "react-router-dom"; 
import UserDashboardLayout from "../../components/UserDashboardLayout";

const DashboardHome = () => {
  const userName = "Nikil"; 

  const motivationalText =
    "Learning is the key to unlocking your potential. Keep growing and exploring!";

  return (
    <UserDashboardLayout>
      <div className="bg-white p-6 rounded-lg shadow-lg h-screen">
        {/* Trending Books Card */}
        <div className="relative bg-primary p-10 rounded-lg shadow-lg flex">
          {/* Background Image */}
          <div className="absolute inset-0">
            <img
              src="/Dashboard-Home-Welcome-Card.png" 
              alt="Trending Books"
              className="w-full h-full object-cover rounded-lg"
            />
          </div>

          {/* Text Content */}
          <div className="relative z-10 text-white">
            <h2 className="text-3xl font-bold mb-2">
              Welcome back, {userName}!
            </h2>
            <p className="text-gray-300 mb-4">{motivationalText}</p>
          </div>
        </div>
      </div>
    </UserDashboardLayout>
  );
};

export default DashboardHome;
