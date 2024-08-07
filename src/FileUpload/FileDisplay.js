// import React, { useState, useEffect } from "react";
// import { useAuth } from "../AuthContext/AuthContext";
// import { toast } from "react-toastify";
// import DOMPurify from "dompurify";

// function FileDisplay() {
//   const [htmlContent, setHtmlContent] = useState("");
//   const [cssContent, setCssContent] = useState("");
//   const [htmlFileName, setHtmlFileName] = useState("");
//   const [cssFileName, setCssFileName] = useState("");
//   const { user } = useAuth();

//   useEffect(() => {
//     if (user) {
//       fetchContents();
//     }
//   }, [user]);

//   const fetchContents = async () => {
//     try {
//       const response = await fetch(
//         "https://95ng553vr9.execute-api.us-east-1.amazonaws.com/prod/get-file-urls",
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({ userId: user.email }),
//         }
//       );

//       if (!response.ok) {
//         throw new Error("Failed to fetch file contents");
//       }

//       const data = await response.json();
//       console.log("Response data:", data);

//       // Parse the body content
//       const bodyContent = JSON.parse(data.body);
//       console.log("Parsed body content:", bodyContent);

//       setHtmlContent(bodyContent.html);
//       setCssContent(bodyContent.css);
//       setHtmlFileName(bodyContent.htmlFileName);
//       setCssFileName(bodyContent.cssFileName);
//     } catch (error) {
//       console.error("Error fetching file contents:", error);
//       toast.error("Failed to fetch file contents");
//     }
//   };

//   const sanitizedHtml = DOMPurify.sanitize(htmlContent);
//   const combinedContent = `
//         <html>
//             <head>
//                 <style>${cssContent}</style>
//             </head>
//             <body>${sanitizedHtml}</body>
//         </html>
//     `;

//   return (
//     <div className="max-w-4xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
//       <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
//         Your Uploaded Content
//       </h2>
//       {htmlContent ? (
//         <div className="mb-6">
//           <h3 className="text-xl font-semibold mb-2 text-gray-700">
//             HTML Preview
//           </h3>
//           <div className="border-2 border-gray-300 rounded-lg overflow-hidden">
//             <iframe
//               srcDoc={combinedContent}
//               sandbox="allow-scripts"
//               className="w-full h-96"
//               title="User Content"
//             />
//           </div>
//           <div className="mt-4">
//             <h4 className="text-lg font-semibold mb-2 text-gray-700">
//               Raw HTML ({htmlFileName}):
//             </h4>
//             <pre className="bg-gray-100 p-2 rounded overflow-x-auto">
//               {htmlContent}
//             </pre>
//           </div>
//           <div className="mt-4">
//             <h4 className="text-lg font-semibold mb-2 text-gray-700">
//               Raw CSS ({cssFileName}):
//             </h4>
//             <pre className="bg-gray-100 p-2 rounded overflow-x-auto">
//               {cssContent}
//             </pre>
//           </div>
//         </div>
//       ) : (
//         <p className="text-center text-gray-600">No content uploaded yet.</p>
//       )}
//       <div className="flex justify-center mt-4">
//         <button
//           onClick={fetchContents}
//           className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
//         >
//           Refresh Content
//         </button>
//       </div>
//     </div>
//   );
// }

// export default FileDisplay;

import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../AuthContext/AuthContext";
import { toast } from "react-toastify";
import DOMPurify from "dompurify";

function FileDisplay() {
  const [htmlContent, setHtmlContent] = useState("");
  const [cssContent, setCssContent] = useState("");
  const [htmlFileName, setHtmlFileName] = useState("");
  const [cssFileName, setCssFileName] = useState("");
  const { user } = useAuth();
  const { bundleName } = useParams();

  useEffect(() => {
    if (user && bundleName) {
      fetchContents();
    }
  }, [user, bundleName]);

  const fetchContents = async () => {
    try {
      const response = await fetch(
        "https://95ng553vr9.execute-api.us-east-1.amazonaws.com/prod/get-file-contents",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userId: user.email, bundleName }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch file contents");
      }

      const data = await response.json();
      console.log("Response data:", data);

      const bodyContent = JSON.parse(data.body);
      console.log("Parsed body content:", bodyContent);

      setHtmlContent(bodyContent.html);
      setCssContent(bodyContent.css);
      setHtmlFileName(bodyContent.htmlFileName);
      setCssFileName(bodyContent.cssFileName);
    } catch (error) {
      console.error("Error fetching file contents:", error);
      toast.error("Failed to fetch file contents");
    }
  };

  const sanitizedHtml = DOMPurify.sanitize(htmlContent);
  const combinedContent = `
        <html>
            <head>
                <style>${cssContent}</style>
            </head>
            <body>${sanitizedHtml}</body>
        </html>
    `;

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
        Bundle: {bundleName}
      </h2>
      {htmlContent ? (
        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-2 text-gray-700">
            HTML Preview
          </h3>
          <div className="border-2 border-gray-300 rounded-lg overflow-hidden">
            <iframe
              srcDoc={combinedContent}
              sandbox="allow-scripts"
              className="w-full h-96"
              title="User Content"
            />
          </div>
          <div className="mt-4">
            <h4 className="text-lg font-semibold mb-2 text-gray-700">
              Raw HTML ({htmlFileName}):
            </h4>
            <pre className="bg-gray-100 p-2 rounded overflow-x-auto">
              {htmlContent}
            </pre>
          </div>
          <div className="mt-4">
            <h4 className="text-lg font-semibold mb-2 text-gray-700">
              Raw CSS ({cssFileName}):
            </h4>
            <pre className="bg-gray-100 p-2 rounded overflow-x-auto">
              {cssContent}
            </pre>
          </div>
        </div>
      ) : (
        <p className="text-center text-gray-600">
          No content found for this bundle.
        </p>
      )}
    </div>
  );
}

export default FileDisplay;
