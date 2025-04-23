import React from "react";
import { Link, useLocation } from "react-router-dom"; // Use react-router-dom for navigation
import { FaHome, FaUsers, FaMicroscope, FaSignOutAlt ,} from "react-icons/fa"; // Import icons

const Sidebar = () => {
  const location = useLocation(); // Get the current path
  const links = [
    { href: "/dashboard/home", label: "Home", icon: <FaHome size={22} /> },

    {
      href: "/Quizzes",
      label: "Quizzes",
      icon: <FaMicroscope size={22} />,
    },
    {
      href: "/dashboard/my-account",
      label: "My Account",
      icon: <FaUsers size={22} />,
    },
  ];

  const logoutLink = {
    href: "/",
    label: "Log Out",
    icon: <FaSignOutAlt size={22} />,
  };

  const logout = () => {};

  return (
    <div className="w-64 bg-white flex flex-col shadow-lg h-screen">
      {/* Logo and Title */}
      <div className="flex items-center p-5 space-x-5">
        <img
          width={60}
          height={60}
          src="/Logo.png"
          alt="Logo"
          className="object-contain"
        />
        <div>
          <h2
            style={{ fontFamily: "Ultra" }}
            className="text-primary   tracking-widest"
          >
            SMART
          </h2>
          <h2
            style={{ fontFamily: "Ultra" }}
            className="text-primary   tracking-widest"
          >
            LEARNING
          </h2>
        </div>
      </div>

      {/* Sidebar Links */}
      <ul className="flex flex-col gap-5 px-5 mt-6">
        {links.map((link, index) => {
          const isActive = location.pathname.startsWith(link.href); // Check if the link is active
          return (
            <li
              key={index}
              className={`flex items-center space-x-3 px-3 py-1 rounded-xl ${
                isActive
                  ? "bg-primary text-white font-bold"
                  : "hover:bg-gray-50"
              }`}
            >
              {link.icon}
              <Link
                to={link.href}
                className={`block p-2 rounded w-full ${
                  isActive ? "font-bold" : "font-medium"
                }`}
              >
                {link.label}
              </Link>
            </li>
          );
        })}
      </ul>

      {/* Logout Button */}
      <div className="px-5 pb-5 mt-auto mb-2">
        <li
          className="flex items-center space-x-3 hover:bg-gray-50 px-3 py-1 rounded-xl"
          onClick={logout}
        >
          {logoutLink.icon}

          <Link to={logoutLink.href} className="block p-2 rounded font-medium">
            {logoutLink.label}
          </Link>
        </li>
      </div>
    </div>
  );
};

export default Sidebar;
