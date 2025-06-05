import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEnvelope, FaArrowLeft, FaLock, FaCheckCircle } from "react-icons/fa";
import { motion } from "framer-motion";

const ForgetPass = () => {
    const [email, setEmail] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError("");
        
        try {
            const response = await axios.post("http://localhost:8080/forget", { email });
            console.log("Reset password request sent:", response.data);
            setSuccess(true);
            
            // Navigate to OTP after a short delay to show success message
            setTimeout(() => {
                navigate('/otp', { state: { email } });
            }, 1500);
        } catch (error) {
            console.error("Error sending reset password request:", error);
            setError(error.response?.data?.message || "An error occurred. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    if (success) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-teal-50 to-emerald-100 p-4">
                <motion.div 
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="bg-white rounded-2xl shadow-xl overflow-hidden w-full max-w-md"
                >
                    <div className="bg-gradient-to-r from-emerald-500 to-teal-600 p-6 text-center">
                        <h1 className="text-2xl font-bold text-white">Password Reset Requested</h1>
                    </div>
                    
                    <div className="p-8 text-center">
                        <div className="flex justify-center mb-6">
                            <div className="relative">
                                <FaCheckCircle className="text-emerald-500 text-6xl" />
                                <FaLock className="absolute bottom-0 right-0 text-white bg-emerald-500 rounded-full p-1" />
                            </div>
                        </div>
                        
                        <h2 className="text-xl font-bold text-gray-800 mb-2">Check Your Email</h2>
                        <p className="text-gray-600 mb-6">
                            We've sent password reset instructions to <span className="font-semibold text-emerald-600">{email}</span>. 
                            Please check your inbox and follow the instructions.
                        </p>
                        
                        <div className="w-full bg-gray-200 rounded-full h-2 mb-6">
                            <div 
                                className="bg-emerald-500 h-2 rounded-full transition-all duration-1000 ease-linear" 
                                style={{ width: "100%" }}
                            ></div>
                        </div>
                        
                        <p className="text-sm text-gray-500">
                            Redirecting to OTP verification...
                        </p>
                    </div>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-teal-50 to-emerald-100 p-4">
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-white rounded-2xl shadow-xl overflow-hidden w-full max-w-md"
            >
                <div className="bg-gradient-to-r from-emerald-500 to-teal-600 p-6 text-center">
                    <button 
                        onClick={() => navigate(-1)} 
                        className="absolute left-6 top-6 text-white hover:text-emerald-100 transition-colors"
                    >
                        <FaArrowLeft />
                    </button>
                    <h1 className="text-2xl font-bold text-white">Reset Your Password</h1>
                    <p className="text-emerald-100 mt-2">Enter your email to reset your password</p>
                </div>
                
                <div className="p-8">
                    {error && (
                        <motion.div 
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            className="mb-4 p-3 bg-red-50 text-red-700 rounded-lg text-sm border border-red-200"
                        >
                            {error}
                        </motion.div>
                    )}
                    
                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <div className="space-y-4">
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <FaEnvelope className="text-gray-400" />
                                </div>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-gray-700"
                                    placeholder="Enter your email address"
                                    required
                                    disabled={isSubmitting}
                                />
                            </div>
                            
                            <p className="text-sm text-gray-500">
                                Enter the email address associated with your account
                            </p>
                        </div>
                        
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white ${
                                isSubmitting 
                                    ? "bg-emerald-400 cursor-not-allowed" 
                                    : "bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
                            }`}
                        >
                            {isSubmitting ? (
                                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                            ) : null}
                            {isSubmitting ? "Sending Instructions..." : "Reset Password"}
                        </button>
                    </form>
                    
                    <div className="mt-6 text-center">
                        <button
                            onClick={() => navigate('/')}
                            className="text-sm font-medium text-emerald-600 hover:text-emerald-500"
                        >
                            Remember your password? Sign in
                        </button>
                    </div>
                </div>
                
                <div className="bg-gray-50 px-6 py-4 text-center">
                    <p className="text-xs text-gray-500">
                        Need help? <a href="#" className="text-emerald-600">Contact support</a>
                    </p>
                </div>
            </motion.div>
        </div>
    );
};

export default ForgetPass;