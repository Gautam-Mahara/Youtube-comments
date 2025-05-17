import React from "react";
import "./cssfiles/login.css";

const SignupPage = () => {
    return (
        <div className="flex items-center justify-center h-screen ">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                <h1 className="text-3xl font-semibold text-center mb-6 text-gray-800">Sign Up</h1>
                <form className="flex flex-col">
                    <label htmlFor="email" className="text-gray-600 font-medium mb-2">Email</label>
                    <input 
                        type="email" 
                        id="email" 
                        name="email" 
                        className="p-3 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-green-500" 
                        required 
                    />
                    
                    <label htmlFor="name" className="text-gray-600 font-medium mb-2">Name</label>
                    <input 
                        type="text" 
                        id="name" 
                        name="name" 
                        className="p-3 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-green-500" 
                        required 
                    />

                    <label htmlFor="username" className="text-gray-600 font-medium mb-2">Username</label>
                    <input 
                        type="text" 
                        id="username" 
                        name="username" 
                        className="p-3 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-green-500" 
                        required 
                    />

                    <label htmlFor="password" className="text-gray-600 font-medium mb-2">Password</label>
                    <input 
                        type="password" 
                        id="password" 
                        name="password" 
                        className="p-3 border border-gray-300 rounded-lg mb-6 focus:outline-none focus:ring-2 focus:ring-green-500" 
                        required 
                    />

                    <button 
                        type="submit" 
                        className="bg-green-600 text-white font-semibold py-3 rounded-lg hover:bg-green-700 transition duration-300"
                    >
                        Sign Up
                    </button>
                </form>
                <div className="text-sm text-center mt-4 text-blue-600">
                    <a href="/" className="hover:underline">Already have an account? Log in</a>
                </div>
            </div>
        </div>
    );
};

export default SignupPage;
