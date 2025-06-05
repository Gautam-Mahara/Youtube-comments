import React, { useState } from "react";
import { motion } from "framer-motion";
import NavBar from "./NavBar";
import Footer from "./general_components/footer";

export default function Contact() {
    const [showContacts, setShowContacts] = useState(false);
    const [formDetails, setFormDetails] = useState({ name: '', email: '', message: '' });

    const handleContactClick = () => {
        setShowContacts(true);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormDetails({
            ...formDetails,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Implement email sending logic here
        alert("Form submitted!");
    };

    return (
        <div className="min-h-screen bg-gradient-to-r from-purple-700 via-purple-900 to-black text-white flex flex-col justify-between">
            <NavBar />

            <motion.div
                className="p-5 m-5 text-center bg-purple-800 bg-opacity-70 rounded-xl shadow-lg"
                initial={{ y: -500, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1 }}
            >
                <div className="sm:h-48 sm:overflow-y-scroll sm:pr-4 p-5 bg-purple-700 bg-opacity-70 rounded-xl">
                    <p className="text-xl font-semibold leading-relaxed">
                        Hello! I'm currently in my final year studying software engineering, deeply engaged in developing practical solutions and refining my skills. Whether you're interested in discussing my latest projects, exploring collaboration opportunities, or simply want to connect, I'm available through the following channels:
                    </p>
                </div>
            </motion.div>

            {!showContacts && (
                <motion.div
                    className="p-5 m-5 text-center bg-purple-800 bg-opacity-70 rounded-xl shadow-lg"
                    initial={{ y: -500, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 1 }}
                >
                    <div className="flex justify-center">
                        <button
                            type="button"
                            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 transition-all"
                            onClick={handleContactClick}
                        >
                            Contact Me
                        </button>
                    </div>
                </motion.div>
            )}

            {showContacts && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 p-5 bg-purple-700 bg-opacity-70 m-5 rounded-xl">
                    <motion.div
                        className="grid grid-cols-2 gap-8"
                        whileHover={{ scale: 1.05 }}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1 }}
                    >
                        <a
                            href="mailto:gautam.gs712@gmail.com"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <img
                                src="Email.png"  // Replace with actual path or URL
                                alt="Email"
                                className="block mx-auto w-22 h-22 pt-8 transition-transform transform hover:scale-110"
                            />
                        </a>
                        <a
                            href="https://www.linkedin.com/in/gautam-singh-613648223/"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <img
                                src="LinkedIn.png"  // Replace with actual path or URL
                                alt="LinkedIn"
                                className="block mx-auto w-22 h-22 pt-8 transition-transform transform hover:scale-110"
                            />
                        </a>
                        <a
                            href="https://github.com/Gautam0612"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <img
                                src="Github.png"  // Replace with actual path or URL
                                alt="GitHub"
                                className="block mx-auto w-22 h-22 pt-8 transition-transform transform hover:scale-110"
                            />
                        </a>
                        <a
                            href="https://www.instagram.com/your-instagram"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <img
                                src="Insta.jpeg"  // Replace with actual path or URL
                                alt="Instagram"
                                className="block mx-auto w-22 h-22 pt-8 transition-transform transform hover:scale-110"
                            />
                        </a>
                    </motion.div>

                    <motion.div
                        className="text-xl font-semibold bg-purple-700 bg-opacity-70 rounded-xl leading-relaxed p-5 text-center mb-5 shadow-lg"
                        whileHover={{ scale: 1.05 }}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1 }}
                    >
                        <h2 className="text-2xl font-semibold mb-5">Send me a message</h2>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="mb-4">
                                <label className="block text-left text-white text-sm font-bold mb-2" htmlFor="name">Name</label>
                                <input
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
                                    id="name"
                                    type="text"
                                    name="name"
                                    value={formDetails.name}
                                    onChange={handleChange}
                                    placeholder="Your Name"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-left text-white text-sm font-bold mb-2" htmlFor="email">Email</label>
                                <input
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
                                    id="email"
                                    type="email"
                                    name="email"
                                    value={formDetails.email}
                                    onChange={handleChange}
                                    placeholder="Your Email"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-left text-white text-sm font-bold mb-2" htmlFor="message">Message</label>
                                <textarea
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
                                    id="message"
                                    name="message"
                                    value={formDetails.message}
                                    onChange={handleChange}
                                    placeholder="Your Message"
                                />
                            </div>
                            <button
                                type="submit"
                                className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-green-600 dark:hover:bg-green-700 focus:outline-none dark:focus:ring-green-800 transition-all"
                            >
                                Submit
                            </button>
                        </form>
                    </motion.div>
                </div>
            )}
            <Footer />
        </div>
    );
}
