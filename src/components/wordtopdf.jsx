import React, { useState } from "react";
import axios from "axios";
import NavBar from "./NavBar";
import Footer from "./footer";

export default function WordToPdf() {
  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleConvert = async () => {
    if (!file) {
      alert("Please select a file first.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post("http://localhost:5000/word-to-pdf", formData, {
        responseType: "blob", // Ensure response type is blob to handle binary data
      });

      // Create a blob object from the response data
      const pdfBlob = new Blob([response.data], { type: "application/pdf" });

      // Create a download link element
      const url = window.URL.createObjectURL(pdfBlob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `${file.name}.pdf`);
      document.body.appendChild(link);

      // Trigger the download
      link.click();

      // Clean up
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);

      // Optional: Inform user about successful conversion
      alert("File converted successfully!");
    } catch (error) {
      console.error("Error converting file:", error);
      alert("Error converting file. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-900 via-gray-700 to-black text-white flex flex-col justify-between">
      <NavBar />
      <div className="bg-slate-500 rounded-xl flex flex-col m-5 p-5 justify-between">
        <div className="m-auto">
          <input type="file" onChange={handleFileChange} />
        </div>
        <div className="m-auto pt-3 bg-gray-500">
          <button
            className="bg-blue-400 text-white p-5 rounded-lg font-semibold hover:underline text-xl"
            onClick={handleConvert}
            disabled={!file}
          >
            Convert to PDF
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
}
