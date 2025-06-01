import React from "react";  
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useLocation } from 'react-router-dom';



export const Otp = (e) => {
    const location = useLocation();
    const email = location.state?.email;
    const [otp, setOtp] = React.useState("");
    const navigate = useNavigate();
    const handleSubmit = async(e) => {
        e.preventDefault(); // Prevent form from reloading the page
      
        const url = "http://localhost:8080/verify"; 
        const data = {
            otp: e.target.otp.value,
            email: email
        }
        try {
            const result = await axios.post(url, data);
            // console.log("OTP verified successfully:", result.data);
            if (result.data.token){
                navigate('/passwordupdate', { state: { token: result.data.token, email: email } });
            }
        } catch (error) {
            console.error("Error verifying OTP:", error);
            
        }
        // For now, we'll just navigate to the portfolio page
    }
    return<>
        <div className="flex items-center justify-center h-screen">
            <div className="inner p-8 rounded-lg shadow-md w-full max-w-md">
                <h1 className="text-3xl font-semibold text-center mb-6 text-gray-800">Enter OTP</h1>
                <form className="flex flex-col" onSubmit={handleSubmit}>
                    <label htmlFor="otp" className="text-gray-600 font-medium mb-2">OTP</label>
                    <input 
                        type="text" 
                        id="otp" 
                        name="otp" 
                        onChange={(e) => setOtp(e.target.value)}
                        className="p-3 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-green-500" 
                        required 
                    />
                    <button type="submit" className="btn bg-green-500 text-white p-3 rounded-lg hover:bg-green-600 transition duration-200">
                        Verify OTP
                    </button>
                </form>
            </div>
        </div>

    </>
}