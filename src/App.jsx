import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar';
import Footer from './components/Footer';

import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/SignUp';
import ForgotPassword from './pages/ForgetPassword';
import VerifyCode from './pages/VerifyCode';
import ResetPassword from './pages/ResetPassword';

const App = () => {
  return (
    <>
      <Navbar />

      {/* Main Content Area */}
      <div className="w-screen min-h-screen overflow-y-auto">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/verify-code" element={<VerifyCode />} />
          <Route path="/reset-password" element={<ResetPassword />} />


          {/* You can add more routes like Signup, Dashboard etc. here */}
        </Routes>
      </div>

      <Footer />
    </>
  );
};

export default App;
