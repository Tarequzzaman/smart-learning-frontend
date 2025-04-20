import React from "react";
import Sidebar from "./UserDashboardSideBar";
import Header from "./UserDashboardHeader";

const UserDashboardLayout = ({ children }) => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        {/* Dashboard Header */}
        <Header />

        {/* Main Content */}
        <div className="flex-1 p-8">{children}</div>
      </div>
    </div>
  );
};

export default UserDashboardLayout;
