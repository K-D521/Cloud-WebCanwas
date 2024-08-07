import React, { useState } from "react";
import { CognitoUser, AuthenticationDetails } from "amazon-cognito-identity-js";
import userpool from "../userpool";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../AuthContext/AuthContext";
function Login() {
  const navigate = useNavigate();
  const { user, login, logout } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const sendLoginNotification = async (userId, email) => {
    try {
      const response = await fetch(
        "https://95ng553vr9.execute-api.us-east-1.amazonaws.com/prod/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userId, email }),
        }
      );

      const data = await response.json();
      console.log("Notification response:", data);
    } catch (error) {
      console.error("Failed to send login notification:", error);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const user = new CognitoUser({
      Username: email,
      Pool: userpool,
    });

    const authDetails = new AuthenticationDetails({
      Username: email,
      Password: password,
    });

    user.authenticateUser(authDetails, {
      onSuccess: async (result) => {
        toast.success("Login successful!");
        await login(email, password); // Assuming email is part of user data
        sendLoginNotification(email, email);
        navigate("/");
        // Navigate to another page or update the state as needed
      },
      onFailure: (err) => {
        toast.error("Login failed: " + err.message);
      },
      newPasswordRequired: (data) => {
        toast.info("New password required.");
        // Here, you might navigate to a change password component
      },
    });
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="p-8 bg-white shadow-md rounded space-y-6"
      >
        <h2 className="mb-6 text-center text-3xl font-extrabold text-gray-900">
          Login
        </h2>
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
        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded"
        >
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;
