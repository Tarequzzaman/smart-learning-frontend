import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import MainLayout from "./layouts/MainLayout";
import AdminLayout from "./layouts/AdminLayout";

import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import ForgotPassword from "./pages/ForgetPassword";
import ResetPassword from "./pages/ResetPassword";
import VerifyCode from "./pages/VerifyCode";
import AdminDashboard from "./pages/admin/Analytics";
import Users from "./pages/admin/User";
import Topics from "./pages/admin/Topics";
import DashboardHome from "./pages/user/UserDashboardHome";
import TopicSelectionPage from "./pages/user/TopicSelectionPage";
import LearningFeedPage from "./pages/user/LearningFeedPage";
import CourseDetailsPage from "./pages/user/CourseDetailsPage";
import QuizPage from "./pages/user/QuizPage";
import ExploreTopics from "./pages/ExploreTopics";
import AboutUs from "./pages/AboutUs";
import UserLayout from "./layouts/UserLayout"; // user navigation
import CompletedCourses from "./pages/user/completedCourse";
import UserProfile from "./pages/user/UserDashboardMyAccount";
import CourseDetail from "./pages/user/MyCourse";
import AllTopics from "./pages/user/ExploreTopcs";
import TopicCourses from "./pages/user/TopicCourses";
import VerifyCodeSignUp from "./pages/Sign-Up-VerifyCode";
import MyCourses from "./pages/user/MyCourses";
import RecommendedCourses from "./pages/user/MyRecommendation"; 

const App = () => {
  const userRole = localStorage.getItem("role"); // "admin" | "user" | null

  return (
    <Routes>
      {/* Public Layout */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/explore" element={<ExploreTopics />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/verify-code" element={<VerifyCode />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/sign-up-verify-code" element={<VerifyCodeSignUp />} />
      </Route>

      <Route
        path="/admin"
        element={
          userRole === "admin" ? (
            <AdminLayout />
          ) : (
            <Navigate to="/login" replace />
          )
        }
      >
        <Route index element={<AdminDashboard />} />
        <Route path="users" element={<Users />} />
        <Route path="topics" element={<Topics />} />
      </Route>

      <Route
        path="/dashboard"
        element={
          userRole === "user" ? (
            <UserLayout />
          ) : (
            <Navigate to="/login" replace />
          )
        }
      >
        <Route index element={<DashboardHome />} />
        <Route path="topic-selection" element={<TopicSelectionPage />} />
        <Route path="learning-feed" element={<LearningFeedPage />} />
        <Route path="course-details" element={<CourseDetailsPage />} />
        <Route path="quiz" element={<QuizPage />} />
        <Route path="my-account" element={<UserProfile />} />
        <Route path="completed-courses" element={<CompletedCourses />} />
        <Route path="detail-courses" element={<CourseDetail />} />
        <Route path="explore-topics" element={<AllTopics />} />
        <Route path="topics/:id" element={<TopicCourses />} />
        <Route path="my-courses" element={<MyCourses />} />
        <Route path="recommended" element={<RecommendedCourses />} />
           {/* Add new pages here  */}
      </Route>

      {/* Catch-all redirect */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default App;
