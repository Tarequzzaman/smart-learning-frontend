import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa';

const UserNavbar = () => {
  const [isOpen, setIsOpen] = useState(false); // Mobile menu
  const [profileOpen, setProfileOpen] = useState(false); // Profile dropdown
  const navigate = useNavigate();
  const profileRef = useRef(); // Reference to profile wrapper

  const user = JSON.parse(localStorage.getItem('user'));
  const userFullName = user ? `${user.first_name} ${user.last_name}` : "User";

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("role");
    localStorage.removeItem("user");
    navigate("/login");
  };

  // Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav className="bg-white shadow-md px-6 py-4 sticky top-0 z-50">
      <div className="w-full flex justify-between items-center">
        {/* Logo */}
        <Link to="/dashboard" className="text-2xl font-bold text-indigo-600">
          Smart Learning Companion
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-6 items-center ml-auto relative">
          {/* Completed Courses */}
          <Link to="/dashboard/completed-courses" className="text-gray-700 hover:text-indigo-600 font-medium">
            Completed Courses
          </Link>

          {/* Explore Topics */}
          <Link to="/dashboard/explore-topics" className="text-gray-700 hover:text-indigo-600 font-medium">
            Explore Topics
          </Link>

          {/* Profile and Dropdown */}
          <div ref={profileRef} className="relative">
            {/* Profile Button */}
            <button
              onClick={() => setProfileOpen((prev) => !prev)}
              className="flex items-center space-x-2 text-gray-700 hover:text-indigo-600 font-medium"
            >
              <FaUserCircle className="text-2xl" />
              <span>{userFullName}</span>
            </button>

            {/* Dropdown */}
            {profileOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg border z-50">
                <button
                  onClick={() => { setProfileOpen(false); navigate("/dashboard/my-account"); }}
                  className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                >
                  Edit Profile
                </button>
                <button
                  onClick={() => { setProfileOpen(false); navigate("/dashboard/topic-selection"); }}
                  className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                >
                  Edit Personalized Learning
                </button>
                <div className="border-t my-1"></div> {/* Divider */}
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100 font-semibold"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Hamburger */}
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
          {/* Completed Courses for Mobile */}
          <Link to="/dashboard/completed-courses" className="text-gray-700 hover:text-indigo-600 font-medium">
            Completed Courses
          </Link>

          {/* Explore Topics for Mobile */}
          <Link to="/dashboard/explore-topics" className="text-gray-700 hover:text-indigo-600 font-medium">
            Explore Topics
          </Link>

          {/* Profile (Mobile) */}
          <button
            onClick={() => navigate("/dashboard/my-account")}
            className="flex items-center space-x-2 text-gray-700 hover:text-indigo-600 font-medium text-left"
          >
            <FaUserCircle className="text-2xl" />
            <span>{userFullName}</span>
          </button>

          {/* Logout (Mobile) */}
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
