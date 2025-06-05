import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiArrowRight, FiCheck, FiUsers, FiHeadphones, FiBookOpen, FiActivity, FiHeart } from "react-icons/fi";

function MindWell() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(0);
  
  const handleLoginClick = () => {
    navigate('/login');
  };

  const features = [
    {
      icon: <FiActivity className="text-3xl" />,
      title: "Personalized Assessments",
      description: "Take our scientifically validated mental health assessments to understand your current state."
    },
    {
      icon: <FiHeadphones className="text-3xl" />,
      title: "Guided Meditations",
      description: "Access hundreds of guided meditations for stress, sleep, anxiety, and focus."
    },
    {
      icon: <FiBookOpen className="text-3xl" />,
      title: "Educational Resources",
      description: "Learn about mental health through our library of articles, videos, and courses."
    },
    {
      icon: <FiUsers className="text-3xl" />,
      title: "Community Support",
      description: "Connect with others in a safe, moderated space for sharing and support."
    }
  ];

  const testimonials = [
    {
      name: "Sarah T.",
      role: "Software Engineer",
      content: "MindWell helped me manage my work-related anxiety. The daily meditations have become an essential part of my routine.",
      avatar: "ST"
    },
    {
      name: "Michael J.",
      role: "College Student",
      content: "The community support feature helped me realize I'm not alone in my struggles. This platform is a lifesaver!",
      avatar: "MJ"
    },
    {
      name: "Priya K.",
      role: "Marketing Manager",
      content: "The personalized assessments gave me insights I never had before. I finally understand my stress patterns.",
      avatar: "PK"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50">
      {/* Navigation */}
      <nav className="flex justify-between items-center px-6 py-4 md:px-12">
        <div className="flex items-center">
          <div className="bg-gradient-to-r from-indigo-500 to-purple-500 w-10 h-10 rounded-full flex items-center justify-center">
            <FiHeart className="text-white text-xl" />
          </div>
          <span className="ml-3 text-2xl font-bold text-indigo-800">MindWell</span>
        </div>
        
        <div className="hidden md:flex space-x-8">
          <a href="#features" className="text-gray-700 hover:text-indigo-600 transition-colors">Features</a>
          <a href="#how-it-works" className="text-gray-700 hover:text-indigo-600 transition-colors">How It Works</a>
          <a href="#testimonials" className="text-gray-700 hover:text-indigo-600 transition-colors">Testimonials</a>
        </div>
        
        <button 
          onClick={handleLoginClick}
          className="bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white px-6 py-2 rounded-full font-medium shadow-md transition-all transform hover:scale-105"
        >
          Get Started
        </button>
      </nav>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-6 py-16 md:py-24 md:px-12">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-12 md:mb-0">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 leading-tight mb-6">
              Your Journey to <span className="text-indigo-600">Better Mental Health</span> Starts Here
            </h1>
            <p className="text-lg text-gray-600 mb-8 max-w-lg">
              MindWell provides personalized tools and resources to help you understand, manage, and improve your mental well-being. 
              Join thousands who have transformed their mental health journey.
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <button 
                onClick={handleLoginClick}
                className="bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white px-8 py-4 rounded-full font-medium shadow-lg transition-all transform hover:scale-105 flex items-center justify-center"
              >
                Start Your Journey <FiArrowRight className="ml-2" />
              </button>
              <button className="bg-white border-2 border-indigo-500 text-indigo-600 hover:bg-indigo-50 px-8 py-4 rounded-full font-medium shadow-md transition-all">
                Learn More
              </button>
            </div>
          </div>
          
          <div className="md:w-1/2 flex justify-center">
            <div className="relative">
              <div className="absolute -top-6 -right-6 w-64 h-64 bg-indigo-200 rounded-full opacity-50"></div>
              <div className="absolute -bottom-6 -left-6 w-64 h-64 bg-purple-200 rounded-full opacity-50"></div>
              
              <div className="relative bg-white rounded-3xl shadow-xl p-6 w-80 z-10">
                <div className="flex justify-between items-center mb-6">
                  <div className="bg-indigo-100 p-3 rounded-full">
                    <FiHeart className="text-indigo-600 text-xl" />
                  </div>
                  <span className="text-sm font-medium text-indigo-600">Daily Check-in</span>
                </div>
                
                <div className="mb-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-3">How are you feeling today?</h3>
                  <div className="flex justify-between">
                    {[1, 2, 3, 4, 5].map((item) => (
                      <div key={item} className="flex flex-col items-center">
                        <div className="w-10 h-10 rounded-full bg-gray-200 mb-2"></div>
                        <span className="text-xs text-gray-500">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="bg-indigo-50 rounded-xl p-4 mb-4">
                  <p className="text-sm text-indigo-800">
                    "Your mental health journey is unique. Celebrate every step forward."
                  </p>
                </div>
                
                <button className="w-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white py-3 rounded-lg font-medium">
                  Complete Check-in
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white py-12">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold mb-2">Fast Response</div>
              <div className="text-indigo-100">Active</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">89%</div>
              <div className="text-indigo-100">Report Accuracy</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">24/7</div>
              <div className="text-indigo-100">Support Available</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">100+</div>
              <div className="text-indigo-100">Expert Resources(Upcoming Feature)</div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div id="features" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">How MindWell Supports You</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Our comprehensive platform offers everything you need for your mental wellness journey.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className="bg-gradient-to-br from-white to-indigo-50 rounded-2xl p-6 shadow-lg border border-indigo-100 hover:shadow-xl transition-all"
              >
                <div className="bg-indigo-100 w-14 h-14 rounded-full flex items-center justify-center mb-6 text-indigo-600">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* How It Works */}
      <div id="how-it-works" className="py-20 bg-indigo-50">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Simple Steps to Better Mental Health</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Getting started with MindWell is easy and takes just minutes.
            </p>
          </div>
          
          <div className="flex flex-col md:flex-row justify-center mb-8 border-b border-gray-200">
            {["Sign Up", "Take Assessment", "Personalized Plan"].map((step, index) => (
              <button
                key={index}
                onClick={() => setActiveTab(index)}
                className={`px-6 py-4 font-medium text-lg border-b-2 transition-colors ${
                  activeTab === index
                    ? "border-indigo-500 text-indigo-600"
                    : "border-transparent text-gray-500 hover:text-gray-700"
                }`}
              >
                {step}
              </button>
            ))}
          </div>
          
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-1/2 mb-8 md:mb-0">
                {activeTab === 0 && (
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">Create Your Account</h3>
                    <p className="text-gray-600 mb-6">
                      Sign up in less than a minute with your email. We prioritize your privacy and security.
                    </p>
                    <ul className="space-y-3">
                      <li className="flex items-center">
                        <FiCheck className="text-green-500 mr-2" /> Secure & encrypted data
                      </li>
                      <li className="flex items-center">
                        <FiCheck className="text-green-500 mr-2" /> No commitment required
                      </li>
                      <li className="flex items-center">
                        <FiCheck className="text-green-500 mr-2" /> Free to get started
                      </li>
                    </ul>
                  </div>
                )}
                
                {activeTab === 1 && (
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">Complete Your Assessment</h3>
                    <p className="text-gray-600 mb-6">
                      Our 5-minute assessment helps us understand your current mental wellness and goals.
                    </p>
                    <ul className="space-y-3">
                      <li className="flex items-center">
                        <FiCheck className="text-green-500 mr-2" /> Scientifically validated
                      </li>
                      <li className="flex items-center">
                        <FiCheck className="text-green-500 mr-2" /> Completely confidential
                      </li>
                      <li className="flex items-center">
                        <FiCheck className="text-green-500 mr-2" /> Personalized insights
                      </li>
                    </ul>
                  </div>
                )}
                
                {activeTab === 2 && (
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">Receive Your Plan</h3>
                    <p className="text-gray-600 mb-6">
                      Based on your assessment, we create a customized mental wellness plan just for you.
                    </p>
                    <ul className="space-y-3">
                      <li className="flex items-center">
                        <FiCheck className="text-green-500 mr-2" /> Tailored to your needs
                      </li>
                      <li className="flex items-center">
                        <FiCheck className="text-green-500 mr-2" /> Adjustable as you progress
                      </li>
                      <li className="flex items-center">
                        <FiCheck className="text-green-500 mr-2" /> Expert-curated resources
                      </li>
                    </ul>
                  </div>
                )}

              </div>
              
              <div className="md:w-1/2 flex justify-center">
                <div className="bg-gradient-to-r from-indigo-400 to-purple-400 w-64 h-64 rounded-2xl flex items-center justify-center text-white">
                  <div className="text-center">
                    <div className="text-6xl font-bold mb-2">{activeTab + 1}</div>
                    <div className="text-xl">Step {activeTab + 1}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <div id="testimonials" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">What Our Community Says</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Hear from people who have transformed their mental wellness with MindWell.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-gradient-to-br from-indigo-50 to-white rounded-2xl p-6 shadow-lg border border-indigo-100">
                <div className="flex items-center mb-6">
                  <div className="bg-gradient-to-r from-indigo-500 to-purple-500 w-12 h-12 rounded-full flex items-center justify-center text-white font-bold">
                    {testimonial.avatar}
                  </div>
                  <div className="ml-4">
                    <div className="font-bold text-gray-900">{testimonial.name}</div>
                    <div className="text-sm text-indigo-600">{testimonial.role}</div>
                  </div>
                </div>
                <p className="text-gray-600 italic">"{testimonial.content}"</p>
                <div className="flex mt-4 text-amber-400">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg key={star} className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                    </svg>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-20 bg-gradient-to-r from-indigo-500 to-purple-500">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Start Your Mental Wellness Journey Today</h2>
          <p className="text-xl text-indigo-100 mb-10 max-w-2xl mx-auto">
            Join thousands of people who have improved their mental health with MindWell. It's free to get started.
          </p>
          <button 
            onClick={handleLoginClick}
            className="bg-white text-indigo-600 hover:bg-indigo-50 px-10 py-4 rounded-full font-bold text-lg shadow-xl transition-all transform hover:scale-105"
          >
            Get Started For Free
          </button>
          <p className="text-indigo-200 mt-6">No credit card required. Cancel anytime.</p>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <div className="bg-gradient-to-r from-indigo-500 to-purple-500 w-8 h-8 rounded-full flex items-center justify-center">
                  <FiHeart className="text-white" />
                </div>
                <span className="ml-2 text-xl font-bold">MindWell</span>
              </div>
              <p className="text-gray-400 mb-4">
                Your trusted companion for mental wellness and personal growth.
              </p>
              <div className="flex space-x-4">
                {[1, 2, 3, 4].map((item) => (
                  <div key={item} className="bg-gray-800 w-10 h-10 rounded-full flex items-center justify-center cursor-pointer hover:bg-indigo-600 transition-colors">
                    <div className="w-4 h-4 bg-gray-400 rounded-full"></div>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Resources</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Blog</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Guides</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Community</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Company</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">About Us</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Careers</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Contact</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Partners</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Legal</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Terms of Service</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Cookie Policy</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Security</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-10 pt-6 text-center text-gray-500">
            <p>© {new Date().getFullYear()} MindWell. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default MindWell;