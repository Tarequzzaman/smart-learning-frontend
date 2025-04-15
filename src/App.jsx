import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar';
import Footer from './components/Footer';

import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/SignUp';
import SignIn from './pages/Sign-In-Nikil';
import SignUp from './pages/Sign-Up-Nikil';

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

          {/* Nikil Pages */}

          <Route path="/admin/signin" element={<SignIn/>} />
          <Route path="/admin/signup" element={<SignUp/>} />


          {/* You can add more routes like Signup, Dashboard etc. here */}
        </Routes>
      </div>

      <Footer />
    </>
  );
};

export default App;
