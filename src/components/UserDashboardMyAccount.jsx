import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import OTPInput from "./InputOtp";

const UserProfile = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("Tharindu jayasinghe");
  const [email, setEmail] = useState("tharindujayasinghe@gmail.com");
  const [originalEmail, setOriginalEmail] = useState("john@gmail.com");
  const [currentPassword] = useState("********");

  const [isOtpVisible, setIsOtpVisible] = useState(false);
  const [isEmailVerificationVisible, setIsEmailVerificationVisible] =
    useState(false);
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);

  const handleCancel = () => {
    navigate(-1);
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (email !== originalEmail) {
      setIsEmailVerificationVisible(true);
    } else {
      navigate(-1);
    }
  };

  return (
    <div className="flex min-h-screen justify-center items-center bg-white px-6">
      <div className="flex flex-col md:flex-row items-center max-w-6xl w-full gap-20">
        {/* Left Section - Welcome Text */}
        <div className="hidden md:flex flex-col items-center justify-center flex-1 text-center">
          <h1 className="text-indigo-700 text-5xl font-extrabold mb-4">
            Hi, {name.split(" ")[0]} 👋
          </h1>
          <p className="text-gray-500 max-w-sm">
            Keep your profile updated. Change your email or password securely.
          </p>
        </div>

        {/* Right Section - Profile Form */}
        <div className="w-full max-w-lg p-10 bg-white rounded-lg shadow-lg">
          {/* No Edit Profile heading here */}
          <form onSubmit={handleSave} className="space-y-6">
            {/* Full Name */}
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Full Name
              </label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                readOnly
                className="w-full p-3 border border-gray-300 rounded bg-gray-100"
              />
            </div>

            {/* Buttons */}
            <div className="flex justify-between">
              <button
                type="button"
                onClick={handleCancel}
                className="px-6 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 transition"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition"
              >
                Save
              </button>
            </div>
          </form>

          {/* Change Password Section */}
          <div className="mt-10">
            <h3 className="text-xl font-bold text-gray-800 mb-4">
              Change Password
            </h3>
            <div className="bg-gray-50 p-6 rounded-md">
              <div className="mb-4">
                <label
                  htmlFor="currentPassword"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Current Password
                </label>
                <input
                  id="currentPassword"
                  type="password"
                  value={currentPassword}
                  disabled
                  className="w-full p-3 border border-gray-300 rounded bg-gray-100"
                />
              </div>
              <button
                type="button"
                onClick={() => setIsOtpVisible(true)}
                className="w-full py-3 bg-purple-500 text-white font-semibold rounded hover:bg-purple-600 transition"
              >
                Change Password
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* OTP Modal */}
      {isOtpVisible && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-40 z-50">
          <div className="bg-white p-8 rounded-lg shadow-2xl w-80 relative">
            <button
              onClick={() => setIsOtpVisible(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>
            <h4 className="text-xl font-bold mb-4 text-center">Enter OTP</h4>
            <OTPInput otp={otp} setOtp={setOtp} />
            <button className="w-full mt-6 py-2 bg-indigo-600 text-white font-bold rounded hover:bg-indigo-700 transition">
              Verify OTP
            </button>
            <p className="text-center text-gray-500 text-sm mt-4">
              Didn't receive an email?{" "}
              <button className="text-indigo-600 font-semibold">Resend</button>
            </p>
          </div>
        </div>
      )}

      {/* Email Verification Modal */}
      {isEmailVerificationVisible && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-40 z-50">
          <div className="bg-white p-8 rounded-lg shadow-2xl w-80 relative">
            <button
              onClick={() => setIsEmailVerificationVisible(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>
            <h4 className="text-xl font-bold mb-4 text-center">
              Verify Your New Email
            </h4>
            <p className="text-gray-500 text-sm mb-6 text-center">
              We sent a code to {email}. Please check your inbox.
            </p>
            <OTPInput otp={otp} setOtp={setOtp} />
            <button className="w-full mt-6 py-2 bg-green-500 text-white font-bold rounded hover:bg-green-600 transition">
              Verify Email
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
