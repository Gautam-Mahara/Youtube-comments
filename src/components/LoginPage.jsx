import React from "react";
import { useState, useEffect } from "react";
import "./cssfiles/login.css";
import { Navigate } from "react-router-dom";
import axios from "axios";

const LoginPage = () => {
    
    const handleSubmit = (e) => {
        e.preventDefault();
        const url = "http://localhost:5000/login";
        const data = {
            username: e.target.username.value,
            password: e.target.password.value,
        }

        console.log("Login");
        Navigate("/Portfolio");
        // Add your code here to handle login
    }
    return (
        <div className="flex items-center justify-center h-screen ">
            <div className="bg-gray-700 p-8 rounded-lg shadow-md w-full max-w-md">
                <h1 className="text-3xl font-semibold text-center mb-6 text-orange-500">Login</h1>
                <form className="flex flex-col">
                    <label htmlFor="username" className="text-orange-500 font-medium mb-2">Username</label>
                    <input 
                        type="text" 
                        id="username" 
                        name="username" 
                        className="p-3 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500" 
                        required 
                    />
                    <label htmlFor="password" className="text-orange-500  font-medium mb-2">Password</label>
                    <input 
                        type="password" 
                        id="password" 
                        name="password" 
                        className="p-3 border border-gray-300 rounded-lg mb-6 focus:outline-none focus:ring-2 focus:ring-blue-500" 
                        required 
                    />
                    <button 
                        onClick={handleSubmit}
                        type="submit" 
                        className="bg-gray-300 text-orange-400 font-semibold py-3 rounded-lg hover:bg-blue-700 transition duration-300 mx-auto w-fit "
                    >
                        Login
                    </button>
                </form>
                <div className="flex justify-between mt-4 text-sm text-orange-500">
                    <a href="/forgot-password" className="hover:underline">Forgot Password?</a>
                    <a href="/signup" className="hover:underline">Register</a>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
