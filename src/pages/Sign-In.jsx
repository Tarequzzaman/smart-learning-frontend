import React, { useState } from "react";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // Importing FontAwesome icons

const SignUpSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

const SignIn = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);

  const handleSubmit = (values) => {
    console.log(values);
  };

  return (
    <div className="flex min-h-screen justify-evenly bg-primary-foreground">
      <div className="flex justify-center flex-col bg-primary-foreground">
        <div className="my-10 w-full">
          <h1
            className="text-[#FF8113] font-bold text-3xl mb-5 tracking-wider"
            style={{ fontFamily: "Sansita One" }}
          >
            Welcome to
          </h1>
          <h1
            className="text-primary text-5xl tracking-widest"
            style={{ fontFamily: "Ultra" }}
          >
            Smart Learning
          </h1>
        </div>

        <img src="/login.png" alt="signup" className="w-3/4" />
      </div>

      {/* Right Side Form Section */}
      <div className="p-10 rounded-lg bg-primary-foreground flex flex-col justify-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          Sign In to Your Account
        </h2>
        <Formik
          initialValues={{
            email: "",
            password: "",
          }}
          validationSchema={SignUpSchema}
          onSubmit={handleSubmit}
        >
          {({ errors, touched }) => (
            <Form>
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
              <div className="mb-4 shadow-stone-200 shadow-2xl relative">
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

              {/* Forgot Password Link */}
              <div className="text-right mb-8">
                <Link to="/forgot-password" className="text-gray-500 ">
                  Forgot Password?
                </Link>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-3 bg-primary text-white rounded-lg font-bold"
              >
                Sign In
              </button>
            </Form>
          )}
        </Formik>

        {/* Link to Sign In Page */}
        <div className="mt-4 text-center">
          <p className="text-gray-500">
            Don't have an account?{" "}
            <Link to="/signup" className="text-primary font-semibold">
              Click here to Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
