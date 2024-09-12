"use client";
import React, { useRef, useState } from "react";
import Image from "next/image";
import { auth } from "@/axios";
import { useRouter } from "next/navigation";

const VerifyOTP = () => {
  const [email, setEmail] = useState("");
  const [otpValues, setOtpValues] = useState<string[]>(Array(6).fill(""));
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();
  
  const inputsRef = useRef<any[]>([]);

  const handleInputChange = (e: any, idx: number) => {
    const value = e.target.value;
    const newOtpValues = [...otpValues];
    newOtpValues[idx] = value;

    setOtpValues(newOtpValues);

    if (value && idx < 5) {
      inputsRef.current[idx + 1]?.focus();
    }
  };

  const handleKeyDown = (e: any, idx: number) => {
    if (e.key === "Backspace" && !e.currentTarget.value && idx > 0) {
      inputsRef.current[idx - 1]?.focus();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const otpCode = otpValues.join("");
    

    try {
      const response = await auth.post("/api/auth/verify-otp", { email: "shaikh.arman1239090@gmail.com", otp: otpCode });
      console.log("Response ==== Verify OTP", response.data);
     
      if (response?.data?.success) {
        console.log("Verify OTP successfully!");
        router.push("/auth/reset-password");       
       
      } else {
        // Handle password change error
        setErrorMessage(response?.data?.error);
      }
    } catch (error) {
      // Handle unexpected errors
      console.error("Error changing password:", error);
      setErrorMessage("Failed to change password.");
    }
  };

  return (
    <div className="flex items-center justify-center bg-white p-4 font-sans md:h-screen">
      <div className="max-w-6xl p-6 rounded-md shadow-[0_2px_16px_-3px_rgba(6,81,237,0.3)] max-md:max-w-lg">
        <div className="grid gap-8 md:grid-cols-2 items-center">
          <div className="max-md:order-1 lg:min-w-[450px]">
            <Image
              src="/images/auth/OTP.svg"
              alt="Verify OTP"
              className="w-full object-cover lg:w-11/12"
              width={25}
              height={25}
            />
          </div>

          <form className="mx-auto w-full md:max-w-sm flex flex-col">
            <div className="mb-12 text-center">
              <h3 className="text-4xl font-extrabold text-blue-600">Verify OTP</h3>
            </div>

            <div className="mb-2 flex space-x-2 justify-center">
              {Array(6).fill("").map((_, idx) => (
                <input
                  key={idx}
                  ref={(el:any) => (inputsRef.current[idx] = el as any)} // Assign input ref
                  type="text"
                  maxLength={1}
                  className="h-11 w-11 text-center text-sm font-extrabold rounded-lg border border-gray-300 bg-white text-gray-900 focus:ring-blue-600 focus:border-blue-600"
                  required
                  value={otpValues[idx]} // Bind value to state
                  onChange={(e) => handleInputChange(e, idx)} // Auto move to next input
                  onKeyDown={(e) => handleKeyDown(e, idx)} // Handle backspace to go to previous input
                />
              ))}
            </div>

            <p className="mt-2 text-sm text-gray-500 text-center">
              Please enter the 6-digit code we sent via email.
            </p>

            <div className="mt-12">
              <button
                onClick={handleSubmit}
                className="w-full py-2.5 px-5 rounded-full text-sm font-semibold bg-blue-600 text-white shadow-xl hover:bg-blue-700 focus:outline-none"
              >
                Verify
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default VerifyOTP;
