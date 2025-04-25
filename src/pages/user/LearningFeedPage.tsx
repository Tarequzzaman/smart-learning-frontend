import React, { useState } from "react";
import { FaArrowLeft, FaUserCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const LearningFeedPage = () => {
  const navigate = useNavigate();
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const handleBack = () => {
    navigate(-1);
  };

  const handleUserButtonClick = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const handleMyAccountClick = () => {
    navigate("/my-account");
  };

  const handleLogOutClick = () => {
    navigate("/signin");
  };

  const handleOngoingClick = () => {
    navigate("/course-details");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Header Section */}
      <div className="flex justify-between w-full mb-8">
        <button
          onClick={handleBack}
          className="text-2xl text-gray-700 cursor-pointer"
        >
          <FaArrowLeft />
        </button>
        <h1 className="text-3xl font-semibold text-gray-900">
          Let's start learning!
        </h1>
        <button
          onClick={handleUserButtonClick}
          className="text-2xl text-gray-700"
        >
          <FaUserCircle />
        </button>
        {/* Dropdown Menu */}
        {dropdownVisible && (
          <div className="absolute right-0 mt-10 w-48 bg-white border border-gray-200 rounded-lg shadow-lg">
            <ul className="space-y-2 p-3">
              <li>
                <button
                  onClick={handleMyAccountClick}
                  className="w-full text-left text-gray-700 hover:bg-gray-200 px-4 py-2 rounded"
                >
                  My Account
                </button>
              </li>
              <li>
                <button
                  onClick={handleOngoingClick}
                  className="w-full text-left text-gray-700 hover:bg-gray-200 px-4 py-2 rounded"
                >
                  Ongoing
                </button>
              </li>
              <li>
                <button
                  onClick={handleLogOutClick}
                  className="w-full text-left text-gray-700 hover:bg-gray-200 px-4 py-2 rounded"
                >
                  Log Out
                </button>
              </li>
            </ul>
          </div>
        )}
      </div>

      {/* Feed Content */}
      <div className="mt-10 bg-white p-6 rounded-lg shadow-lg w-full max-w-2xl mx-auto">
        {/* Courses Section */}
        <div className="mb-6">
          <h3 className="text-2xl font-semibold mb-4">Courses you may like</h3>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              <a
                href="/course-details"
                className="text-blue-500 hover:underline"
              >
                Introduction to programming
              </a>
            </li>
            <li>
              <a href="#" className="text-blue-500 hover:underline">
                Introduction to python
              </a>
            </li>
            <li>
              <a href="#" className="text-blue-500 hover:underline">
                Advanced Java
              </a>
            </li>
          </ul>
        </div>

        {/* Blogs Section */}
        <div>
          <h3 className="text-2xl font-semibold mb-4">Blogs you may like</h3>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              <a href="#" className="text-blue-500 hover:underline">
                Most used UI automation tools
              </a>
            </li>
            <li>
              <a href="#" className="text-blue-500 hover:underline">
                Current trends in AI
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default LearningFeedPage;
