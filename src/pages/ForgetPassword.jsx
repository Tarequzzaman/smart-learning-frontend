import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import { BiKey } from 'react-icons/bi';

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Sending code to:', email);
    navigate('/verify-code', { state: { email } });
  };

  return (
    <div className="min-h-screen flex flex-col items-center pt-12 bg-white px-4">
      <div className="w-full max-w-md p-8 rounded text-center">
        {/* Icon */}
        <div className="mx-auto mb-6 w-14 h-14 rounded-full bg-indigo-100 flex items-center justify-center">
          <BiKey className="text-indigo-600 text-2xl" />
        </div>

        {/* Title */}
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">Forgot password?</h2>
        <p className="text-gray-500 mb-6">No worries, we’ll send you reset instructions.</p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4 text-left">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
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
          onClick={() => navigate('/login')}
        >
          <FiArrowLeft className="text-lg" />
          Back to log in
        </button>
      </div>
    </div>
  );
};

export default ForgotPassword;
