import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { GoogleGenerativeAI } from "@google/generative-ai";

const Dashboard = () => {
  const navigate = useNavigate();
  const [user] = useState({
    name: "Alex Johnson",
    username: "alexj",
    email: "alex.johnson@example.com",
    joinDate: "Jan 15, 2023"
  });
  
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [chatMessage, setChatMessage] = useState("");
  const [chatHistory, setChatHistory] = useState([
    { sender: "bot", text: "Hello! I'm your mental wellness assistant. How can I help you today?" }
  ]);
  const [isChatLoading, setIsChatLoading] = useState(false);
  
  // Initialize Gemini API

  const genAI = new GoogleGenerativeAI('AIzaSyB2RlGtNyCSPguYrY0C6Drbvtg7yRNN0i4');
  
  const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
  
  const quotes = [
    "Mental health is not a destination, but a process. It's about how you drive, not where you're going.",
    "You don't have to control your thoughts. You just have to stop letting them control you.",
    "Self-care is not selfish. You cannot serve from an empty vessel.",
    "Healing takes time, and asking for help is a courageous step.",
    "Your present circumstances don't determine where you can go; they merely determine where you start."
  ];
  
  const [currentQuote] = useState(quotes[Math.floor(Math.random() * quotes.length)]);
  const wellnessFeatures = [
    { 
      id: 1, 
      title: "Meditation", 
      description: "Guided sessions to calm your mind", 
      icon: "🧘",
      action: () => navigate('/meditation')
    },
    { 
      id: 2, 
      title: "Activity", 
      description: "Track your wellness activities", 
      icon: "🏃",
      action: () => navigate('/activity')
    },
    { 
      id: 3, 
      title: "Chatbot", 
      description: "Talk to our wellness assistant", 
      icon: "💬",
      action: () => document.getElementById('chat-section').scrollIntoView({ behavior: 'smooth' })
    }
  ];
  
  const wellnessStats = [
    { name: "Meditation", value: "12 hours", change: "+3 hours" },
    { name: "Activities", value: "15 completed", change: "+4 this week" },
    { name: "Mood Average", value: "7.8/10", change: "+0.5" }
  ];
  
  const handlePasswordUpdate = () => {
    if (newPassword !== confirmPassword) {
      setPasswordError("Passwords do not match");
      return;
    }
    
    if (newPassword.length < 8) {
      setPasswordError("Password must be at least 8 characters");
      return;
    }
    
    // In a real app, this would call your backend API
    console.log("Updating password...");
    setPasswordError("");
    setShowPasswordModal(false);
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
    
    // Show success notification
    alert("Password updated successfully!");
  };
  
  const fetchGeminiResponse = async (message) => {
    try {
      setIsChatLoading(true);
      
      // Format conversation history for context
      const history = chatHistory
        .filter(msg => msg.sender === 'user')
        .slice(-5) // Keep last 5 messages for context
        .map(msg => `User: ${msg.text}`)
        .join('\n');
      
      const fullPrompt = `You are a compassionate mental wellness assistant named MindWell. 
        Your role is to provide supportive, non-judgmental responses to help users with their mental health.
        You are NOT a substitute for professional therapy. For emergencies, always recommend contacting a professional.
        \n\nContext from previous messages:\n${history}\n\nCurrent message: ${message}`;
      
      const result = await model.generateContent(fullPrompt);
      const response = await result.response;
      const text = response.text();
      
      return text;
    } catch (error) {
      console.error("Gemini API error:", error);
      return "I'm having trouble connecting right now. Could you try again?";
    } finally {
      setIsChatLoading(false);
    }
  };

  const handleSendMessage = async () => {
    if (!chatMessage.trim()) return;
    
    // Add user message to chat history
    const userMessage = { sender: "user", text: chatMessage };
    setChatHistory(prev => [...prev, userMessage]);
    setChatMessage("");
    
    try {
      // Get response from Gemini API
      const botResponse = await fetchGeminiResponse(chatMessage);
      
      // Add bot response to chat history
      const botMessage = { sender: "bot", text: botResponse };
      setChatHistory(prev => [...prev, botMessage]);
    } catch (error) {
      console.error("Error handling message:", error);
      const errorMessage = {
        sender: "bot",
        text: "I encountered an issue. Please try again later."
      };
      setChatHistory(prev => [...prev, errorMessage]);
    }
  };

  // Handler for reassessment button
  const handleReassessment = () => {
    navigate('/mindwell');
  };

  // Handle Enter key press in chat
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-indigo-50 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <header className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">MindWell Dashboard</h1>
            <p className="text-gray-600">Your mental wellness companion</p>
          </div>
          <div className="flex items-center space-x-4">
            {/* Reassessment Button */}
            <button 
              onClick={handleReassessment}
              className="bg-indigo-500 text-white font-medium py-2 px-4 rounded-lg shadow hover:bg-indigo-600 transition"
            >
              Reassessment
            </button>
            
            <button 
              onClick={() => setShowPasswordModal(true)}
              className="bg-white text-emerald-600 font-medium py-2 px-4 rounded-lg shadow hover:shadow-md transition"
            >
              Update Password
            </button>
            <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16" />
          </div>
        </header>
        
        {/* Quote Section */}
        <div className="bg-gradient-to-r from-emerald-500 to-teal-600 rounded-2xl p-6 mb-8 text-white shadow-lg">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-xl italic mb-2">"{currentQuote}"</p>
            <p className="text-emerald-100">- Mental Wellness Proverb</p>
          </div>
        </div>
        
        {/* Features Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Wellness Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {wellnessFeatures.map(feature => (
              <div 
                key={feature.id}
                onClick={feature.action}
                className="bg-white rounded-2xl p-6 shadow hover:shadow-lg transition cursor-pointer group"
              >
                <div className="text-4xl mb-4 group-hover:text-emerald-500 transition">{feature.icon}</div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
                <div className="mt-4 text-emerald-500 font-medium flex items-center">
                  Explore
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Chatbot Section */}
        <div id="chat-section" className="bg-white rounded-2xl shadow p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Wellness Assistant</h2>
          <div className="bg-gray-50 rounded-xl p-4 mb-4 h-80 overflow-y-auto">
            {chatHistory.map((msg, index) => (
              <div 
                key={index} 
                className={`flex mb-4 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div 
                  className={`max-w-xs md:max-w-md rounded-xl p-4 ${
                    msg.sender === 'user' 
                      ? 'bg-emerald-500 text-white rounded-br-none' 
                      : 'bg-indigo-100 text-gray-800 rounded-bl-none'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            {isChatLoading && (
              <div className="flex justify-start mb-4">
                <div className="bg-indigo-100 text-gray-800 rounded-xl p-4 rounded-bl-none">
                  <div className="flex space-x-2">
                    <div className="w-2 h-2 bg-gray-600 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-600 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    <div className="w-2 h-2 bg-gray-600 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                  </div>
                </div>
              </div>
            )}
          </div>
          
          <div className="flex">
            <input
              type="text"
              value={chatMessage}
              onChange={(e) => setChatMessage(e.target.value)}
              placeholder="Type your message here..."
              className="flex-1 border border-gray-300 rounded-l-lg p-4 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              onKeyPress={handleKeyPress}
              disabled={isChatLoading}
            />
            <button
              onClick={handleSendMessage}
              className={`px-6 rounded-r-lg transition ${
                isChatLoading 
                  ? 'bg-gray-400 cursor-not-allowed' 
                  : 'bg-emerald-500 hover:bg-emerald-600 text-white'
              }`}
              disabled={isChatLoading}
            >
              Send
            </button>
          </div>
          
          <div className="mt-4 text-sm text-gray-500">
            <p>Our wellness assistant is powered by Gemini AI and designed to provide mental health support. 
            Remember this is not a substitute for professional help.</p>
            <p className="mt-1 text-xs">For immediate help: National Suicide Prevention Lifeline: 1-800-273-8255</p>
          </div>
        </div>
      </div>
      
      {/* Password Update Modal */}
      {showPasswordModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-lg w-full max-w-md p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Update Password</h3>
            
            {passwordError && (
              <div className="bg-red-50 text-red-700 p-3 rounded-lg mb-4">
                {passwordError}
              </div>
            )}
            
            <div className="space-y-4">
              <div>
                <label className="block text-gray-700 mb-2">Current Password</label>
                <input
                  type="password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  placeholder="Enter current password"
                />
              </div>
              
              <div>
                <label className="block text-gray-700 mb-2">New Password</label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  placeholder="Enter new password"
                />
                <p className="text-xs text-gray-500 mt-1">Must be at least 8 characters</p>
              </div>
              
              <div>
                <label className="block text-gray-700 mb-2">Confirm New Password</label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  placeholder="Confirm new password"
                />
              </div>
            </div>
            
            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => setShowPasswordModal(false)}
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={handlePasswordUpdate}
                className="px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600"
              >
                Update Password
              </button>
            </div>
          </div>
        </div>
      )}
      
      <footer className="mt-12 text-center text-gray-600 text-sm">
        <p>© 2025 MindWell. All rights reserved. Your mental wellness journey matters.</p>
      </footer>
    </div>
  );
};

export default Dashboard;