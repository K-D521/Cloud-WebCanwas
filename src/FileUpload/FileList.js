import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../AuthContext/AuthContext";
import { FaHtml5, FaCss3Alt, FaEye } from "react-icons/fa";
import { motion } from "framer-motion";

function MyFiles() {
  const [bundles, setBundles] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      fetchBundles();
    }
  }, [user]);

  const fetchBundles = async () => {
    try {
      const response = await fetch(
        "https://95ng553vr9.execute-api.us-east-1.amazonaws.com/prod/get-bundles",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userId: user.email }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch bundles");
      }

      const data = await response.json();
      setBundles(JSON.parse(data.body));
    } catch (error) {
      console.error("Error fetching bundles:", error);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-extrabold text-gray-900 text-center mb-10">
          My Files
        </h1>
        {bundles.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {bundles.map((bundle, index) => (
              <motion.div
                key={index}
                className="bg-white overflow-hidden shadow-lg rounded-lg hover:shadow-xl transition-shadow duration-300 ease-in-out"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    {bundle.bundleName}
                  </h3>
                  <p className="text-gray-600 mb-4">{bundle.description}</p>
                  <div className="flex items-center text-sm text-gray-500 mb-4">
                    <FaHtml5 className="text-orange-500 mr-2" />
                    <span className="mr-4">{bundle.htmlFileName}</span>
                    <FaCss3Alt className="text-blue-500 mr-2" />
                    <span>{bundle.cssFileName}</span>
                  </div>
                  <Link
                    to={`/display/${bundle.bundleName}`}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    <FaEye className="mr-2" />
                    View Bundle
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center">
            <p className="text-xl text-gray-600 mb-4">
              You haven't uploaded any files yet.
            </p>
            <Link
              to="/upload"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Upload Your First Bundle
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default MyFiles;
