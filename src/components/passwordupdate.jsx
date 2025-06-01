import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

export const PasswordUpdate = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const token = location.state?.token;
    const email = location.state?.email;
    // console.log("Token:", token);
    
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (newPassword !== confirmPassword) {
            alert("Passwords do not match");
            return;
        }

        const data = {
            email: email,
            newPassword: newPassword,
            token: token
        };

        try {
            const result = await axios.post("http://localhost:8080/update-password", data);
            if (result.data.message === "Password updated successfully") {
                alert("Password updated successfully");
                navigate('/login');
            } else {
                alert(result.data.message || "Something went wrong");
                console.error("Error updating password:", result.data.message);
            }
        } catch (error) {
            console.error("Error updating password:", error);
            alert("Failed to update password. Please try again.");
        }
    };

    return (
        <div className="flex items-center justify-center h-screen">
            <div className="inner p-8 rounded-lg shadow-md w-full max-w-md">
                <h1 className="text-3xl font-semibold text-center mb-6 text-gray-800">Update Password</h1>
                <form className="flex flex-col" onSubmit={handleSubmit}>
                    <label htmlFor="newPassword" className="text-gray-600 font-medium mb-2">New Password</label>
                    <input 
                        type="password" 
                        id="newPassword" 
                        name="newPassword" 
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        className="p-3 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-green-500" 
                        required 
                    />
                    <label htmlFor="confirmPassword" className="text-gray-600 font-medium mb-2">Confirm Password</label>
                    <input 
                        type="password" 
                        id="confirmPassword" 
                        name="confirmPassword" 
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="p-3 border border-gray-300 rounded-lg mb-6 focus:outline-none focus:ring-2 focus:ring-green-500" 
                        required
                    />
                    <button type="submit" className="btn bg-green-500 text-white p-3 rounded-lg hover:bg-green-600 transition duration-200">
                        Update Password
                    </button>
                </form>
            </div>
        </div>
    );
};
