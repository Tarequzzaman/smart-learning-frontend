import React from "react";
import { Outlet } from "react-router-dom";
import UserNavbar from "../components/UserNavbar"; // update path correctly
import Footer from "../components/Footer";

const UserLayout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <UserNavbar /> {/* The new clean navbar at top */}
      <main className="flex-1">
        <Outlet /> {/* This is where your page like DashboardHome will render */}
      </main>
      <Footer />
    </div>
  );
};

export default UserLayout;
