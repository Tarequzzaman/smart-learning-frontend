import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { HiOutlineMail } from "react-icons/hi";
import {
  verifyResetPasswordCode,
  sendResetPasswordCode,
} from "../services/userProfileService";
import {
  registerUser,
  sendRegisterPasswordCode,
  verifyRegisterPasswordCode,
} from "../services/userService";

const VerifyCode = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [userData, setUserData] = useState(null);
  const [code, setCode] = useState("");
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Retrieve the user data from localStorage
    const storedUserData = localStorage.getItem("newUserData");

    if (storedUserData) {
      setUserData(JSON.parse(storedUserData)); // Parse the stored data into an object
    } else {
      setError("No user data found.");
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setMessage(null);

    if (code.length !== 6 || !/^\d{6}$/.test(code)) {
      setError("Please enter a valid 6-digit code.");
      return;
    }

    setLoading(true);

    try {
      const response = await verifyRegisterPasswordCode(userData?.email, code);
      setMessage(response.message || "Code verified successfully.");

      const result = await registerUser(userData);
      alert("Account created successfully!");

      localStorage.removeItem("newUserData");
      navigate("/login");
    } catch (err) {
      console.error("Failed to verify code:", err);
      setError(err.message || "Failed to verify code.");
    } finally {
      setLoading(false);
    }
  };

  const handleResendCode = async () => {
    if (!userData?.email) {
      setError("No email found to resend code.");
      return;
    }

    setError(null);
    setMessage(null);
    setLoading(true);

    try {
      const response = await sendRegisterPasswordCode(userData?.email);
      setMessage(
        response.message ||
          `A new verification code has been sent to: ${userData?.email}`
      );
    } catch (err) {
      console.error("Failed to resend code:", err);
      setError(err.message || "Failed to resend code.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center pt-24 bg-white px-4 relative">
      {/* Icon */}
      <div className="bg-indigo-100 text-indigo-600 p-3 rounded-full mb-4">
        <HiOutlineMail size={28} />
      </div>

      {/* Heading */}
      <h2 className="text-2xl font-bold text-gray-900 mb-1">
        Verify your email
      </h2>
      <p className="text-gray-600 mb-8 text-center">
        Enter the 6-digit code sent to{" "}
        <strong>{userData?.email || "your email"}</strong>.
      </p>

      {/* Error popup */}
      {error && (
        <div className="absolute top-2 right-2 bg-red-100 text-red-600 p-4 rounded-lg shadow-lg flex items-center space-x-2">
          <span className="text-2xl">😔</span>
          <p className="text-sm font-medium">{error}</p>
        </div>
      )}

      {/* Success popup */}
      {message && (
        <div className="absolute top-2 right-2 bg-green-100 text-green-600 p-4 rounded-lg shadow-lg flex items-center space-x-2">
          <span className="text-2xl">🎉</span>
          <p className="text-sm font-medium">{message}</p>
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className="w-full max-w-sm space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Verification Code
          </label>
          <input
            type="text"
            inputMode="numeric"
            maxLength="6"
            required
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="e.g. 123456"
            className="w-full px-4 py-2 border border-gray-300 rounded tracking-widest text-center text-lg font-mono focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-indigo-600 text-white py-2 rounded font-semibold hover:bg-indigo-700 transition"
        >
          {loading ? "Verifying..." : "Verify Code"}
        </button>
      </form>

      {/* Resend */}
      <button
        onClick={handleResendCode}
        className="mt-6 text-indigo-600 font-medium hover:underline text-sm"
      >
        Resend Code
      </button>

      {/* Back to login */}
      <div className="mt-4 text-sm text-gray-500">
        <a href="/login" className="hover:underline">
          Back to login
        </a>
      </div>
    </div>
  );
};

export default VerifyCode;
