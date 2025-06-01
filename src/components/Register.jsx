import React, { useState } from "react";
import "./cssfiles/login.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SignupPage = () => {

    const [email , setEmail] = useState("");
    const [name,setName] = useState("");
    const [username, setUsername] = useState("");
    const [password,setPassword] = useState("");
    const navigate = useNavigate();
    const handleSubmit = async(e)=>{
            e.preventDefault(); // Prevent form from reloading the page
            const data = {
                username : username,
                name: name,
                email:email,
                password:password
            };
            const url = "http://localhost:8080/signup";
            try {
                const result = await axios.post(url , data);
                console.log(result.data);
                // if(result.data.email) {
                    navigate('/mindwell'); // Navigate to the mindwell page on successful signup
                // }
            } catch (error) {
                console.log(error);
                
            }
    }
    return (
        <div className="flex items-center justify-center h-screen ">
            <div className="inner p-8 rounded-lg shadow-md w-full max-w-md">
                <h1 className="text-3xl font-semibold text-center mb-6 text-gray-800">Sign Up</h1>
                <form className="flex flex-col" onSubmit={handleSubmit}>
                    <label htmlFor="email" className="text-gray-600 font-medium mb-2">Email</label>
                    <input 
                        type="email" 
                        id="email" 
                        name="email" 
                        onChange={(e)=> setEmail(e.target.value)}
                        className="p-3 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-green-500" 
                        required 
                    />
                    
                    <label htmlFor="name" className="text-gray-600 font-medium mb-2">Name</label>
                    <input 
                        type="text" 
                        id="name" 
                        name="name" 
                        onChange={(e)=> setName(e.target.value)}
                        className="p-3 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-green-500" 
                        required 
                    />

                    <label htmlFor="username" className="text-gray-600 font-medium mb-2">Username</label>
                    <input 
                        type="text" 
                        id="username" 
                        name="username" 
                        onChange={(e)=> setUsername(e.target.value)}
                        className="p-3 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-green-500" 
                        required 
                    />

                    <label htmlFor="password" className="text-gray-600 font-medium mb-2">Password</label>
                    <input 
                        type="password" 
                        id="password" 
                        name="password" 
                        onChange={(e) => setPassword(e.target.value)}
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
