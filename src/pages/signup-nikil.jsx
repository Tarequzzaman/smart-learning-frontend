import React, { useState } from "react";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // Importing FontAwesome icons
import OTPInput from "../components/InputOtp";

const SignUpSchema = Yup.object().shape({
  firstName: Yup.string().required("First Name is required"),
  lastName: Yup.string().required("Last Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Confirm Password is required"),
});

const SignUp = () => {
  const [passwordVisible, setPasswordVisible] = useState(false); // State for password visibility
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false); // State for confirm password visibility
  const [showOtpModal, setShowOtpModal] = useState(false); // State for OTP modal visibility
  const [otp, setOtp] = useState(["", "", "", "", "", ""]); // 6-digit OTP array

  const handleSubmit = (values) => {
    console.log(values);
    // After submitting form, show OTP modal
    setShowOtpModal(true);
  };

  const handleOtpSubmit = (e) => {
    e.preventDefault();
    console.log("OTP submitted: ", otp.join(""));
    // Handle OTP submission logic
    setShowOtpModal(false); // Close OTP modal after submission
  };

  return (
    <div className="flex min-h-screen justify-center bg-primary-foreground">
      {/* Left Side Section */}
      <div className="flex justify-center items-center bg-primary-foreground">
        <img src="/boy-signup.png" alt="signup" className="h-3/4" />
      </div>

      {/* Right Side Form Section */}
      <div className="p-10 rounded-lg bg-primary-foreground flex flex-col justify-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          Create New Account
        </h2>
        <Formik
          initialValues={{
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            confirmPassword: "",
          }}
          validationSchema={SignUpSchema}
          onSubmit={handleSubmit}
        >
          {({ errors, touched }) => (
            <Form>
              {/* First Name */}
              <div className="mb-8 flex gap-8">
                <div className="w-1/2 shadow-stone-200 shadow-2xl">
                  <Field
                    type="text"
                    name="firstName"
                    placeholder="First Name"
                    className="w-full p-3 rounded-lg bg-secondary"
                  />
                  {errors.firstName && touched.firstName && (
                    <div className="text-red-500 text-sm mt-2">
                      {errors.firstName}
                    </div>
                  )}
                </div>

                <div className="w-1/2 shadow-stone-200 shadow-2xl">
                  <Field
                    type="text"
                    name="lastName"
                    placeholder="Last Name"
                    className="w-full p-3 rounded-lg bg-secondary"
                  />
                  {errors.lastName && touched.lastName && (
                    <div className="text-red-500 text-sm mt-2">
                      {errors.lastName}
                    </div>
                  )}
                </div>
              </div>

              {/* Email */}
              <div className="mb-8 shadow-stone-200 shadow-2xl">
                <Field
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  className="w-full p-3 bg-secondary"
                />
                {errors.email && touched.email && (
                  <div className="text-red-500 text-sm mt-2">
                    {errors.email}
                  </div>
                )}
              </div>

              {/* Password */}
              <div className="mb-8 shadow-stone-200 shadow-2xl relative">
                <Field
                  type={passwordVisible ? "text" : "password"} // Toggle between text and password
                  name="password"
                  placeholder="Password"
                  className="w-full p-3 bg-secondary"
                />
                <div
                  className="absolute top-1/2 right-3 transform -translate-y-1/2 cursor-pointer"
                  onClick={() => setPasswordVisible(!passwordVisible)} // Toggle visibility
                >
                  {passwordVisible ? <FaEyeSlash /> : <FaEye />}
                </div>
                {errors.password && touched.password && (
                  <div className="text-red-500 text-sm mt-2">
                    {errors.password}
                  </div>
                )}
              </div>

              {/* Confirm Password */}
              <div className="mb-8 shadow-stone-200 shadow-2xl relative">
                <Field
                  type={confirmPasswordVisible ? "text" : "password"} // Toggle between text and password
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  className="w-full p-3 rounded-lg bg-secondary"
                />
                <div
                  className="absolute top-1/2 right-3 transform -translate-y-1/2 cursor-pointer"
                  onClick={() =>
                    setConfirmPasswordVisible(!confirmPasswordVisible)
                  } // Toggle visibility
                >
                  {confirmPasswordVisible ? <FaEyeSlash /> : <FaEye />}
                </div>
                {errors.confirmPassword && touched.confirmPassword && (
                  <div className="text-red-500 text-sm mt-2">
                    {errors.confirmPassword}
                  </div>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-3 bg-primary text-white rounded-lg font-bold"
              >
                Create Account
              </button>
            </Form>
          )}
        </Formik>

        {/* Link to Sign In Page */}
        <div className="mt-4 text-center">
          <p className="text-gray-600">
            Already have an account?{" "}
            <Link to="/signin" className="text-primary font-bold">
              Click here to login
            </Link>
          </p>
        </div>
      </div>

      {/* OTP Modal */}
      {showOtpModal && (
        <div className="fixed inset-0 flex justify-center items-center bg-secondary bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-xl">
            <form onSubmit={handleOtpSubmit}>
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
  );
};

export default SignUp;
