import React, { useState } from "react";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import loginImage from "../assets/login.png"; // your login image
import { loginUser } from "../services/userService";

const LoginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

const Login = () => {
  const navigate = useNavigate();
  const [passwordVisible, setPasswordVisible] = useState(false);

  const handleSubmit = async (values, { setSubmitting }) => {
    const { email, password } = values;
    try {
      const response = await loginUser(email, password);

      localStorage.setItem("access_token", response.access_token);
      localStorage.setItem("user", JSON.stringify(response.user));

      const userRole = response.user.role;
      if (userRole === "admin") {
        localStorage.setItem("role", "admin");
        window.location.href = "/admin";
      } else {
        localStorage.setItem("role", "user");
        window.location.href = "/dashboard";
      }
    } catch (error) {
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-screen justify-center items-center bg-white px-6">
      <div className="flex flex-col md:flex-row items-center max-w-6xl w-full gap-60">
        {/* Left Section */}
        <div className="hidden md:flex flex-col items-center justify-center flex-1">
          <div className="mb-6 text-center">
            <h1 className="text-[#FF8113] font-bold text-3xl tracking-wider">
              Welcome to
            </h1>
            <h1 className="text-indigo-700 text-5xl font-extrabold tracking-wide">
              Smart Learning
            </h1>
          </div>
          <img src={loginImage} alt="login" className="w-80 max-w-full" />
        </div>

        {/* Right Section - Transparent Form */}
        <div className="w-full max-w-lg p-10 text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Welcome Back
          </h2>
          <p className="text-gray-500 mb-8">
            Please enter your details to sign in.
          </p>

          <Formik
            initialValues={{ email: "", password: "" }}
            validationSchema={LoginSchema}
            onSubmit={handleSubmit}
          >
            {({ errors, touched }) => (
              <Form className="space-y-6 text-left">
                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <Field
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    className="w-full p-3 border border-gray-300 rounded bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                  {errors.email && touched.email && (
                    <div className="text-red-500 text-sm mt-1">
                      {errors.email}
                    </div>
                  )}
                </div>

                {/* Password */}
                <div className="relative">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Password
                  </label>
                  <Field
                    type={passwordVisible ? "text" : "password"}
                    name="password"
                    placeholder="Enter your password"
                    className="w-full p-3 border border-gray-300 rounded bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                  <div
                    className="absolute top-9 right-3 transform -translate-y-1/2 text-gray-500 cursor-pointer"
                    onClick={() => setPasswordVisible(!passwordVisible)}
                  >
                    {passwordVisible ? <FaEyeSlash /> : <FaEye />}
                  </div>
                  {errors.password && touched.password && (
                    <div className="text-red-500 text-sm mt-1">
                      {errors.password}
                    </div>
                  )}
                </div>

                {/* Forgot Password */}
                <div className="text-right">
                  <Link
                    to="/forgot-password"
                    className="text-sm text-indigo-600 hover:underline"
                  >
                    Forgot Password?
                  </Link>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full bg-indigo-600 text-white font-semibold py-3 rounded hover:bg-indigo-700 transition"
                >
                  Sign In
                </button>
              </Form>
            )}
          </Formik>

          {/* Create Account */}
          <p className="text-center text-sm text-gray-600 mt-6">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="text-indigo-600 font-medium hover:underline"
            >
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
