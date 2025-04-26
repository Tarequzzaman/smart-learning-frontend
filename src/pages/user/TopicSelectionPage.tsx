import React, { useState } from "react";
import { FaArrowLeft, FaUserCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const TopicSelectionPage = () => {
  const navigate = useNavigate();

  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const handleTopicSelect = (topic) => {
    setSelectedTopics((prevSelected) =>
      prevSelected.includes(topic)
        ? prevSelected.filter((item) => item !== topic)
        : [...prevSelected, topic]
    );
  };

  const handleContinue = () => {
    console.log("Selected topics:", selectedTopics);
    navigate("/learning-feed");
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
    <div className="flex flex-col items-center bg-gray-100 min-h-screen p-6">
      {/* Header Section */}
      <div className="flex justify-between w-full mb-8">
        <button disabled className="text-2xl text-gray-700">
          <FaArrowLeft />
        </button>
        <h1 className="text-3xl font-semibold text-gray-900">
          Select your topics
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

      {/* Topic Selection Buttons */}
      <div className="flex gap-4 mb-8 mt-10">
        {["Science", "Programming", "Python"].map((topic) => (
          <button
            key={topic}
            onClick={() => handleTopicSelect(topic)}
            className={`px-6 py-3 border rounded-lg shadow-md text-lg font-medium text-gray-700 ${
              selectedTopics.includes(topic)
                ? "bg-primary text-white cursor-default"
                : "bg-white hover:bg-gray-200"
            }`}
          >
            {topic}
          </button>
        ))}
      </div>

      {/* Continue Button */}
      <button
        onClick={handleContinue}
        className="px-8 py-3 bg-primary text-white rounded-lg shadow-md text-lg font-semibold hover:bg-blue-600"
      >
        Continue to your feed
      </button>
    </div>
  );
};

export default TopicSelectionPage;
