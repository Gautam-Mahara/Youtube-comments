import React, { useState } from "react";
import axios from "axios";
import NavBar from "./NavBar";
import Footer from "./footer";
import "./pdf.css"

export default function PdfToWord() {
    const [file, setFile] = useState(null);
    const [convertedFileUrl, setConvertedFileUrl] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    const handleConvert = async () => {
        if (!file) {
            alert("Please select a file first.");
            return;
        }

        setLoading(true);
        const formData = new FormData();
        formData.append("file", file);

        try {
            const response = await axios.post("http://127.0.0.1:5000/pdf-to-word", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
                responseType: "blob", // Ensure response is treated as a blob
            });

            // Create a Blob from the response data
            const convertedFileBlob = new Blob([response.data], { type: "application/msword" });

            // Generate a temporary URL for the blob
            const convertedFileUrl = URL.createObjectURL(convertedFileBlob);

            // Update state with the URL of the converted file
            setConvertedFileUrl(convertedFileUrl);
        } catch (error) {
            console.error("Error converting file:", error);
            alert("Error converting file. Please try again.");
        } finally {
            setLoading(false);
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
                        className={`bg-blue-400 text-white p-5 rounded-lg font-semibold hover:underline text-xl ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                        onClick={handleConvert}
                        disabled={loading || !file}
                    >
                        {loading ? "Converting..." : "Convert"}
                    </button>
                </div>
            </div>
            {convertedFileUrl && (
                <div className="bg-slate-500 rounded-xl flex flex-col m-5 p-5 justify-between text-center text-xl underline ">
                    <a href={convertedFileUrl} target="_blank" rel="noopener noreferrer" className="text-blue-400 underline custom-animate-bounce">
                        Download Converted File
                    </a>
                </div>
            )}
            <Footer />
        </div>
    );
}
