import React, { useState } from 'react';
const { GoogleGenerativeAI } = require("@google/generative-ai");

function CharBot() {
    const [message, setMessage] = useState('');
    const [chatHistory, setChatHistory] = useState([]);

    // Function to handle message sending
    const handleSend = async () => {
        if (message.trim()) {
            // Add the user's message to chat history
            setChatHistory([...chatHistory, { text: message, sender: 'user' }]);

            // Call the function to get the response from chat service
            const response = await getData(message);
            setChatHistory([...chatHistory, { text: message, sender: 'user' }, { text: response, sender: 'bot' }]);

            // Clear the input field
            setMessage('');
        }
    };

    // Function to handle data fetching from chat service
    const getData = async (text) => {
        try {
            const genAI = new GoogleGenerativeAI("AIzaSyA-n0JtOrL11JweQMaPzKQQBrLbVKaQWfg");
            const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
            
            const prompt = "Write a story about a magic backpack.";
            
            const result = await model.generateContent(text);
            console.log(result.response.text());
            return result.response.text() || "No Reply";
        } catch (error) {
            console.error("Error fetching data:", error);
            return "An error occurred while fetching data.";
        }
    };
    

    return (
        <div className="w-screen h-screen flex justify-center items-center">
            <div className="relative box-border h-[95vh] w-[95vw] border-4 border-black bg-yellow-400 flex flex-col justify-center items-center">
                {/* Left Circle (Avatar) */}
                <div className="absolute left-10 top-1/2  bg-black transform -translate-y-1/2 rounded-full border-4 border-black h-24 w-24 bg-white"></div>

                {/* Right Circle (Avatar) */}
                <div className="absolute right-10 top-1/2 bg-black transform -translate-y-1/2 rounded-full border-4 border-black h-24 w-24 bg-white"></div>

                {/* Chat Bubble */}
                <div className="relative w-2/3 h-1/2 bg-white border-4 border-black rounded-full flex flex-col items-center justify-start mt-10 p-4 overflow-auto">
                    {chatHistory.map((msg, index) => (
                        <div
                            key={index}
                            className={`my-2 p-2 rounded-lg ${msg.sender === 'user' ? 'bg-blue-200 text-right' : 'bg-green-200 text-left'}`}
                        >
                            {msg.text}
                        </div>
                    ))}
                </div>

                {/* Bottom Section (Text Area and Send Button) */}
                <div className="absolute bottom-10 w-3/4 flex justify-between items-center">
                    {/* Left Icon Box */}
                    <div className="h-12 w-12 border-2 border-black bg-white"></div>

                    {/* Text Area */}
                    <textarea
                        className="border-2 border-black h-12 w-full p-2 resize-none mr-2"
                        placeholder="Type a message..."
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                    />

                    {/* Send Button */}
                    <button
                        className="h-12 w-12 border-2 border-black bg-white flex justify-center items-center"
                        onClick={handleSend}
                    >
                        Send
                    </button>
                </div>
            </div>
        </div>
    );
}

export default CharBot;
