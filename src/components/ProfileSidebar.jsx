import React from "react";
import { NavLink } from "react-router-dom";
import { FiUser } from "react-icons/fi";
import { HiOutlineLogout } from "react-icons/hi";

const ProfileSidebar = ({ onLogout }) => (
  <aside className="w-56 shrink-0 h-screen bg-white border-r border-gray-200 py-10 flex flex-col">
    {/* title */}
    <h2 className="px-8 mb-10 text-xl font-semibold">User</h2>

    {/* single link (Profile) */}
    <NavLink
      to="/profile"
      className={({ isActive }) =>
        `flex items-center gap-3 px-8 py-3 text-sm font-medium transition
         ${isActive ? "text-indigo-600" : "text-gray-600 hover:text-indigo-500"}`
      }
    >
      <FiUser />
      Profile
    </NavLink>

    {/* put some space, but not all the way to the bottom */}
    <div className="flex-1" />

    {/* LOG OUT — lifted a bit from bottom via mt-14 */}
    <button
      onClick={onLogout}
      className="flex items-center gap-3 px-8 py-3 mt-14 text-sm text-red-500 hover:text-red-600 transition"
    >
      <HiOutlineLogout className="text-lg" />
      Log out
    </button>
  </aside>
);

export default ProfileSidebar;
