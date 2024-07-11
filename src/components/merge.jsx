import React, { useState } from 'react';
import { PDFDocument } from 'pdf-lib';
import NavBar from './NavBar';
import Footer from './footer';

const MergePDF = () => {
    const [fileList, setFileList] = useState([]);
    const [mergedPDF, setMergedPDF] = useState(null);

    const handleFileChange = (e, index) => {
        const files = Array.from(e.target.files);
        const updatedFileList = [...fileList];
        updatedFileList[index] = files[0]; // Assuming only one file is selected per input
        setFileList(updatedFileList);
    };

    const handleMerge = async () => {
        try {
            const pdfDoc = await PDFDocument.create();

            // Use Promise.all to handle asynchronous operations concurrently
            await Promise.all(fileList.map(async (file) => {
                const pdfBytes = await file.arrayBuffer(); // Read file as ArrayBuffer
                const tempDoc = await PDFDocument.load(pdfBytes);
                const copiedPages = await pdfDoc.copyPages(tempDoc, tempDoc.getPageIndices());
                copiedPages.forEach((page) => pdfDoc.addPage(page));
            }));

            const mergedPdfBytes = await pdfDoc.save();
            setMergedPDF(new Blob([mergedPdfBytes], { type: 'application/pdf' }));

        } catch (error) {
            console.error('Error merging PDFs:', error);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-r from-gray-900 via-gray-700 to-black text-white flex flex-col justify-between">
            <NavBar />
            <div className='bg-gray-800 m-5 p-5'>
                <div className='flex flex-row justify-around m-2 p-2'>

                <div >
                    <input type="file" onChange={(e) => handleFileChange(e, 0)} className="bg-gray-700 text-white p-2 rounded-md" />
                </div>
                <div>
                    <input type="file" onChange={(e) => handleFileChange(e, 1)} className="bg-gray-700 text-white p-2 rounded-md" />
                </div>
                </div>
                
                <div className="col-span-2 flex  justify-center m-5 p-5">
                    <button onClick={handleMerge} className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md">
                        Merge PDFs
                    </button>
                </div>
                {mergedPDF && (
                    <div className="">
                        <a href={URL.createObjectURL(mergedPDF)} download="merged.pdf" className="text-blue-400 text-center font-bold underline text-xl hover:text-blue-300 block mt-2 m-auto">
                            Download Merged PDF
                        </a>
                    </div>
                )}
            </div>
            <Footer />

        </div>
    );
};

export default MergePDF;
