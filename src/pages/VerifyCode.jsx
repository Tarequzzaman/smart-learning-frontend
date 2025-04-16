import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const VerifyCode = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email || ''; // fallback if not provided

  const [code, setCode] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (code.length !== 6 || !/^\d{6}$/.test(code)) {
      alert('Please enter a valid 6-digit code.');
      return;
    }

    console.log('Verification code entered:', code);

    // Simulate success
    setTimeout(() => {
      navigate('/reset-password');
    }, 1000);
  };

  const handleResendCode = () => {
    if (!email) {
      alert('No email found to resend code.');
      return;
    }

    console.log('Resending code to:', email);
    alert(`A new verification code has been sent to: ${email}`);
  };

  return (
    <div className="min-h-screen flex items-start justify-center pt-24 bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white p-8 rounded shadow-md">
        <h2 className="text-2xl font-bold text-center text-indigo-600 mb-2">Enter Verification Code</h2>
        <p className="text-center text-gray-600 mb-6">We've sent a 6-digit code to <strong>{email}</strong>.</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">6-Digit Code</label>
            <input
              type="text"
              inputMode="numeric"
              maxLength="6"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              required
              placeholder="e.g. 123456"
              className="w-full px-4 py-2 mt-1 border border-gray-300 rounded tracking-widest text-center text-lg font-mono focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 rounded font-semibold hover:bg-indigo-700 transition"
          >
            Verify Code
          </button>
        </form>

        <button
          type="button"
          onClick={handleResendCode}
          className="w-full bg-gray-200 text-indigo-600 py-2 rounded font-semibold hover:bg-gray-300 transition mt-4"
        >
          Resend Code
        </button>
      </div>
    </div>
  );
};

export default VerifyCode;
