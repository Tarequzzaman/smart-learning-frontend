import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BiLockAlt } from 'react-icons/bi';

const ResetPassword = () => {
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert('Passwords do not match!');
      return;
    }

    console.log('New password set:', password);

    // Simulate API success and navigate to login
    setTimeout(() => {
      navigate('/login');
    }, 1000);
  };

  return (
    <div className="min-h-screen flex flex-col items-center pt-12 bg-white px-4">
      <div className="w-full max-w-md p-8 text-center">
        {/* Icon */}
        <div className="mx-auto mb-6 w-14 h-14 rounded-full bg-indigo-100 flex items-center justify-center">
          <BiLockAlt className="text-indigo-600 text-2xl" />
        </div>

        {/* Title */}
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">Reset Password</h2>
        <p className="text-gray-500 mb-6">Enter and confirm your new password below.</p>

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
            className="w-full bg-indigo-600 text-white py-2 rounded font-semibold hover:bg-indigo-700 transition"
          >
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
