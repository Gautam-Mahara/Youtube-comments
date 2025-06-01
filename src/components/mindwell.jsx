import React from "react";
// import Navbar from "./NavBar";
import './cssfiles/mindwell.css'
import { useNavigate } from "react-router-dom";

function MindWell() {
    // const [isLoggedIn, setIsLoggedIn] = React.useState(false);
    const nav = useNavigate();
    const handleclick = () => {
        // Logic for handling login
        nav('/login')
    };
return <>
        
        <div className="flex flex-col items-center justify-center">
            
        <div className="sec-1">
                {/* <ul className='ul-container'>
                <li className='hover:text-blue-400 transition-colors duration-300'>
                    <a href="/">Home</a>
                </li>
                <li className='hover:text-blue-400 transition-colors duration-300'>
                    <a href="https://github.com/Gautam-Mahara">About</a>
                </li>
                <li className='hover:text-blue-400 transition-colors duration-300'>
                    <a href="/home">Login</a>
                </li>
                <li className='hover:text-blue-400 transition-colors duration-300'>
                    <a href="/Contact">Contact</a>
                </li>
            </ul> */}
            <h1> Welcome To MindWell</h1>
            <button className=" hover:mix-blend-multiply" onClick={handleclick}>Login</button>
        </div>
    <div className="sec-2">
        <h1>What is MindWell?</h1>
        <p>MindWell is a mental health platform that provides resources and support for individuals seeking to improve their mental well-being. Our mission is to promote mental wellness through education, community, and access to professional help.</p>
        <button className="btn hover:mix-blend-multiply">Get Started</button>
    </div>
        </div>

</>
}
export default MindWell;