import React, { useState } from "react";
import { PDFDocument, rgb } from "pdf-lib";
import { saveAs } from "file-saver";
import NavBar from "./NavBar";
import Footer from "./footer";

export default function ImageToPdf() {
    const [files, setFiles] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleFileChange = (event) => {
        setFiles([...event.target.files]);
    };

    const handleConvert = async () => {
        if (files.length === 0) {
            alert("Please select files first.");
            return;
        }

        setLoading(true);

        const pdfDoc = await PDFDocument.create();
        const imagePromises = files.map(async (file) => {
            const reader = new FileReader();
            reader.readAsArrayBuffer(file);

            return new Promise((resolve, reject) => {
                reader.onload = async () => {
                    const arrayBuffer = reader.result;
                    let image;
                    if (file.type === "image/jpeg") {
                        image = await pdfDoc.embedJpg(arrayBuffer);
                    } else if (file.type === "image/png") {
                        image = await pdfDoc.embedPng(arrayBuffer);
                    }
                    const { width, height } = image.scale(1);
                    const page = pdfDoc.addPage([width, height]);
                    page.drawImage(image, {
                        x: 0,
                        y: 0,
                        width,
                        height,
                    });
                    resolve();
                };
                reader.onerror = () => {
                    reject(reader.error);
                };
            });
        });

        try {
            await Promise.all(imagePromises);
            const pdfBytes = await pdfDoc.save();
            const blob = new Blob([pdfBytes], { type: "application/pdf" });
            saveAs(blob, "converted.pdf");
        } catch (error) {
            console.error("Error converting files:", error);
            alert("Error converting files. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-r from-gray-900 via-gray-700 to-black text-white flex flex-col justify-between">
            <NavBar />
            <div className="bg-slate-500 rounded-xl flex flex-col m-5 p-5 justify-between">
                <div className="m-auto">
                    <input type="file" multiple accept="image/*" onChange={handleFileChange} />
                </div>
                <div className="m-auto pt-3 bg-gray-500">
                    <button
                        className="bg-blue-400 text-white p-5 rounded-lg font-semibold hover:underline text-xl"
                        onClick={handleConvert}
                        disabled={files.length === 0 || loading}
                    >
                        {loading ? "Converting..." : "Convert"}
                    </button>
                </div>
            </div>
            <Footer />
        </div>
    );
}
