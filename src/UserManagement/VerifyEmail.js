import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { CognitoUser } from "amazon-cognito-identity-js";
import userPool from "../userpool";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function VerifyEmail() {
  const location = useLocation();
  const navigate = useNavigate();
  const [code, setCode] = useState("");
  const email = location.state?.email; // Retrieve email passed through state

  const handleVerify = () => {
    const userData = {
      Username: email,
      Pool: userPool,
    };

    const cognitoUser = new CognitoUser(userData);

    cognitoUser.confirmRegistration(code, true, function (err, result) {
      if (err) {
        toast.error("Failed to verify email: " + err.message);
        return;
      }
      toast.success("Email verified successfully! Please log in.");
      setTimeout(() => {
        navigate("/login"); // Navigate to login page after successful verification
      }); // Optional delay to read the message
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center">
      <div className="max-w-md w-full bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <h2 className="mb-6 text-center text-3xl font-extrabold text-gray-900">
          Enter Your Verification Code
        </h2>
        <p className="mb-4 text-sm text-gray-600">
          A verification code has been sent to{" "}
          <span className="text-blue-500">{email}</span>. Please enter it below
          to verify your account.
        </p>
        <input
          type="text"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="Verification Code"
          className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
        />
        <div className="mt-6">
          <button
            onClick={handleVerify}
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Verify Email
          </button>
        </div>
      </div>
    </div>
  );
}

export default VerifyEmail;
