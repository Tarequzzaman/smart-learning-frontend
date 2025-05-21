import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import { BiKey } from "react-icons/bi";
import { sendResetPasswordCode } from "../services/userProfileService";
import { useEffect } from "react";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null); // success or error message
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);
    setError(null);

    try {
      const response = await sendResetPasswordCode(email);
      console.log("Reset code sent:", response);

      // ✅ Show success message
      setMessage(response.message || "Reset code sent successfully.");

      // ✅ Save email for next page
      localStorage.setItem("reset_email", email);

      setTimeout(() => {
        navigate("/verify-code", { state: { email } });
      });
    } catch (err) {
      console.error("Failed to send reset code:", err);
      if (err.detail) {
        setError(err.detail);
      } else {
        setError("Something went wrong. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => setMessage(null), 2000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => setError(null), 2000);
      return () => clearTimeout(timer);
    }
  }, [error]);
  return (
    <div className="min-h-screen flex flex-col items-center pt-12 bg-white px-4">
      {/* Error popup */}
      {error && (
        <div className="mb-4 bg-red-100 text-red-600 p-3 rounded shadow">
          😔 {error}
        </div>
      )}
      {/* Success popup */}
      {message && (
        <div className="mb-4 bg-green-100 text-green-600 p-3 rounded shadow">
          🎉 {message}
        </div>
      )}
      <div className="w-full max-w-md p-8 rounded text-center">
        {/* Icon */}
        <div className="mx-auto mb-6 w-14 h-14 rounded-full bg-indigo-100 flex items-center justify-center">
          <BiKey className="text-indigo-600 text-2xl" />
        </div>

        {/* Title */}
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">
          Forgot password?
        </h2>
        <p className="text-gray-500 mb-6">
          No worries, we’ll send you reset instructions.
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4 text-left">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              required
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 rounded font-semibold hover:bg-indigo-700 transition"
          >
            Reset password
          </button>
        </form>

        {/* Back link */}
        <button
          className="flex items-center gap-2 justify-center mt-6 text-sm text-gray-500 hover:underline"
          onClick={() => navigate("/login")}
        >
          <FiArrowLeft className="text-lg" />
          Back to log in
        </button>
      </div>
    </div>
  );
};

export default ForgotPassword;
