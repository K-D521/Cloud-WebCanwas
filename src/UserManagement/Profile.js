import React, { useState, useEffect } from "react";
import { useAuth } from "../AuthContext/AuthContext";
import {
  FaUser,
  FaEnvelope,
  FaCalendarAlt,
  FaFileUpload,
} from "react-icons/fa";

function Profile() {
  const { user } = useAuth();
  const [uploadCount, setUploadCount] = useState(0);
  const [joinDate, setJoinDate] = useState("");

  useEffect(() => {
    // Fetch additional user data here (e.g., upload count, join date)
    // This is a placeholder. Replace with actual API call.
    const fetchUserData = async () => {
      // Simulating API call
      setUploadCount(Math.floor(Math.random() * 20)); // Random number for demo
      setJoinDate(new Date().toLocaleDateString());
    };

    fetchUserData();
  }, [user]);

  if (!user) {
    return <p>Please log in to view this page.</p>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-indigo-100 to-purple-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-2xl overflow-hidden">
        <div className="md:flex">
          <div className="md:flex-shrink-0 bg-gradient-to-br from-blue-500 to-purple-600 p-8 flex items-center justify-center">
            <div className="h-48 w-48 rounded-full bg-white flex items-center justify-center">
              <FaUser className="h-32 w-32 text-gray-400" />
            </div>
          </div>
          <div className="p-8">
            <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
              User Profile
            </div>
            <h1 className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              {user.given_name} {user.family_name}
            </h1>
            <p className="mt-2 text-xl text-gray-500">Web Developer</p>
            <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div className="flex items-center">
                <FaEnvelope className="h-6 w-6 text-indigo-500 mr-3" />
                <span className="text-gray-600">{user.email}</span>
              </div>
              <div className="flex items-center">
                <FaCalendarAlt className="h-6 w-6 text-indigo-500 mr-3" />
                <span className="text-gray-600">Joined: {joinDate}</span>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-gray-50 px-4 py-5 sm:p-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900">Bio</h3>
          <div className="mt-2 max-w-xl text-sm text-gray-500">
            <p>
              Passionate web developer with a keen eye for design and a love for
              clean, efficient code. Specializing in creating responsive and
              user-friendly web applications.
            </p>
          </div>
        </div>
        <div className="bg-white px-4 py-5 sm:p-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            Recent Activity
          </h3>
          <ul className="mt-2 divide-y divide-gray-200">
            <li className="py-4">Uploaded a new HTML/CSS bundle</li>
            <li className="py-4">Updated profile information</li>
            <li className="py-4">Joined the platform</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Profile;
