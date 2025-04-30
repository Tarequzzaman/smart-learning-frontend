import React from "react";

const OTPInput = ({ otp, setOtp }) => {
  const handleOtpChange = (e, index) => {
    const value = e.target.value;
    if (/[^0-9]/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      document.getElementById(`otp-input-${index + 1}`).focus();
    }
  };

  return (
    <div className="flex justify-center mb-4">
      {otp.map((digit, index) => (
        <input
          key={index}
          id={`otp-input-${index}`}
          type="text"
          value={digit}
          onChange={(e) => handleOtpChange(e, index)}
          maxLength={1}
          className="w-12 h-12 text-center text-2xl border-2 border-gray-300 rounded-md mx-1 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
        />
      ))}
    </div>
  );
};

export default OTPInput;
