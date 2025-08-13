import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FaEye, FaEyeSlash, FaUser, FaLock } from "react-icons/fa";
import { motion } from "framer-motion";

const LoginPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setIsLoading(true);
        
        const url = "https://backend-web-l7sk.onrender.com/signin";
        const data = { email, password };

        try {
            const result = await axios.post(url, data);
            if (result.data.token) {
                // Store token in localStorage
                // Redirect to dashboard immediately
                navigate("/dashboard");
            }
            else {
                setError("Login failed. Please check your credentials.");
                console.log("Login failed:", result.data);
                
            }
        } catch (error) {
            const errorMsg = error.response?.data?.message || 
                            error.message || 
                            "Login failed. Please try again.";
            setError(errorMsg);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-teal-50 to-emerald-100 p-4">
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-white rounded-2xl shadow-xl overflow-hidden w-full max-w-md"
            >
                {/* Decorative header */}
                <div className="bg-gradient-to-r from-emerald-500 to-teal-600 p-6 text-center">
                    <h1 className="text-3xl font-bold text-white">Welcome Back</h1>
                    <p className="text-emerald-100 mt-2">Sign in to continue your wellness journey</p>
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
                                    <FaUser className="text-gray-400" />
                                </div>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-gray-700"
                                    placeholder="Email address"
                                    required
                                    disabled={isLoading}
                                />
                            </div>
                            
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <FaLock className="text-gray-400" />
                                </div>
                                <input
                                    type={showPassword ? "text" : "password"}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-gray-700"
                                    placeholder="Password"
                                    required
                                    disabled={isLoading}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                                >
                                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                                </button>
                            </div>
                        </div>
                        
                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <input
                                    id="remember-me"
                                    name="remember-me"
                                    type="checkbox"
                                    className="h-4 w-4 text-emerald-500 focus:ring-emerald-500 border-gray-300 rounded"
                                />
                                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                                    Remember me
                                </label>
                            </div>
                            <a 
                                href="/forget-password" 
                                className="text-sm font-medium text-emerald-600 hover:text-emerald-500"
                            >
                                Forgot password?
                            </a>
                        </div>
                        
                        <button
                            type="submit"
                            disabled={isLoading}
                            className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white ${
                                isLoading 
                                    ? "bg-emerald-400 cursor-not-allowed" 
                                    : "bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
                            }`}
                        >
                            {isLoading ? (
                                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                            ) : null}
                            {isLoading ? "Signing in..." : "Sign in"}
                        </button>
                        
                        <div className="relative mt-6">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-gray-300"></div>
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="px-2 bg-white text-gray-500">Or continue with</span>
                            </div>
                        </div>
                        
                    </form>
                    
                    <p className="mt-8 text-center text-sm text-gray-600">
                        Don't have an account?{" "}
                        <a 
                            href="/signup" 
                            className="font-medium text-emerald-600 hover:text-emerald-500"
                        >
                            Register now
                        </a>
                    </p>
                </div>
                
                {/* Decorative footer */}
                <div className="bg-gray-50 px-6 py-4 text-center">
                    <p className="text-xs text-gray-500">
                        By signing in, you agree to our <a href="#" className="text-emerald-600">Terms of Service</a> and <a href="#" className="text-emerald-600">Privacy Policy</a>
                    </p>
                </div>
            </motion.div>
        </div>
    );
};

export default LoginPage;