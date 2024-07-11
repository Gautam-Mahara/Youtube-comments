import React, { useState } from "react";
import NavBar from "./NavBar";
import Footer from "./footer";
import * as pdfjsLib from "pdfjs-dist/webpack";

pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.js`;

export default function PdfToImage() {
    const [file, setFile] = useState(null);
    const [images, setImages] = useState([]);
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
        setImages([]);

        const reader = new FileReader();
        reader.readAsArrayBuffer(file);

        reader.onload = async () => {
            const arrayBuffer = reader.result;
            const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
            const numPages = pdf.numPages;
            const imagePromises = [];

            for (let pageNumber = 1; pageNumber <= numPages; pageNumber++) {
                const page = await pdf.getPage(pageNumber);
                const viewport = page.getViewport({ scale: 2 });
                const canvas = document.createElement("canvas");
                const context = canvas.getContext("2d");
                canvas.height = viewport.height;
                canvas.width = viewport.width;

                const renderContext = {
                    canvasContext: context,
                    viewport: viewport,
                };

                const renderTask = page.render(renderContext);
                imagePromises.push(renderTask.promise.then(() => canvas.toDataURL("image/jpeg")));
            }

            Promise.all(imagePromises).then((imageDataUrls) => {
                setImages(imageDataUrls);
                setLoading(false);
            });
        };

        reader.onerror = () => {
            console.error("Error reading file:", reader.error);
            alert("Error reading file. Please try again.");
            setLoading(false);
        };
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
                        disabled={!file || loading}
                    >
                        {loading ? "Converting..." : "Convert"}
                    </button>
                </div>
                {images.length > 0 && (
                    <div className="m-auto pt-3 bg-gray-500">
                        <h2 className="text-xl font-semibold mb-4">Converted Images:</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                            {images.map((imgSrc, index) => (
                                <img key={index} src={imgSrc} alt={`Page ${index + 1}`} className="rounded-lg" />
                            ))}
                        </div>
                    </div>
                )}
            </div>
            <Footer />
        </div>
    );
}
