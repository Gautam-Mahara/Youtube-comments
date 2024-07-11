import React from "react";
import { motion } from "framer-motion";
import NavBar from "./NavBar";
import "./pdf.css"
import Footer from "./footer";

export default function PdfHome() {
    return (
        <div className="min-h-screen bg-gradient-to-r from-gray-900 via-gray-700 to-black text-white flex flex-col justify-between">
            <NavBar />
            <div className="bg-slate-500 m-5 p-5 rounded-xl">

                <h1 className="text-center text-indigo-400 text-3xl m-auto p-3 rounded-lg underline mt-2 font-bold custom-animate-bounce">PDF Home</h1>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 2 }}
                >
                    <br />
                    <ul className="text-center  grid grid-flow-row grid-cols-2 gap-8 m-5 ">
                        <li className="bg-pink-200 text-indigo-400 m-auto p-5 rounded-lg font-semibold  hover:underline text-xl"> <a href="/merge">PDF Editor </a></li>
                        <li className="bg-pink-200 text-indigo-400 m-auto p-5 rounded-lg font-semibold  hover:underline text-xl"> <a href="/pdftoword">PDF To WORD </a></li>
                        <li className="bg-pink-200 text-indigo-400 m-auto p-5 rounded-lg font-semibold  hover:underline text-xl"> <a href="/pdftoimg">PDF To IMAGE </a></li>
                        <li className="bg-pink-200 text-indigo-400 m-auto p-5 rounded-lg font-semibold  hover:underline text-xl"> <a href="/imgtopdf">IMG To PDF </a></li>
                    </ul>
                    <br />
                </motion.div>
            </div>
            <Footer />
        </div>

    );
}