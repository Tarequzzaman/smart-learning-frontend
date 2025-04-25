import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";

const CourseDetailsPage = () => {
  const navigate = useNavigate();

  const [selectedTab, setSelectedTab] = useState("ongoing");
  const [currentChapter, setCurrentChapter] = useState(2);
  const [progress, setProgress] = useState(25);
  const [dropdownVisible , setDropdownVisible] = useState(false);

  const handleBack = () => {
    navigate(-1);
  };

  const handleTakeQuiz = () => {
    navigate("/quiz");
  };

  const handleNextChapter = () => {
    setCurrentChapter(10);
    setProgress(100);
  };

  const handleUserButtonClick = ()=> {
    setDropdownVisible(!dropdownVisible)

  }

  const handleMyAccountClick = () => {
    navigate('/my-account')
  }

  const handleLogOutClick = () => {
    navigate('/signin')
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Header Section */}
      <div className="flex justify-between w-full mb-8">
        <button onClick={handleBack} className="text-2xl text-gray-700">
          <span className="text-2xl">&lt;</span>
        </button>
        <h1 className="text-3xl font-semibold text-gray-900">My Learning</h1>
        <button onClick={handleUserButtonClick} className="text-2xl text-gray-700">
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

      {/* Tabs Section */}
      <div className="flex space-x-6 mb-6">
        <button
          onClick={() => setSelectedTab("ongoing")}
          className={`px-4 py-2 text-lg font-semibold ${
            selectedTab === "ongoing"
              ? "text-blue-600 border-b-2 border-blue-600"
              : "text-gray-500"
          }`}
        >
          Ongoing
        </button>
        <button
          onClick={() => setSelectedTab("completed")}
          className={`px-4 py-2 text-lg font-semibold ${
            selectedTab === "completed"
              ? "text-blue-600 border-b-2 border-blue-600"
              : "text-gray-500"
          }`}
        >
          Completed
        </button>
      </div>

      {/* Tab Content */}
      <div className="bg-white p-6 rounded-lg shadow-lg">
        {selectedTab === "ongoing" ? (
          <>
            {currentChapter === 2 ? (
              <>
                <h2 className="text-2xl font-bold mb-4">
                  Introduction to Programming
                </h2>
                <div className="mb-4">
                  <h3 className="text-xl font-semibold mb-2">
                    Current Chapter: Chapter 2
                  </h3>
                  <div className="bg-blue-500 text-white p-4 rounded-lg">
                    <button className="bg-blue-400 p-2 rounded-md text-white">
                      Play
                    </button>
                  </div>
                </div>

                {/* Progress Bar */}
                <div>
                  <h4 className="text-lg font-medium mb-2">Progress</h4>
                  <div className="w-full bg-gray-200 h-2 rounded-full">
                    <div
                      className="bg-blue-500 h-2 rounded-full"
                      style={{ width: `${progress}%` }}
                    ></div>
                  </div>
                  <div className="flex justify-between mt-2">
                    <span>0%</span>
                    {progress < 100 && <span>{progress}%</span> }
                    
                    <span>100%</span>
                  </div>
                </div>

                {/* Next Button */}
                <div className="mt-6">
                  <button
                    onClick={handleNextChapter}
                    className="px-8 py-3 bg-blue-500 text-white rounded-lg shadow-md text-lg font-semibold hover:bg-blue-600"
                  >
                    Next Chapter
                  </button>
                </div>
              </>
            ) : (
              <>
                <h2 className="text-2xl font-bold mb-4">
                  Introduction to Programming
                </h2>
                <div className="mb-4">
                  <h3 className="text-xl font-semibold mb-2">
                    Completed Chapter: Chapter 10
                  </h3>
                  <div className="bg-blue-500 text-white p-4 rounded-lg">
                    <button className="bg-blue-400 p-2 rounded-md text-white">
                      Play
                    </button>
                  </div>
                </div>

                {/* Progress Bar */}
                <div>
                  <h4 className="text-lg font-medium mb-2">Progress</h4>
                  <div className="w-full bg-gray-200 h-2 rounded-full">
                    <div
                      className="bg-blue-500 h-2 rounded-full"
                      style={{ width: "100%" }}
                    ></div>
                  </div>
                  <div className="flex justify-between mt-2">
                    <span>0%</span>
                    {progress < 100 && <span>{progress}%</span> }                    
                    <span>100%</span>
                  </div>
                </div>

                {/* Quiz Button */}
                <div className="mt-6">
                  <button
                    onClick={handleTakeQuiz}
                    className="px-8 py-3 bg-blue-500 text-white rounded-lg shadow-md text-lg font-semibold hover:bg-blue-600"
                  >
                    Take AI quiz
                  </button>
                </div>
              </>
            )}
          </>
        ) : (
          <>
            <div>
              <h1>Introduction to Programming ✔️</h1>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CourseDetailsPage;
