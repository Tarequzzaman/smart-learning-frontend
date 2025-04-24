import React, { useState } from "react";
import { FaArrowLeft, FaUserCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const TopicSelectionPage = () => {
  const navigate = useNavigate();

  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);

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
        <button className="text-2xl text-gray-700">
          <FaUserCircle />
        </button>
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
