import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { FaLock, FaEye, FaEyeSlash, FaCheckCircle } from "react-icons/fa";
import { motion } from "framer-motion";

export const PasswordUpdate = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const token = location.state?.token;
    const email = location.state?.email;
    
    const [formData, setFormData] = useState({
        newPassword: "",
        confirmPassword: ""
    });
    const [errors, setErrors] = useState({});
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [success, setSuccess] = useState(false);
    const [passwordStrength, setPasswordStrength] = useState(0);

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
        
        // Calculate password strength for newPassword
        if (name === "newPassword") {
            calculatePasswordStrength(value);
        }
    };
    
    const calculatePasswordStrength = (password) => {
        let strength = 0;
        
        // Length check
        if (password.length >= 8) strength += 1;
        if (password.length >= 12) strength += 1;
        
        // Character diversity
        if (/[A-Z]/.test(password)) strength += 1;
        if (/[a-z]/.test(password)) strength += 1;
        if (/[0-9]/.test(password)) strength += 1;
        if (/[^A-Za-z0-9]/.test(password)) strength += 1;
        
        setPasswordStrength(strength);
    };

    const validateForm = () => {
        const newErrors = {};
        
        if (!formData.newPassword) {
            newErrors.newPassword = "Password is required";
        } else if (formData.newPassword.length < 8) {
            newErrors.newPassword = "Password must be at least 8 characters";
        }
        
        if (!formData.confirmPassword) {
            newErrors.confirmPassword = "Please confirm your password";
        } else if (formData.newPassword !== formData.confirmPassword) {
            newErrors.confirmPassword = "Passwords do not match";
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
                email: email,
                newPassword: formData.newPassword,
                token: token
            };
            
            const result = await axios.post("http://localhost:8080/update-password", data);
            
            if (result.data.message === "Password updated successfully") {
                setSuccess(true);
                setTimeout(() => {
                    navigate('/login');
                }, 2000);
            } else {
                setErrors({ form: result.data.message || "Something went wrong" });
            }
        } catch (error) {
            setErrors({ 
                form: error.response?.data?.message || 
                      "Failed to update password. Please try again." 
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    const getPasswordStrengthText = () => {
        if (passwordStrength === 0) return "";
        if (passwordStrength <= 2) return "Weak";
        if (passwordStrength <= 4) return "Medium";
        return "Strong";
    };
    
    const getPasswordStrengthColor = () => {
        if (passwordStrength === 0) return "bg-gray-200";
        if (passwordStrength <= 2) return "bg-red-500";
        if (passwordStrength <= 4) return "bg-yellow-500";
        return "bg-green-500";
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
                        <h1 className="text-2xl font-bold text-white">Password Updated</h1>
                    </div>
                    
                    <div className="p-8 text-center">
                        <div className="flex justify-center mb-6">
                            <div className="relative">
                                <FaCheckCircle className="text-emerald-500 text-6xl" />
                                <FaLock className="absolute bottom-0 right-0 text-white bg-emerald-500 rounded-full p-1" />
                            </div>
                        </div>
                        
                        <h2 className="text-xl font-bold text-gray-800 mb-2">Success!</h2>
                        <p className="text-gray-600 mb-6">
                            Your password has been updated successfully. You can now sign in with your new password.
                        </p>
                        
                        <div className="w-full bg-gray-200 rounded-full h-2 mb-6">
                            <div 
                                className="bg-emerald-500 h-2 rounded-full transition-all duration-1000 ease-linear" 
                                style={{ width: "100%" }}
                            ></div>
                        </div>
                        
                        <p className="text-sm text-gray-500">
                            Redirecting to login page...
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
                    <h1 className="text-2xl font-bold text-white">Update Your Password</h1>
                    <p className="text-emerald-100 mt-2">Create a new secure password</p>
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
                    
                    <div className="text-center mb-6">
                        <p className="text-gray-600">
                            Updating password for <br />
                            <span className="font-semibold text-emerald-600">{email}</span>
                        </p>
                    </div>
                    
                    <form className="space-y-6" onSubmit={handleSubmit}>
                        {/* New Password */}
                        <div className="space-y-2">
                            <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700">
                                New Password
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <FaLock className="text-gray-400" />
                                </div>
                                <input
                                    type={showPassword ? "text" : "password"}
                                    id="newPassword"
                                    name="newPassword"
                                    value={formData.newPassword}
                                    onChange={handleChange}
                                    className={`w-full pl-10 pr-10 py-3 border ${
                                        errors.newPassword ? "border-red-500" : "border-gray-300"
                                    } rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-gray-700`}
                                    placeholder="Enter new password"
                                    disabled={isSubmitting}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                                >
                                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                                </button>
                            </div>
                            {errors.newPassword && (
                                <p className="mt-1 text-sm text-red-600">{errors.newPassword}</p>
                            )}
                            
                            {/* Password Strength Indicator */}
                            {formData.newPassword && (
                                <div className="space-y-2">
                                    <div className="flex justify-between text-xs text-gray-500">
                                        <span>Password Strength:</span>
                                        <span className="font-medium">{getPasswordStrengthText()}</span>
                                    </div>
                                    <div className="w-full bg-gray-200 rounded-full h-2">
                                        <div 
                                            className={`h-2 rounded-full ${getPasswordStrengthColor()}`} 
                                            style={{ width: `${(passwordStrength / 6) * 100}%` }}
                                        ></div>
                                    </div>
                                </div>
                            )}
                        </div>
                        
                        {/* Confirm Password */}
                        <div className="space-y-2">
                            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                                Confirm Password
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <FaLock className="text-gray-400" />
                                </div>
                                <input
                                    type={showConfirmPassword ? "text" : "password"}
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    className={`w-full pl-10 pr-10 py-3 border ${
                                        errors.confirmPassword ? "border-red-500" : "border-gray-300"
                                    } rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-gray-700`}
                                    placeholder="Confirm your new password"
                                    disabled={isSubmitting}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                                >
                                    {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                                </button>
                            </div>
                            {errors.confirmPassword && (
                                <p className="mt-1 text-sm text-red-600">{errors.confirmPassword}</p>
                            )}
                        </div>
                        
                        {/* Password Requirements */}
                        <div className="bg-gray-50 p-4 rounded-lg">
                            <p className="text-sm font-medium text-gray-700 mb-2">Password Requirements:</p>
                            <ul className="text-xs text-gray-600 space-y-1">
                                <li className={`flex items-center ${formData.newPassword.length >= 8 ? 'text-emerald-600' : ''}`}>
                                    <FaCheckCircle className="mr-2 text-xs" />
                                    At least 8 characters
                                </li>
                                <li className={`flex items-center ${/[A-Z]/.test(formData.newPassword) ? 'text-emerald-600' : ''}`}>
                                    <FaCheckCircle className="mr-2 text-xs" />
                                    At least one uppercase letter
                                </li>
                                <li className={`flex items-center ${/[a-z]/.test(formData.newPassword) ? 'text-emerald-600' : ''}`}>
                                    <FaCheckCircle className="mr-2 text-xs" />
                                    At least one lowercase letter
                                </li>
                                <li className={`flex items-center ${/[0-9]/.test(formData.newPassword) ? 'text-emerald-600' : ''}`}>
                                    <FaCheckCircle className="mr-2 text-xs" />
                                    At least one number
                                </li>
                                <li className={`flex items-center ${/[^A-Za-z0-9]/.test(formData.newPassword) ? 'text-emerald-600' : ''}`}>
                                    <FaCheckCircle className="mr-2 text-xs" />
                                    At least one special character
                                </li>
                            </ul>
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
                            {isSubmitting ? "Updating..." : "Update Password"}
                        </button>
                    </form>
                </div>
            </motion.div>
        </div>
    );
};