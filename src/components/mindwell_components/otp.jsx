import React, { useState, useEffect, useRef } from "react";  
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { FaLock, FaArrowLeft, FaRedo, FaCheckCircle } from "react-icons/fa";
import { motion } from "framer-motion";

const Otp = () => {
    const location = useLocation();
    const email = location.state?.email;
    const [otp, setOtp] = useState(["", "", "", "", "", ""]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);
    const [countdown, setCountdown] = useState(30);
    const [resendDisabled, setResendDisabled] = useState(true);
    const navigate = useNavigate();
    const inputRefs = useRef([]);

    useEffect(() => {
        const timer = countdown > 0 && setInterval(() => {
            setCountdown(countdown - 1);
        }, 1000);
        
        if (countdown === 0) {
            setResendDisabled(false);
        }
        
        return () => clearInterval(timer);
    }, [countdown]);

    const handleInputChange = (index, value) => {
        // Only allow numbers and limit to one character
        if (/^\d*$/.test(value) && value.length <= 1) {
            const newOtp = [...otp];
            newOtp[index] = value;
            setOtp(newOtp);
            
            // Auto focus to next input
            if (value && index < 5) {
                inputRefs.current[index + 1].focus();
            }
        }
    };

    const handleKeyDown = (index, e) => {
        // Handle backspace to move to previous input
        if (e.key === "Backspace" && !otp[index] && index > 0) {
            inputRefs.current[index - 1].focus();
        }
    };

    const handlePaste = (e) => {
        e.preventDefault();
        const pasteData = e.clipboardData.getData("text/plain").trim();
        if (/^\d{6}$/.test(pasteData)) {
            const pasteArray = pasteData.split("");
            const newOtp = [...otp];
            for (let i = 0; i < 6; i++) {
                if (i < pasteArray.length) {
                    newOtp[i] = pasteArray[i];
                }
            }
            setOtp(newOtp);
            inputRefs.current[5].focus();
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError("");
        
        const otpString = otp.join("");
        if (otpString.length !== 6) {
            setError("Please enter a 6-digit OTP");
            setIsSubmitting(false);
            return;
        }
        
        try {
            const response = await axios.post("http://localhost:8080/verify", {
                otp: otpString,
                email: email
            });
            
            if (response.data.token) {
                setSuccess(true);
                setTimeout(() => {
                    if (response.data.type === "signup") {
                        navigate('/mindwell');
                    } else {
                        navigate('/passwordupdate', { 
                            state: { token: response.data.token, email: email } 
                        });
                    }
                }, 1500);
            }
        } catch (error) {
            console.error("Error verifying OTP:", error);
            setError(error.response?.data?.message || "Invalid OTP. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleResendOtp = async () => {
        setResendDisabled(true);
        setCountdown(30);
        setError("");
        
        try {
            await axios.post("http://localhost:8080/resend-otp", { email });
        } catch (error) {
            setError("Failed to resend OTP. Please try again.");
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
                        <h1 className="text-2xl font-bold text-white">OTP Verified!</h1>
                    </div>
                    
                    <div className="p-8 text-center">
                        <div className="flex justify-center mb-6">
                            <div className="relative">
                                <FaCheckCircle className="text-emerald-500 text-6xl" />
                                <FaLock className="absolute bottom-0 right-0 text-white bg-emerald-500 rounded-full p-1" />
                            </div>
                        </div>
                        
                        <h2 className="text-xl font-bold text-gray-800 mb-2">Verification Successful</h2>
                        <p className="text-gray-600 mb-6">
                            Your email <span className="font-semibold text-emerald-600">{email}</span> has been successfully verified.
                        </p>
                        
                        <div className="w-full bg-gray-200 rounded-full h-2 mb-6">
                            <div 
                                className="bg-emerald-500 h-2 rounded-full transition-all duration-1000 ease-linear" 
                                style={{ width: "100%" }}
                            ></div>
                        </div>
                        
                        <p className="text-sm text-gray-500">
                            Redirecting to next step...
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
                    <h1 className="text-2xl font-bold text-white">Verify Your Email</h1>
                    <p className="text-emerald-100 mt-2">Enter the OTP sent to your email</p>
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
                    
                    <div className="text-center mb-6">
                        <p className="text-gray-600">
                            We've sent a 6-digit code to <br />
                            <span className="font-semibold text-emerald-600">{email}</span>
                        </p>
                    </div>
                    
                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <div className="flex justify-center space-x-3">
                            {otp.map((digit, index) => (
                                <input
                                    key={index}
                                    ref={(el) => (inputRefs.current[index] = el)}
                                    type="text"
                                    inputMode="numeric"
                                    pattern="[0-9]*"
                                    maxLength={1}
                                    value={digit}
                                    onChange={(e) => handleInputChange(index, e.target.value)}
                                    onKeyDown={(e) => handleKeyDown(index, e)}
                                    onPaste={handlePaste}
                                    className="w-12 h-12 text-center text-2xl border-2 border-gray-300 rounded-lg focus:border-emerald-500 focus:ring-2 focus:ring-emerald-300 outline-none"
                                    autoFocus={index === 0}
                                    disabled={isSubmitting}
                                />
                            ))}
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
                            {isSubmitting ? "Verifying..." : "Verify OTP"}
                        </button>
                        
                        <div className="flex justify-center items-center mt-4">
                            <button
                                type="button"
                                onClick={handleResendOtp}
                                disabled={resendDisabled || isSubmitting}
                                className={`flex items-center text-sm font-medium ${
                                    resendDisabled 
                                        ? "text-gray-400 cursor-not-allowed" 
                                        : "text-emerald-600 hover:text-emerald-500"
                                }`}
                            >
                                <FaRedo className="mr-2" />
                                Resend OTP {resendDisabled && `(${countdown}s)`}
                            </button>
                        </div>
                    </form>
                    
                    <div className="mt-6 text-center text-sm text-gray-500">
                        <p>Didn't receive the code? Check your spam folder or request a new code.</p>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default Otp;