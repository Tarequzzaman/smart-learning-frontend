import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import MainLayout from './layouts/MainLayout';
import AdminLayout from './layouts/AdminLayout';

import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ForgotPassword from './pages/ForgetPassword';
import ResetPassword from './pages/ResetPassword';
import VerifyCode from './pages/VerifyCode';
import AdminDashboard from './pages/admin/Analytics';
import Users from './pages/admin/User';
import Topics from './pages/admin/Topics';
import DashboardHome from './pages/user/UserDashboardHome';
import UserProfile from './components/UserDashboardMyAccount';

const App = () => {
  const userRole = localStorage.getItem('role'); // "admin" | "user" | null

  return (
    <Routes>

      {/* Public Layout */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/verify-code" element={<VerifyCode />} />
      </Route>
      <Route
        path="/admin"
        element={userRole === 'admin' ? <AdminLayout /> : <Navigate to="/login" replace />}
      >
        <Route index element={<AdminDashboard />} />
        <Route path="users" element={<Users />} />
        <Route path="topics" element={<Topics />} />
      </Route>

      <Route path="/dashboard/home" element={<DashboardHome />} />
      <Route path="/dashboard/my-account" element={<UserProfile />} />


     

      {/* Catch-all redirect */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default App;
