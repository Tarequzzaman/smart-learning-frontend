import React, { useState } from "react";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import loginImage from "../assets/login.png"; // Make sure this image is in your assets folder
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
  
      // Store token and user info in localStorage
      localStorage.setItem("access_token", response.access_token);
      localStorage.setItem("user", JSON.stringify(response.user)); // Store full user info
  
      const userRole = response.user.role;
      console.log(response)
      // Redirect based on role
      if (userRole === "admin") {
        localStorage.setItem("role", "admin");
        window.location.href = "/admin";

      } else {
        navigate("/topic-selection");
      }
    } catch (error) {
      alert(`Login failed: ${error.message}`);
    } finally {
      setSubmitting(false);
    }
  };
  

  return (
    <div className="flex min-h-screen justify-center items-center bg-gray-50 px-6">
      <div className="flex flex-col md:flex-row items-center max-w-6xl w-full gap-10">
        {/* Left Illustration */}
        <div className="hidden md:flex flex-col items-center justify-center flex-1">
          <div className="mb-6">
            <h1 className="text-[#FF8113] font-bold text-3xl tracking-wider">Welcome to</h1>
            <h1 className="text-indigo-700 text-5xl font-extrabold tracking-wide">Smart Learning</h1>
          </div>
          <img src={loginImage} alt="login" className="w-80 max-w-full" />
        </div>

        {/* Login Form */}
        <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md md:ml-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
            Sign In to Your Account
          </h2>

          <Formik
            initialValues={{ email: "", password: "" }}
            validationSchema={LoginSchema}
            onSubmit={handleSubmit}
          >
            {({ errors, touched }) => (
              <Form>
                {/* Email */}
                <div className="mb-6">
                  <Field
                    type="email"
                    name="email"
                    placeholder="Email Address"
                    className="w-full p-3 border border-gray-300 rounded bg-gray-100"
                  />
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

                {/* Forgot Password */}
                <div className="text-right mb-6">
                  <Link to="/forgot-password" className="text-sm text-indigo-600 hover:underline">
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

          {/* Link to Signup */}
          <div className="mt-6 text-center text-sm text-gray-600">
            Don’t have an account?{" "}
            <Link to="/signup" className="text-indigo-600 font-semibold hover:underline">
              Click here to Register
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
