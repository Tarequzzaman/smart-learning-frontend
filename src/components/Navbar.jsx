import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md px-6 py-4 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-indigo-600">
          SmartLearn
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-6 items-center">
          <Link to="/" className="text-gray-700 hover:text-indigo-600 font-medium">Home</Link>
          <Link to="/about" className="text-gray-700 hover:text-indigo-600 font-medium">About</Link>
          <Link to="/features" className="text-gray-700 hover:text-indigo-600 font-medium">Features</Link>
          <Link
            to="/login"
            className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 font-medium"
          >
            Login
          </Link>
        </div>

        {/* Hamburger Menu (Mobile) */}
        <div className="md:hidden">
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
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div className="md:hidden flex flex-col mt-4 space-y-2">
          <Link to="/" className="text-gray-700 hover:text-indigo-600 font-medium">Home</Link>
          <Link to="/about" className="text-gray-700 hover:text-indigo-600 font-medium">About</Link>
          <Link to="/features" className="text-gray-700 hover:text-indigo-600 font-medium">Features</Link>
          <Link
            to="/login"
            className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 font-medium text-center"
          >
            Login
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
