import React from "react";
import { useState, useEffect } from "react";
import "./cssfiles/login.css";
import { Navigate } from "react-router-dom";
import axios from "axios";
import "./cssfiles/login.css"

const LoginPage = () => {
    
    // const handleSubmit = (e) => {
    //     e.preventDefault();
    //     const url = "http://localhost:5000/login";
    //     const data = {
    //         username: e.target.username.value,
    //         password: e.target.password.value,
    //     }

    //     console.log("Login");
    //     Navigate("/Portfolio");
        // Add your code here to handle login
    // }
    return (
        <div className="layer-1">
            <div className="layer-2">
                <h1 className="logo">Login</h1>
                <form className="layer-3" action="/Portfolio" method="POST">
                    <label htmlFor="username" className="">Username</label>
                    <input 
                        type="text" 
                        id="username" 
                        name="username" 
                        className="" 
                        required 
                    />
                    <label htmlFor="password" className="">Password</label>
                    <input 
                        type="password" 
                        id="password" 
                        name="password" 
                        className="" 
                        required 
                    />
                    <button 
                        // onClick={handleSubmit}
                        type="submit" 
                        className=" btn"
                    >
                        Login
                    </button>
                <div className="flex flex-col gap-2">
                    <a href="/forgot-password" className="hover:underline">Forgot Password?</a>
                    <a href="/signup" className="hover:underline">Register</a>
                </div>
                </form>
            </div>
        </div>
    );
};

export default LoginPage;
