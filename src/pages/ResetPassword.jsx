import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { BiLockAlt } from 'react-icons/bi';
import { resetUserPassword } from '../services/userProfileService'; // Import here

const ResetPassword = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const storedEmail = localStorage.getItem('reset_email');
    const navEmail = location.state?.email;

    if (navEmail) {
      setEmail(navEmail);
    } else if (storedEmail) {
      setEmail(storedEmail);
    } else {
      // ❌ Not navigated properly, redirect to login
      navigate('/login');
    }
  }, [location.state, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setMessage(null);

    if (password !== confirmPassword) {
      setError('Passwords do not match!');
      return;
    }

    setLoading(true);

    try {
      const response = await resetUserPassword(email, password);
      setMessage(response.message || 'Password reset successfully.');

      // Clear stored email after success
      localStorage.removeItem('reset_email');

      setTimeout(() => {
        navigate('/login');
      }, 1500);

    } catch (err) {
      console.error('Failed to reset password:', err);
      setError(err.message || 'Something went wrong.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center pt-12 bg-white px-4 relative">
      <div className="w-full max-w-md p-8 text-center">

        {/* Icon */}
        <div className="mx-auto mb-6 w-14 h-14 rounded-full bg-indigo-100 flex items-center justify-center">
          <BiLockAlt className="text-indigo-600 text-2xl" />
        </div>

        {/* Title */}
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">Reset Password</h2>
        <p className="text-gray-500 mb-6">Enter and confirm your new password below.</p>

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

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4 text-left">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
            <input
              type="password"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 text-white py-2 rounded font-semibold hover:bg-indigo-700 transition"
          >
            {loading ? 'Resetting...' : 'Reset Password'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
