import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { HiOutlineMail } from 'react-icons/hi';

const VerifyCode = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email || '';
  const [code, setCode] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (code.length !== 6 || !/^\d{6}$/.test(code)) {
      alert('Please enter a valid 6-digit code.');
      return;
    }

    console.log('Verification code entered:', code);
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
    <div className="min-h-screen flex flex-col items-center pt-24 bg-white px-4">
      {/* Icon */}
      <div className="bg-indigo-100 text-indigo-600 p-3 rounded-full mb-4">
        <HiOutlineMail size={28} />
      </div>

      {/* Heading */}
      <h2 className="text-2xl font-bold text-gray-900 mb-1">Verify your email</h2>
      <p className="text-gray-600 mb-8 text-center">
        Enter the 6-digit code sent to <strong>{email}</strong>.
      </p>

      {/* Form */}
      <form onSubmit={handleSubmit} className="w-full max-w-sm space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Verification Code</label>
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
          className="w-full bg-indigo-600 text-white py-2 rounded font-semibold hover:bg-indigo-700 transition"
        >
          Verify Code
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
        <a href="/login" className="hover:underline">Back to login</a>
      </div>
    </div>
  );
};

export default VerifyCode;
