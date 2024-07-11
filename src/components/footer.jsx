import React from "react";

export default function Footer() {
    return (
        <footer className="bg-gray-800 p-6 text-center rounded-lg shadow-lg m-5">
            <p className="text-gray-400">© 2024 Gautam Singh Mahara. All rights reserved.</p>
            <div className="flex justify-center space-x-4 mt-3">
                <a href="https://github.com/gautam0612" className="text-indigo-400 hover:text-indigo-300">GitHub</a>
                <a href="https://www.linkedin.com/in/gautam0612/" className="text-indigo-400 hover:text-indigo-300">LinkedIn</a>
                <a href="/insta" className="text-indigo-400 hover:text-indigo-300">Instagram</a>
            </div>
        </footer>
    )
}