import React from "react";
import { Link } from "react-router-dom"; 
import UserDashboardLayout from "../../components/UserDashboardLayout";
import { FaCheckCircle, FaStar, FaClock } from "react-icons/fa";
import Card from "../../components/UserDashboardHomeCard";

const DashboardHome = () => {
  const userName = "Nikil"; 

    // Mock Data
    const completedQuizzes = 10;
    const ongoingQuizzes = 5;
    const totalScore = 85;

  const motivationalText =
    "Learning is the key to unlocking your potential. Keep growing and exploring!";

  return (
    <UserDashboardLayout>
      <div className=" p-6 rounded-lg  h-screen">
        {/* Trending Books Card */}
        <div className="relative bg-primary p-10 rounded-lg shadow-lg flex mb-6">
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

        {/* Cards for Quizzes, Score, and Ongoing Quizzes */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Completed Quizzes Card */}
          <Card
            title="Completed Quizzes"
            value={completedQuizzes}
            icon={<FaCheckCircle />}
            color="text-green-500"
          />

          {/* Ongoing Quizzes Card */}
          <Card
            title="Ongoing Quizzes"
            value={ongoingQuizzes}
            icon={<FaClock />}
            color="text-orange-500"
          />
          {/* Your Score Card */}
          <Card
            title="Your Score"
            value={`${totalScore}`}
            icon={<FaStar />}
            color="text-yellow-500"
          />
        </div>
      </div>
    </UserDashboardLayout>
  );
};

export default DashboardHome;
