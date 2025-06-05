import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaUser, FaEnvelope, FaKey, FaEye, FaEyeSlash, FaGoogle, FaGithub, FaCheck } from "react-icons/fa";
import { motion } from "framer-motion";

const SignupPage = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        username: "",
        password: "",
        confirmPassword: ""
    });
    const [errors, setErrors] = useState({});
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [agreedToTerms, setAgreedToTerms] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        
        // Clear error when user types
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ""
            }));
        }
    };

    const validateForm = () => {
        const newErrors = {};
        
        if (!formData.name.trim()) {
            newErrors.name = "Name is required";
        }
        
        if (!formData.email.trim()) {
            newErrors.email = "Email is required";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = "Invalid email format";
        }
        
        if (!formData.username.trim()) {
            newErrors.username = "Username is required";
        } else if (formData.username.length < 3) {
            newErrors.username = "Username must be at least 3 characters";
        }
        
        if (!formData.password) {
            newErrors.password = "Password is required";
        } else if (formData.password.length < 6) {
            newErrors.password = "Password must be at least 6 characters";
        }
        
        if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = "Passwords do not match";
        }
        
        if (!agreedToTerms) {
            newErrors.terms = "You must agree to the terms and conditions";
        }
        
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!validateForm()) return;
        
        setIsSubmitting(true);
        
        try {
            const data = {
                username: formData.username,
                name: formData.name,
                email: formData.email,
                password: formData.password
            };
            
            const response = await axios.post("http://localhost:8080/signup", data);
            
            if (response.data.email) {
                navigate('/otp', { state: { email: response.data.email } });
            }
        } catch (error) {
            const errorMessage = error.response?.data?.message || 
                                "An error occurred. Please try again.";
            setErrors(prev => ({ ...prev, form: errorMessage }));
        } finally {
            setIsSubmitting(false);
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
                    <h1 className="text-3xl font-bold text-white">Create Your Account</h1>
                    <p className="text-emerald-100 mt-2">Join our wellness community</p>
                </div>
                
                <div className="p-8">
                    {errors.form && (
                        <motion.div 
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            className="mb-4 p-3 bg-red-50 text-red-700 rounded-lg text-sm border border-red-200"
                        >
                            {errors.form}
                        </motion.div>
                    )}
                    
                    <form className="space-y-4" onSubmit={handleSubmit}>
                        {/* Name field */}
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <FaUser className="text-gray-400" />
                            </div>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                className={`w-full pl-10 pr-4 py-3 border ${
                                    errors.name ? "border-red-500" : "border-gray-300"
                                } rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-gray-700`}
                                placeholder="Full Name"
                                disabled={isSubmitting}
                            />
                            {errors.name && (
                                <p className="mt-1 text-sm text-red-600">{errors.name}</p>
                            )}
                        </div>
                        
                        {/* Email field */}
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <FaEnvelope className="text-gray-400" />
                            </div>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className={`w-full pl-10 pr-4 py-3 border ${
                                    errors.email ? "border-red-500" : "border-gray-300"
                                } rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-gray-700`}
                                placeholder="Email Address"
                                disabled={isSubmitting}
                            />
                            {errors.email && (
                                <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                            )}
                        </div>
                        
                        {/* Username field */}
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <FaUser className="text-gray-400" />
                            </div>
                            <input
                                type="text"
                                name="username"
                                value={formData.username}
                                onChange={handleChange}
                                className={`w-full pl-10 pr-4 py-3 border ${
                                    errors.username ? "border-red-500" : "border-gray-300"
                                } rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-gray-700`}
                                placeholder="Username"
                                disabled={isSubmitting}
                            />
                            {errors.username && (
                                <p className="mt-1 text-sm text-red-600">{errors.username}</p>
                            )}
                        </div>
                        
                        {/* Password field */}
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <FaKey className="text-gray-400" />
                            </div>
                            <input
                                type={showPassword ? "text" : "password"}
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                className={`w-full pl-10 pr-10 py-3 border ${
                                    errors.password ? "border-red-500" : "border-gray-300"
                                } rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-gray-700`}
                                placeholder="Password"
                                disabled={isSubmitting}
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                            >
                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                            </button>
                            {errors.password && (
                                <p className="mt-1 text-sm text-red-600">{errors.password}</p>
                            )}
                        </div>
                        
                        {/* Confirm Password field */}
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <FaKey className="text-gray-400" />
                            </div>
                            <input
                                type={showConfirmPassword ? "text" : "password"}
                                name="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                className={`w-full pl-10 pr-10 py-3 border ${
                                    errors.confirmPassword ? "border-red-500" : "border-gray-300"
                                } rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-gray-700`}
                                placeholder="Confirm Password"
                                disabled={isSubmitting}
                            />
                            <button
                                type="button"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                            >
                                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                            </button>
                            {errors.confirmPassword && (
                                <p className="mt-1 text-sm text-red-600">{errors.confirmPassword}</p>
                            )}
                        </div>
                        
                        {/* Terms and conditions */}
                        <div className="flex items-start mt-4">
                            <div className="flex items-center h-5">
                                <input
                                    id="terms"
                                    name="terms"
                                    type="checkbox"
                                    checked={agreedToTerms}
                                    onChange={() => setAgreedToTerms(!agreedToTerms)}
                                    className="focus:ring-emerald-500 h-4 w-4 text-emerald-600 border-gray-300 rounded"
                                    disabled={isSubmitting}
                                />
                            </div>
                            <div className="ml-3 text-sm">
                                <label htmlFor="terms" className="text-gray-700">
                                    I agree to the <a href="#" className="font-medium text-emerald-600 hover:text-emerald-500">Terms and Conditions</a> and <a href="#" className="font-medium text-emerald-600 hover:text-emerald-500">Privacy Policy</a>
                                </label>
                                {errors.terms && (
                                    <p className="mt-1 text-sm text-red-600">{errors.terms}</p>
                                )}
                            </div>
                        </div>
                        
                        {/* Submit button */}
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
                            {isSubmitting ? "Creating Account..." : "Sign Up"}
                        </button>
                        
                        <div className="relative mt-6">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-gray-300"></div>
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="px-2 bg-white text-gray-500">Or sign up with</span>
                            </div>
                        </div>
                        
                        
                    </form>
                    
                    <p className="mt-8 text-center text-sm text-gray-600">
                        Already have an account?{" "}
                        <a 
                            href="/login" 
                            className="font-medium text-emerald-600 hover:text-emerald-500"
                        >
                            Log in
                        </a>
                    </p>
                </div>
                
                {/* Decorative footer */}
                <div className="bg-gray-50 px-6 py-4 text-center">
                    <p className="text-xs text-gray-500">
                        By signing up, you agree to our <a href="#" className="text-emerald-600">Terms of Service</a> and <a href="#" className="text-emerald-600">Privacy Policy</a>
                    </p>
                </div>
            </motion.div>
        </div>
    );
};

export default SignupPage;