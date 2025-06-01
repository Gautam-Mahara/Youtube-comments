import axios from "axios";
import React from "react";
// import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const ForgetPass = () => {
    const [email, setEmail] = React.useState("");
    const navigate = useNavigate();
 const handleSubmit = async(e)=>{
        e.preventDefault(); // Prevent form from reloading the page
        const url = "http://localhost:8080/forget";
        const data = {
            email: email
        };
        try {
            const result = await axios.post(url, data);
            console.log("Reset password request sent:", result.data);
            navigate('/otp', { state: { email: email } });
        } catch (error) {
            console.error("Error sending reset password request:", error);
            // Handle error (e.g., show a message to the user)
        }  
 }
return<>

    <div className="flex items-center justify-center h-screen">
        <div className="inner p-8 rounded-lg shadow-md w-full max-w-md">
            <h1 className="text-3xl font-semibold text-center mb-6 text-gray-800">Forgot Password</h1>
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
                <button type="submit" className="btn bg-green-500 text-white p-3 rounded-lg hover:bg-green-600 transition duration-200">
                    Reset Password
                </button>
            </form>
        </div>
    </div>
</>
}
export default ForgetPass;