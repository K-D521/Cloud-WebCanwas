import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext/AuthContext";
import {
  FaCloud,
  FaUser,
  FaUpload,
  FaFolder,
  FaSignOutAlt,
} from "react-icons/fa";

function Navbar() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="bg-gradient-to-r from-blue-600 to-indigo-700 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0">
              <FaCloud className="h-8 w-8 text-white" />
            </Link>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <Link
                  to="/"
                  className="text-gray-300 hover:bg-blue-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition duration-300 ease-in-out"
                >
                  Home
                </Link>
                {user && (
                  <>
                    <Link
                      to="/profile"
                      className="text-gray-300 hover:bg-blue-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition duration-300 ease-in-out"
                    >
                      <FaUser className="inline-block mr-1" /> Profile
                    </Link>
                    <Link
                      to="/upload"
                      className="text-gray-300 hover:bg-blue-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition duration-300 ease-in-out"
                    >
                      <FaUpload className="inline-block mr-1" /> Upload
                    </Link>
                    <Link
                      to="/files"
                      className="text-gray-300 hover:bg-blue-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition duration-300 ease-in-out"
                    >
                      <FaFolder className="inline-block mr-1" /> My Files
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
          <div className="hidden md:block">
            <div className="ml-4 flex items-center md:ml-6">
              {user ? (
                <button
                  onClick={handleLogout}
                  className="bg-blue-800 hover:bg-blue-900 text-white px-3 py-2 rounded-md text-sm font-medium transition duration-300 ease-in-out"
                >
                  <FaSignOutAlt className="inline-block mr-1" /> Logout
                </button>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="text-gray-300 hover:bg-blue-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition duration-300 ease-in-out mr-2"
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="bg-blue-800 hover:bg-blue-900 text-white px-3 py-2 rounded-md text-sm font-medium transition duration-300 ease-in-out"
                  >
                    Register
                  </Link>
                </>
              )}
            </div>
          </div>
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="bg-blue-800 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-blue-800 focus:ring-white"
              aria-controls="mobile-menu"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {!isOpen ? (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              ) : (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden" id="mobile-menu">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              to="/"
              className="text-gray-300 hover:bg-blue-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
            >
              Home
            </Link>
            {user && (
              <>
                <Link
                  to="/profile"
                  className="text-gray-300 hover:bg-blue-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                >
                  <FaUser className="inline-block mr-1" /> Profile
                </Link>
                <Link
                  to="/upload"
                  className="text-gray-300 hover:bg-blue-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                >
                  <FaUpload className="inline-block mr-1" /> Upload
                </Link>
                <Link
                  to="/files"
                  className="text-gray-300 hover:bg-blue-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                >
                  <FaFolder className="inline-block mr-1" /> My Files
                </Link>
              </>
            )}
            {user ? (
              <button
                onClick={handleLogout}
                className="text-gray-300 hover:bg-blue-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium w-full text-left"
              >
                <FaSignOutAlt className="inline-block mr-1" /> Logout
              </button>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-gray-300 hover:bg-blue-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="text-gray-300 hover:bg-blue-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
