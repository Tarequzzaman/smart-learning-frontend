import React, { useState } from "react";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import boySignup from "../assets/boy-signup.png"; // ✅ Ensure correct path

const SignUpSchema = Yup.object().shape({
  firstName: Yup.string().required("First Name is required"),
  lastName: Yup.string().required("Last Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
  confirmPassword: Yup.string().oneOf([Yup.ref("password"), null], "Passwords must match").required("Confirm Password is required"),
});

const SignUp = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

  const handleSubmit = (values) => {
    console.log(values);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12">
      {/* Left Side */}
      <div className="hidden lg:flex items-center justify-center w-1/2">
        <img src={boySignup} alt="signup" className="max-h-[500px] w-auto object-contain" />
      </div>

      {/* Right Side */}
      <div className="w-full max-w-lg bg-white p-10 rounded-lg shadow-md">
        <h2 className="text-3xl font-bold text-indigo-600 mb-6 text-center">Create New Account</h2>

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
              {/* First + Last Name */}
              <div className="flex gap-4 mb-6">
                <div className="w-1/2">
                  <Field type="text" name="firstName" placeholder="First Name" className="w-full p-3 border border-gray-300 rounded bg-gray-100" />
                  {errors.firstName && touched.firstName && (
                    <div className="text-red-500 text-sm mt-1">{errors.firstName}</div>
                  )}
                </div>
                <div className="w-1/2">
                  <Field type="text" name="lastName" placeholder="Last Name" className="w-full p-3 border border-gray-300 rounded bg-gray-100" />
                  {errors.lastName && touched.lastName && (
                    <div className="text-red-500 text-sm mt-1">{errors.lastName}</div>
                  )}
                </div>
              </div>

              {/* Email */}
              <div className="mb-6">
                <Field type="email" name="email" placeholder="Email Address" className="w-full p-3 border border-gray-300 rounded bg-gray-100" />
                {errors.email && touched.email && (
                  <div className="text-red-500 text-sm mt-1">{errors.email}</div>
                )}
              </div>

              {/* Password */}
              <div className="mb-6 relative">
                <Field
                  type={passwordVisible ? "text" : "password"}
                  name="password"
                  placeholder="Password"
                  className="w-full p-3 border border-gray-300 rounded bg-gray-100"
                />
                <div
                  className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500 cursor-pointer"
                  onClick={() => setPasswordVisible(!passwordVisible)}
                >
                  {passwordVisible ? <FaEyeSlash /> : <FaEye />}
                </div>
                {errors.password && touched.password && (
                  <div className="text-red-500 text-sm mt-1">{errors.password}</div>
                )}
              </div>

              {/* Confirm Password */}
              <div className="mb-6 relative">
                <Field
                  type={confirmPasswordVisible ? "text" : "password"}
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  className="w-full p-3 border border-gray-300 rounded bg-gray-100"
                />
                <div
                  className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500 cursor-pointer"
                  onClick={() => setConfirmPasswordVisible(!confirmPasswordVisible)}
                >
                  {confirmPasswordVisible ? <FaEyeSlash /> : <FaEye />}
                </div>
                {errors.confirmPassword && touched.confirmPassword && (
                  <div className="text-red-500 text-sm mt-1">{errors.confirmPassword}</div>
                )}
              </div>

              {/* Submit Button */}
              <button type="submit" className="w-full bg-indigo-600 text-white font-semibold py-3 rounded hover:bg-indigo-700 transition">
                Create Account
              </button>
            </Form>
          )}
        </Formik>

        {/* Footer */}
        <div className="mt-6 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link to="/login" className="text-indigo-600 font-semibold hover:underline">
            Click here to login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
