import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import userpool from "../userpool";
import {
  CognitoUserPool,
  CognitoUserAttribute,
} from "amazon-cognito-identity-js";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Register() {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    const attributeList = [
      new CognitoUserAttribute({ Name: "email", Value: email }),
      new CognitoUserAttribute({ Name: "given_name", Value: firstName }),
      new CognitoUserAttribute({ Name: "family_name", Value: lastName }),
    ];

    userpool.signUp(
      email,
      password,
      attributeList,
      null,
      async (err, result) => {
        if (err) {
          toast.error("Registration failed: " + err.message);
          return;
        }

        // Define user details for DynamoDB
        const userDetails = {
          userId: email, // Assuming email as userId for simplicity
          firstName: firstName,
          lastName: lastName,
          email: email,
        };

        try {
          console.log("its here");
          // Await the response from the Lambda function via API Gateway
          const response = await fetch(
            "https://95ng553vr9.execute-api.us-east-1.amazonaws.com/prod/register",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(userDetails),
            }
          );
          console.log("is it here?");

          const data = await response.json();
          if (!response.ok) {
            throw new Error(
              data.message || "Failed to save user details to DynamoDB"
            );
          }

          toast.success("Registration successful. Please verify your email.");
          navigate("/verify-email", { state: { email } }); // Navigate to email verification page
        } catch (error) {
          console.error("Failed to store user details:", error);
          toast.error(
            "Error: " + (error.message || "Could not complete registration.")
          );
        }
      }
    );
  };

  const storeUserDetailsInDynamoDB = async (userDetails) => {
    try {
      const response = await fetch(
        "https://95ng553vr9.execute-api.us-east-1.amazonaws.com/prod/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userDetails),
        }
      );

      const data = await response.json();
      if (response.ok) {
        console.log("User details saved:", data);
        navigate("/verify-email", { state: { email } }); // Ensure only one navigate call happens overall
      } else {
        console.error("Failed to save user details:", data);
        toast.error("Couldn't save user details");
      }
    } catch (error) {
      console.error("Error saving user details:", error);
      toast.error("Error in connection");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="p-8 bg-white shadow-md rounded space-y-4"
      >
        <h2 className="mb-6 text-center text-3xl font-extrabold text-gray-900">
          Register
        </h2>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            First Name
          </label>
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
            className="mt-1 p-2 w-full border rounded"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Last Name
          </label>
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
            className="mt-1 p-2 w-full border rounded"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="mt-1 p-2 w-full border rounded"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="mt-1 p-2 w-full border rounded"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Confirm Password
          </label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            className="mt-1 p-2 w-full border rounded"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded"
        >
          Register
        </button>
      </form>
    </div>
  );
}

export default Register;
