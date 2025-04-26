import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const UserNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem('user'));
  const userFullName = user ? `${user.first_name} ${user.last_name}` : "User";

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("role");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <nav className="bg-white shadow-md px-6 py-4 sticky top-0 z-50">
      <div className="w-full flex justify-between items-center">
        {/* Logo on far left */}
        <Link to="/dashboard" className="text-2xl font-bold text-indigo-600">
          Smart Learning Companion
        </Link>

        {/* Desktop Menu aligned right */}
        <div className="hidden md:flex space-x-6 items-center ml-auto">
          <Link to="/dashboard/topic-selection" className="text-gray-700 hover:text-indigo-600 font-medium">
            Selected Topics
          </Link>
          <Link to="/dashboard/learning-feed" className="text-gray-700 hover:text-indigo-600 font-medium">
            My Feed
          </Link>
          <button
            onClick={() => navigate("/dashboard/my-account")}
            className="text-gray-700 hover:text-indigo-600 font-medium"
          >
            {userFullName}
          </button>
          <button
            onClick={handleLogout}
            className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 font-medium"
          >
            Logout
          </button>
        </div>

        {/* Hamburger Menu (Mobile) */}
        <div className="md:hidden ml-auto">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-gray-700 focus:outline-none"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div className="md:hidden flex flex-col mt-4 space-y-2">
          <Link to="/dashboard/topic-selection" className="text-gray-700 hover:text-indigo-600 font-medium">
            Selected Topics
          </Link>
          <Link to="/dashboard/learning-feed" className="text-gray-700 hover:text-indigo-600 font-medium">
            My Feed
          </Link>
          <button
            onClick={() => navigate("/dashboard/my-account")}
            className="text-gray-700 hover:text-indigo-600 font-medium text-left"
          >
            {userFullName}
          </button>
          <button
            onClick={handleLogout}
            className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 font-medium text-center"
          >
            Logout
          </button>
        </div>
      )}
    </nav>
  );
};

export default UserNavbar;
