import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import OTPInput from "./InputOtp";

const UserProfile = () => {
  const navigate = useNavigate();

  // Load user data from localStorage
  const storedUser = JSON.parse(localStorage.getItem("user")) || {};

  const [firstName, setFirstName] = useState(storedUser.first_name || "");
  const [lastName, setLastName] = useState(storedUser.last_name || "");
  const [email, setEmail] = useState(storedUser.email || "");
  const [originalEmail] = useState(storedUser.email || "");
  const [currentPassword] = useState("********");

  const [isOtpVisible, setIsOtpVisible] = useState(false);
  const [isEmailVerificationVisible, setIsEmailVerificationVisible] = useState(false);
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);

  const handleCancel = () => navigate(-1);

  const handleSave = (e) => {
    e.preventDefault();
    const fullName = `${firstName} ${lastName}`.trim();
      setIsEmailVerificationVisible(true);
    
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-white px-6">
      <div className="flex w-full max-w-6xl flex-col items-center gap-20 md:flex-row">
        <div className="hidden flex-1 flex-col items-center justify-center text-center md:flex">
          <h1 className="mb-4 text-5xl font-extrabold text-indigo-700">Hi, {firstName} 👋</h1>
          <p className="max-w-sm text-gray-500">Keep your profile updated. Change your email or password securely.</p>
        </div>

        <div className="w-full max-w-lg rounded-lg bg-white p-10 shadow-lg">
          <form onSubmit={handleSave} className="space-y-6">
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">First Name</label>
              <input
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="w-full rounded border border-gray-300 bg-gray-100 p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">Last Name</label>
              <input
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="w-full rounded border border-gray-300 bg-gray-100 p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">Email</label>
              <input
                type="text"
                value={email}
                disabled
                className="w-full rounded border border-gray-300 bg-gray-100 p-3 text-gray-500 cursor-not-allowed"
              />

            </div>
            <div className="flex justify-between">
              <button
                type="button"
                onClick={handleCancel}
                className="rounded bg-gray-300 px-6 py-2 text-gray-700 transition hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="rounded bg-indigo-600 px-6 py-2 text-white transition hover:bg-indigo-700"
              >
                Save
              </button>
            </div>
          </form>

          <div className="mt-10">
            <h3 className="mb-4 text-xl font-bold text-gray-800">Change Password</h3>
            <div className="rounded-md bg-gray-50 p-6">
              <div className="mb-4">
                <label className="mb-1 block text-sm font-medium text-gray-700">Current Password</label>
                <input
                  type="password"
                  value={currentPassword}
                  disabled
                  className="w-full rounded border border-gray-300 bg-gray-100 p-3"
                />
              </div>
              <button
                type="button"
                onClick={() => setIsOtpVisible(true)}
                className="w-full rounded bg-indigo-600 py-3 font-semibold text-white transition hover:bg-indigo-700"
              >
                Change Password
              </button>
            </div>
          </div>
        </div>
      </div>

      {isOtpVisible && (
        <Modal onClose={() => setIsOtpVisible(false)}>
          <h2 className="text-2xl font-semibold text-gray-800 mb-2 text-center">
            Please check your email
          </h2>
          <p className="text-gray-600 text-sm mb-6 text-center">
            We've sent a code to {email}
          </p>
          <OTPInput otp={otp} setOtp={setOtp} />
          <button className="w-full mt-6 py-2 rounded bg-indigo-600 text-white font-semibold hover:bg-indigo-700">
            Verify OTP
          </button>
          <p className="text-center mt-4 text-sm text-gray-500">
            Didn’t receive an email?{" "}
            <button className="font-semibold text-indigo-600 hover:underline">Resend</button>
          </p>
        </Modal>
      )}

      {isEmailVerificationVisible && (
        <Modal onClose={() => setIsEmailVerificationVisible(false)}>
          <h2 className="text-2xl font-semibold text-gray-800 mb-2 text-center">
            Please check your email
          </h2>
          <p className="text-gray-600 text-sm mb-6 text-center">
            We've sent a code to {email}
          </p>
          <OTPInput otp={otp} setOtp={setOtp} />
          <button className="w-full mt-6 py-2 rounded bg-indigo-600 text-white font-semibold hover:bg-indigo-700">
            Verify Email
          </button>
          <p className="text-center mt-4 text-sm text-gray-500">
            Didn’t receive an email?{" "}
            <button className="font-semibold text-indigo-600 hover:underline">Resend</button>
          </p>
        </Modal>
      )}
    </div>
  );
};

const Modal = ({ onClose, children }) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
    <div className="relative w-[420px] rounded-lg bg-white px-8 py-10 shadow-2xl flex flex-col items-center">
      <button
        onClick={onClose}
        className="absolute right-3 top-3 text-gray-500 hover:text-gray-700"
      >
        ✕
      </button>
      {children}
    </div>
  </div>
);

export default UserProfile;
