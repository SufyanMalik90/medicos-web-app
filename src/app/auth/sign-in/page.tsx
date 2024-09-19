"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { z } from "zod"; // Import Zod
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { auth } from "@/axios";

// Define the Zod schema
const signInSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .nonempty({ message: "Password is required" })
});

const SignIn: React.FC = () => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    // Validate the form data using the Zod schema
    const result = signInSchema.safeParse(formData);

    if (!result.success) {
      // If validation fails, set form errors
      const errors: Record<string, string> = {};
      result.error.errors.forEach((err) => {
        if (err.path[0]) {
          errors[err.path[0] as string] = err.message;
        }
      });
      setFormErrors(errors);
      return;
    } else {
      setFormErrors({}); // Clear any form errors
    }

    // Proceed with API call if validation passes
    try {
      const response = await auth.post("/api/auth/login", formData);
      console.log("Response ==== login", response.data);

      if (response?.data?.success) {
        Cookies.set("token", response?.data?.token, { expires: 7 });
        if (response?.data?.token) {
          router.push("/");
        }
      } else {
        setErrorMessage(response?.data?.error);
      }
    } catch (error: any) {
      setErrorMessage(
        error?.response?.data?.error || "Failed to login. Please try again."
      );
    }
  };

  // Function to toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  return (
    <div className="font-[sans-serif] bg-gray-900 flex items-center justify-center md:h-screen p-4">
      <div className="shadow-[0_2px_16px_-3px_rgba(6,81,237,0.3)] bg-gray-800 max-w-6xl max-md:max-w-lg rounded-md p-6">
        <div className="grid md:grid-cols-2 items-center gap-8">
          <div className="max-md:order-1 lg:min-w-[450px]">
            <img
              src="https://readymadeui.com/signin-image.webp"
              className="lg:w-11/12 w-full object-cover"
              alt="login-image"
            />
          </div>

          <form className="md:max-w-md w-full mx-auto">
            <div className="mb-12">
              <h3 className="text-4xl font-extrabold text-blue-600">Sign in</h3>
            </div>
              <p className="text-gray-400 mb-8 mt-[-20px]">Welcome back! Please sign in to continue.</p>

            <div className="mb-4">
              <div className="relative flex items-center">
                <input
                  name="email"
                  type="text"
                  className="w-full px-3 py-2 bg-gray-700 text-white rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Enter email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
              {formErrors.email && (
                <p className="text-red-500 text-sm">{formErrors.email}</p>
              )}
            </div>

            <div className="mb-4">
              <div className="relative flex items-center">
                <input
                  name="password"
                  type={showPassword ? "text" : "password"} // Toggle password visibility
                  className="w-full px-3 py-2 bg-gray-700 text-white rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Enter password"
                  value={formData.password}
                  onChange={handleChange}
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute right-2 top-2"
                >
                  {showPassword ? (
                    <Image
                      src="/images/auth/eye-off.svg"
                      alt="Hide password"
                      width={20}
                      height={20}
                    />
                  ) : (
                    <Image
                      src="/images/auth/eye.svg"
                      alt="Show password"
                      width={20}
                      height={20}
                    />
                  )}
                </button>
              </div>
              {formErrors.password && (
                <p className="text-red-500 text-sm">{formErrors.password}</p>
              )}
            </div>

            <div className="flex flex-wrap items-center justify-between gap-4 mt-6">
              <div className="flex items-center">
                {/* <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 shrink-0 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label
                  htmlFor="remember-me"
                  className="text-gray-800 ml-3 block text-sm"
                >
                  Remember me
                </label> */}
              </div>
              <div>
                <Link
                  href="/auth/forget-password"
                  className="cursor-pointer text-indigo-500 hover:text-indigo-600"
                >
                  Forgot Password?
                </Link>
              </div>
            </div>

            <div className="mt-12">
              <button
                onClick={handleSubmit}
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500 mb-4"
              >
                Sign in
              </button>
            </div>

            {errorMessage && (
              <p className="text-red-500 text-sm mt-4">{errorMessage}</p>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
