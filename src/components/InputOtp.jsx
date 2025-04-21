import React from "react";

const OTPInput = ({ otp, setOtp, email }) => {
  const handleOtpChange = (e, index) => {
    const value = e.target.value;
    if (/[^0-9]/.test(value)) return; // Only allow numbers

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      document.getElementById(`otp-input-${index + 1}`).focus(); // Focus the next input
    }
  };

  return (
    <div className="flex flex-col items-center">
      {/* Heading and Subtext */}
      <h2 className="text-xl font-bold text-gray-800 mb-4">
        Please check your email
      </h2>
      <p className="text-gray-600 mb-6">We've sent a code to {email}</p>

      {/* OTP Input Fields */}
      <div className="flex justify-between mb-4">
        {otp.map((digit, index) => (
          <input
            key={index}
            id={`otp-input-${index}`}
            type="text"
            value={digit}
            onChange={(e) => handleOtpChange(e, index)}
            maxLength={1}
            className="w-12 h-12 text-center text-2xl border-2 border-gray-300 rounded-md mr-4 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          />
        ))}
      </div>
    </div>
  );
};

export default OTPInput;
