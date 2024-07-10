import React, { useState } from "react";
import { motion } from "framer-motion";
import NavBar from "./NavBar";

export default function YoutubeAnalyzer() {
    const [url, setUrl] = useState('');
    const [comments, setComments] = useState({});
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        setUrl(e.target.value);
    };

    const onSubmitbtn = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        try {
            const response = await fetch('https://youtube-comments-backend.onrender.com/analyze', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ url })
            });
            if (response.ok) {
                const data = await response.json();
                setComments(data);
                console.log("Response Data:", data);
            } else {
                throw new Error('Something went wrong');
            }
        } catch (err) {
            setError(err.message);
        }
        setLoading(false);
    };

    return (
        <div className="min-h-screen bg-gradient-to-r from-gray-900 via-gray-700 to-black text-white flex flex-col justify-between">
            <NavBar />
            <motion.div
                className="p-8 m-5 bg-gray-800 bg-opacity-70 rounded-lg shadow-lg sticky top-0"
                initial={{ opacity: 0 }}
                whileHover={{ scale: 1.01 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 2 }}
            >
                <div className="text-white-200 text-center leading-relaxed font-bold">
                    <h1 className="text-indigo-400">YouTube Sentiment Analyzer</h1>
                    <br />
                    <p>This is a project where you can analyze the sentiment of YouTube comments. You can check whether the comment is positive, negative, or neutral.</p>
                    <br />
                    <h2 className="underline text-indigo-400 hover:text-xl"><a href="https://gautam0612/login">GitHub Link</a></h2>
                </div>
            </motion.div>
            <motion.div
                className="bg-gray-800 bg-opacity-70 rounded-lg shadow-lg m-5 p-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 2 }}
            >
                {/* Area for taking input  large text area */}
                <div className="text-center text-white-200 flex flex-col leading-relaxed p-2 m-5">
                    <label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your message</label>
                    <textarea
                        id="message"
                        value={url}
                        onChange={handleChange}
                        rows="4"
                        className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Write your thoughts here..."
                    ></textarea>
                    <button className="bg-indigo-400 px-4 py-2 mt-4 mx-auto rounded-lg text-sm" onClick={onSubmitbtn}>
                        {loading ? "Analyzing..." : "Analyze"}
                    </button>
                </div>
            </motion.div>
            <motion.div
                className="bg-gray-800 bg-opacity-70 rounded-lg shadow-lg m-5 p-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 2 }}
            >
                {loading && <p className="text-center">Loading...</p>}
                {error && <p className="text-center text-red-500">{error}</p>}
                {!loading && !error && comments.Title && (
                    <div>
                        <h2 className="text-center text-indigo-400 mb-4">Analysis Results</h2>
                        <div className="text-center mb-4">
                            <p><strong>Title:</strong> {comments.Title}</p>
                            <p><strong>Author:</strong> {comments.Author}</p>
                            <p><strong>Duration:</strong> {comments.Duration}</p>
                            <p><strong>Likes:</strong> {comments.Likes}</p>
                            <p><strong>Dislikes:</strong> {comments.Dislikes}</p>
                            <p><strong>ViewCount:</strong> {comments.ViewCount}</p>
                            <p><strong>Rating:</strong> {comments.Rating}</p>
                            <p><strong>Sentiment of Comments:</strong> {comments.Sentiment_of_Comments}</p>
                            <p><strong>Top Comments Percentage:</strong> {comments.Top_Comments_Percentage}</p>
                        </div>
                        <h3 className="text-center text-indigo-400 mb-4">Top Comments</h3>
                        <ul className="list-disc list-inside mx-auto text-center">
                            {comments.Top_Comments.map((comment, index) => (
                                <li key={index} className="mb-2">{comment}</li>
                            ))}
                        </ul>
                    </div>
                )}
            </motion.div>
        </div>
    );
}
