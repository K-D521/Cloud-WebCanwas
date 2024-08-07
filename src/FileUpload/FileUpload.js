import React, { useState } from "react";
import { toast } from "react-toastify";
import { useAuth } from "../AuthContext/AuthContext";
import { FaHtml5, FaCss3, FaUpload } from "react-icons/fa";

function FileUpload() {
  const [htmlFile, setHtmlFile] = useState(null);
  const [cssFile, setCssFile] = useState(null);
  const [bundleName, setBundleName] = useState("");
  const [description, setDescription] = useState("");
  const [uploading, setUploading] = useState(false);
  const { user } = useAuth();

  const handleFileChange = (e, fileType) => {
    const file = e.target.files[0];
    if (fileType === "html") {
      setHtmlFile(file);
    } else {
      setCssFile(file);
    }
  };

  const uploadFile = async (file, fileType) => {
    if (!file) return;

    const fileName = `${bundleName}/${file.name}`;

    try {
      console.log("Sending request to get upload URL...");
      const response = await fetch(
        "https://95ng553vr9.execute-api.us-east-1.amazonaws.com/prod/get-upload-url",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: user.email,
            fileName: fileName,
            fileType: file.type,
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const responseData = await response.json();
      console.log("Response from get-upload-url:", responseData);

      const uploadURL = JSON.parse(responseData.body).uploadURL;
      if (!uploadURL) {
        throw new Error("Upload URL is undefined in the response");
      }
      console.log("fetttttch");

      const uploadResponse = await fetch(uploadURL, {
        method: "PUT",
        body: file,
        headers: {
          "Content-Type": file.type,
        },
      });

      console.log("fetttttch", uploadResponse);

      if (!uploadResponse.ok) {
        throw new Error(`Upload failed with status: ${uploadResponse.status}`);
      }

      console.log(`${fileType} file uploaded successfully`);
    } catch (error) {
      console.error(`Error uploading ${fileType} file:`, error);
      throw error;
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!user) {
      toast.error("Please log in to upload files");
      return;
    }

    if (!htmlFile || !cssFile || !bundleName) {
      toast.error(
        "Please select both HTML and CSS files and provide a bundle name"
      );
      return;
    }

    setUploading(true);

    try {
      await uploadFile(htmlFile, "html");
      await uploadFile(cssFile, "css");

      await fetch(
        "https://95ng553vr9.execute-api.us-east-1.amazonaws.com/prod/save-bundle-metadata",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: user.email,
            bundleName,
            description,
            htmlFileName: htmlFile.name,
            cssFileName: cssFile.name,
          }),
        }
      );

      toast.success("Files uploaded successfully!");
      setHtmlFile(null);
      setCssFile(null);
      setBundleName("");
      setDescription("");
    } catch (error) {
      console.error("Upload failed:", error);
      toast.error(`Upload failed: ${error.message}`);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
      <div className="max-w-md w-full bg-white rounded-xl shadow-2xl overflow-hidden transform hover:scale-105 transition-transform duration-300 ease-in-out">
        <div className="px-4 py-5 sm:p-6">
          <h2 className="text-center text-3xl font-extrabold text-gray-900 mb-8">
            Create Your Web Bundle
          </h2>

          <form onSubmit={handleUpload} className="space-y-6">
            <div>
              <label
                className="block text-sm font-medium text-gray-700 mb-2"
                htmlFor="bundleName"
              >
                Bundle Name
              </label>
              <input
                type="text"
                id="bundleName"
                value={bundleName}
                onChange={(e) => setBundleName(e.target.value)}
                className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                required
              />
            </div>

            <div>
              <label
                className="block text-sm font-medium text-gray-700 mb-2"
                htmlFor="description"
              >
                Description
              </label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                rows="3"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="html-file"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  HTML File
                </label>
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md bg-gray-50 hover:bg-gray-100 transition-colors duration-200">
                  <div className="space-y-1 text-center">
                    <FaHtml5 className="mx-auto h-12 w-12 text-orange-500" />
                    <div className="flex text-sm text-gray-600">
                      <label
                        htmlFor="html-file"
                        className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                      >
                        <span>Upload HTML</span>
                        <input
                          id="html-file"
                          name="html-file"
                          type="file"
                          className="sr-only"
                          accept=".html"
                          onChange={(e) => handleFileChange(e, "html")}
                        />
                      </label>
                    </div>
                  </div>
                </div>
                {htmlFile && (
                  <p className="mt-2 text-sm text-gray-500 truncate">
                    {htmlFile.name}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="css-file"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  CSS File
                </label>
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md bg-gray-50 hover:bg-gray-100 transition-colors duration-200">
                  <div className="space-y-1 text-center">
                    <FaCss3 className="mx-auto h-12 w-12 text-blue-500" />
                    <div className="flex text-sm text-gray-600">
                      <label
                        htmlFor="css-file"
                        className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                      >
                        <span>Upload CSS</span>
                        <input
                          id="css-file"
                          name="css-file"
                          type="file"
                          className="sr-only"
                          accept=".css"
                          onChange={(e) => handleFileChange(e, "css")}
                        />
                      </label>
                    </div>
                  </div>
                </div>
                {cssFile && (
                  <p className="mt-2 text-sm text-gray-500 truncate">
                    {cssFile.name}
                  </p>
                )}
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={uploading || (!htmlFile && !cssFile)}
                className={`w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
                  uploading || (!htmlFile && !cssFile)
                    ? "bg-indigo-400 cursor-not-allowed"
                    : "bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                }`}
              >
                <FaUpload className="mr-2" />
                {uploading ? "Uploading..." : "Create Bundle"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default FileUpload;
