import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./NavBar/Navbar";
import Login from "./UserManagement/Login";
import Register from "./UserManagement/Registration";
import Home from "./UserManagement/Home";
import VerifyEmail from "./UserManagement/VerifyEmail";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthProvider } from "./AuthContext/AuthContext";
import Profile from "./UserManagement/Profile";
import FileDisplay from "./FileUpload/FileDisplay";
import FileUpload from "./FileUpload/FileUpload";
import MyFiles from "./FileUpload/FileList";

function App() {
  return (
    <AuthProvider>
      <Router>
        <div>
          <ToastContainer
            position="bottom-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
          <Navbar />
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/verify-email" element={<VerifyEmail />} />
            {/* <Route path="/upload" element={<FileUpload />} />
            <Route path="/display" element={<FileDisplay />} /> */}
            <Route path="/upload" element={<FileUpload />} />
            <Route path="/files" element={<MyFiles />} />
            <Route path="/display/:bundleName" element={<FileDisplay />} />

            <Route path="/" element={<Home />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
  // return <h1>Hello, world!</h1>;
}

export default App;
