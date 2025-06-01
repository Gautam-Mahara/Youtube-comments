import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./cssfiles/login.css";

const LoginPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent form from reloading the page
        const url = "http://localhost:8080/signin";
        const data = {
            email: email,
            password: password
        };

        try {
            const result = await axios.post(url, data);
            console.log("Login successful:", result.data);
            if(result.data.token)
                {
                    navigate("/mindwell")
                } // Navigate on successful logint
        } catch (error) {
            console.error("Login failed:", error.response?.data || error.message);
        }
    };

    return (
        <div className="layer-1">
            <div className="layer-2">
                <h1 className="logo">Login</h1>
                <form className="layer-3" onSubmit={handleSubmit}>
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <button type="submit" className="btn">
                        Login
                    </button>
                    <div className="flex flex-col gap-2">
                        <a href="/forget-password" className="hover:underline">Forgot Password?</a>
                        <a href="/signup" className="hover:underline">Register</a>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default LoginPage;
