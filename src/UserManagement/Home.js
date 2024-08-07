import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaCode, FaCloud, FaUsers, FaLock } from "react-icons/fa";
import { useAuth } from "../AuthContext/AuthContext";

function Home() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleGetStarted = () => {
    if (user) {
      navigate("/upload");
    } else {
      navigate("/register");
    }
  };

  return (
    <div className="bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 min-h-screen">
      {/* Hero Section */}
      <div className="relative bg-indigo-800 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="relative z-10 pb-8 sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
            <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
              <div className="sm:text-center lg:text-left">
                <h1 className="text-4xl tracking-tight font-extrabold text-white sm:text-5xl md:text-6xl">
                  <span className="block xl:inline">Welcome to</span>{" "}
                  <span className="block text-indigo-400 xl:inline">
                    WebCanvas
                  </span>
                </h1>
                <p className="mt-3 text-base text-gray-300 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                  Showcase your web creations, collaborate with others, and
                  explore a world of HTML and CSS masterpieces.
                </p>
                <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                  <div className="rounded-md shadow">
                    <button
                      onClick={handleGetStarted}
                      className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10"
                    >
                      {user ? "Get Started" : "Get Started"}
                    </button>
                  </div>
                  {!user && (
                    <div className="mt-3 sm:mt-0 sm:ml-3">
                      <Link
                        to="/login"
                        className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 md:py-4 md:text-lg md:px-10"
                      >
                        Log in
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </main>
          </div>
        </div>
        <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
          <img
            className="h-56 w-full object-cover sm:h-72 md:h-96 lg:w-full lg:h-full"
            src="https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2850&q=80"
            alt="Web development"
          />
        </div>
      </div>

      {/* Features Section */}
      <div className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <h2 className="text-base text-indigo-600 font-semibold tracking-wide uppercase">
              Features
            </h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              A better way to showcase your web projects
            </p>
            <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
              WebCanvas provides a platform for web developers to upload,
              display, and share their HTML and CSS creations.
            </p>
          </div>

          <div className="mt-10">
            <dl className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
              <div className="relative">
                <dt>
                  <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                    <FaCode className="h-6 w-6" />
                  </div>
                  <p className="ml-16 text-lg leading-6 font-medium text-gray-900">
                    Easy Upload
                  </p>
                </dt>
                <dd className="mt-2 ml-16 text-base text-gray-500">
                  Simply upload your HTML and CSS files, and we'll take care of
                  the rest.
                </dd>
              </div>

              <div className="relative">
                <dt>
                  <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                    <FaCloud className="h-6 w-6" />
                  </div>
                  <p className="ml-16 text-lg leading-6 font-medium text-gray-900">
                    Cloud Storage
                  </p>
                </dt>
                <dd className="mt-2 ml-16 text-base text-gray-500">
                  Your projects are securely stored in the cloud, accessible
                  anytime, anywhere.
                </dd>
              </div>

              <div className="relative">
                <dt>
                  <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                    <FaUsers className="h-6 w-6" />
                  </div>
                  <p className="ml-16 text-lg leading-6 font-medium text-gray-900">
                    Community
                  </p>
                </dt>
                <dd className="mt-2 ml-16 text-base text-gray-500">
                  Connect with other developers, share ideas, and get inspired
                  by amazing projects.
                </dd>
              </div>

              <div className="relative">
                <dt>
                  <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                    <FaLock className="h-6 w-6" />
                  </div>
                  <p className="ml-16 text-lg leading-6 font-medium text-gray-900">
                    Secure
                  </p>
                </dt>
                <dd className="mt-2 ml-16 text-base text-gray-500">
                  Your projects are protected with industry-standard security
                  measures.
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
