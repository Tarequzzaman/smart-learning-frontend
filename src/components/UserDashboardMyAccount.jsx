import React, { useState } from "react";
import UserDashboardLayout from "./UserDashboardLayout";
import OTPInput from "./InputOtp";

const UserProfile = () => {
  const [photo, setPhoto] = useState(null); // State for profile photo
  const [name, setName] = useState("John Marpung"); // Placeholder for user name
  const [email, setEmail] = useState("john@gmail.com"); // Placeholder email
  const [phone, setPhone] = useState("(+1) (634) 555-0102"); // Placeholder phone number
  const [dob, setDob] = useState("1999/04/12"); // Placeholder date of birth

  // Password change states
  const [currentPassword, setCurrentPassword] = useState("********");
  const [isOtpVisible, setIsOtpVisible] = useState(false); // State for showing OTP form
  const [otp, setOtp] = useState(["", "", "", "", "", ""]); // State for OTP input

  // Handle file upload
  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhoto(reader.result); // Save the base64 image URL to state
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <UserDashboardLayout>
      <div className="mx-auto p-6 bg-white rounded-lg shadow-md">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h2 className="text-2xl font-bold mb-2">Personal Info</h2>
            <p className="text-gray-400 mb-4 text-sm">
              Update your profile information and preferences.
            </p>
          </div>

          <div>
            {/* Save/Cancel Buttons */}
            <div className="flex justify-end space-x-4">
              <button
                type="button"
                className="px-6 py-2 bg-white text-gray-400 border border-gray-300 rounded-md cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2 bg-primary text-white font-medium rounded-md cursor-pointer hover:bg-blue-800 transition duration-200"
              >
                Save
              </button>
            </div>
          </div>
        </div>

        <hr className="text-gray-200 mb-6" />
        <form>
          {/* Photo Upload */}
          <div className="flex items-center mb-6">
            <label
              htmlFor="photo"
              className="block text-sm font-semibold text-gray-400 w-40"
            >
              Profile Photo
            </label>
            <div className="w-16 h-16 rounded-full overflow-hidden mr-6">
              {photo ? (
                <img
                  src={photo}
                  alt="User"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                  <span className="text-xl text-gray-600">+ Upload</span>
                </div>
              )}
            </div>
            <label className="cursor-pointer text-blue-500">
              Upload Image
              <input
                type="file"
                accept="image/*"
                onChange={handlePhotoUpload}
                className="hidden"
              />
            </label>
          </div>

          {/* Full Name */}
          <div className="flex items-center mb-4">
            <label
              htmlFor="name"
              className="block text-sm font-semibold text-gray-400 w-40"
            >
              Full name
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-3 rounded-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          {/* Email */}
          <div className="flex items-center mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-semibold text-gray-400 w-40"
            >
              Email
            </label>
            <input
              disabled
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 rounded-md border bg-gray-100  border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          {/* Phone Number */}
          <div className="flex items-center mb-4">
            <label
              htmlFor="phone"
              className="block text-sm font-semibold text-gray-400 w-40"
            >
              Phone number
            </label>
            <input
              id="phone"
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full p-3 rounded-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          {/* Date of Birth */}
          <div className="flex items-center mb-4">
            <label
              htmlFor="dob"
              className="block text-sm font-semibold text-gray-400 w-40"
            >
              Date of birth
            </label>
            <input
              id="dob"
              type="date"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
              className="w-full p-3 rounded-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
        </form>

        {/* Change Password Section */}
        <div className="mt-8">
          <h3 className="text-2xl font-bold mb-4">Change Password</h3>
          <div className="mb-4">
            <label
              htmlFor="currentPassword"
              className="block text-sm font-semibold text-gray-400"
            >
              Current Password
            </label>
            <input
              id="currentPassword"
              type="password"
              value={currentPassword}
              disabled
              className="w-full p-3 rounded-md border border-gray-200 bg-gray-100 text-gray-500 cursor-not-allowed"
            />
          </div>

          <button
            type="button"
            onClick={() => setIsOtpVisible(true)} // Enable OTP input on click
            className="px-6 py-2 bg-primary text-white font-medium rounded-md cursor-pointer hover:bg-blue-700"
          >
            Change Password
          </button>

          {/* OTP Modal */}
          {isOtpVisible && (
            <div className="fixed inset-0 flex justify-center items-center bg-secondary bg-opacity-50">
              <div className="bg-white p-6 rounded-lg shadow-xl">
                <form>
                  <OTPInput otp={otp} setOtp={setOtp} />
                  <button
                    type="submit"
                    className="w-full py-2 bg-primary text-white rounded-lg font-bold"
                  >
                    Verify OTP
                  </button>

                  {/* Resend Text */}
                  <div className="text-center mt-4">
                    <p className="text-gray-600 text-sm">
                      Didn't receive an email?{" "}
                      <button className="text-primary font-bold">Resend</button>
                    </p>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    </UserDashboardLayout>
  );
};

export default UserProfile;
