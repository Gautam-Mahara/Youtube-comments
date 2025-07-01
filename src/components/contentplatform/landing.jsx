import React, { useState } from "react";

export default function Landing() {
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Navigation Bar */}
      <nav className="sticky top-0 z-50 bg-white shadow-md">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <div className="text-2xl font-bold text-blue-600">ContentPlatform</div>
          <div className="hidden md:flex space-x-8">
            <a href="#features" className="text-gray-600 hover:text-blue-600 transition">Features</a>
            <a href="#premium" className="text-gray-600 hover:text-blue-600 transition">Premium</a>
            <a href="#about" className="text-gray-600 hover:text-blue-600 transition">About</a>
          </div>
          <div className="flex space-x-4">
            <button 
              onClick={() => setShowLogin(true)}
              className="px-4 py-2 text-blue-600 font-medium hover:bg-blue-50 rounded-lg transition"
            >
              Login
            </button>
            <button 
              onClick={() => setShowRegister(true)}
              className="px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition shadow-md"
            >
              Register
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 md:py-24 flex flex-col md:flex-row items-center">
        <div className="md:w-1/2 mb-12 md:mb-0">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 leading-tight mb-6">
            Create, Manage & Share <span className="text-blue-600">Content Like Never Before</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-lg">
            The all-in-one platform for content creators, marketers, and businesses to streamline their content workflow.
          </p>
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
            <button className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition shadow-lg">
              Get Started Free
            </button>
            <button className="px-6 py-3 border-2 border-blue-600 text-blue-600 font-medium rounded-lg hover:bg-blue-50 transition">
              View Demo
            </button>
          </div>
        </div>
        <div className="md:w-1/2 flex justify-center">
          <div className="relative">
            <div className="w-80 h-80 bg-blue-500 rounded-2xl shadow-xl transform rotate-6"></div>
            <div className="absolute top-0 w-80 h-80 bg-blue-400 rounded-2xl shadow-xl transform -rotate-6"></div>
            <div className="absolute top-0 w-80 h-80 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl shadow-xl"></div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="bg-white py-20">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Powerful Content Tools</h2>
            <p className="text-xl text-gray-600">
              Everything you need to create, manage, and distribute content effectively
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: "📝", title: "Content Creation", desc: "AI-assisted writing tools and templates" },
              { icon: "🗂️", title: "Content Management", desc: "Organize with tags, categories and search" },
              { icon: "📊", title: "Analytics", desc: "Track performance with detailed insights" },
              { icon: "🤝", title: "Collaboration", desc: "Real-time editing and comments" }
            ].map((feature, index) => (
              <div key={index} className="bg-gray-50 p-8 rounded-2xl shadow-sm hover:shadow-md transition">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Premium Section */}
      <section id="premium" className="bg-gradient-to-r from-blue-600 to-indigo-700 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-xl overflow-hidden">
            <div className="md:flex">
              <div className="md:w-1/2 p-8 md:p-12">
                <h2 className="text-3xl font-bold text-gray-800 mb-4">Premium Membership</h2>
                <p className="text-gray-600 mb-6">
                  Unlock advanced features and supercharge your content creation
                </p>
                
                <ul className="space-y-3 mb-8">
                  {[
                    "Unlimited content storage",
                    "Advanced AI writing assistant",
                    "Custom branding & white-labeling",
                    "Priority customer support",
                    "Detailed analytics dashboard",
                    "Multi-user collaboration"
                  ].map((item, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-green-500 mr-2">✓</span>
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
                
                <div className="bg-blue-50 rounded-xl p-6">
                  <div className="flex items-end mb-2">
                    <span className="text-4xl font-bold text-gray-800">$29</span>
                    <span className="text-gray-600 ml-2">/month</span>
                  </div>
                  <button className="w-full py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition">
                    Upgrade to Premium
                  </button>
                  <p className="text-gray-500 text-sm mt-2 text-center">7-day free trial included</p>
                </div>
              </div>
              <div className="md:w-1/2 bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center p-12">
                <div className="text-center">
                  <div className="text-8xl text-white mb-4">✨</div>
                  <h3 className="text-2xl font-bold text-white mb-2">Premium Experience</h3>
                  <p className="text-blue-100">
                    Access exclusive tools and priority support for your content needs
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">Ready to Transform Your Content Workflow?</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-10">
            Join thousands of creators and businesses already using our platform
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <button 
              onClick={() => setShowRegister(true)}
              className="px-8 py-4 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition shadow-lg"
            >
              Create Free Account
            </button>
            <button className="px-8 py-4 border-2 border-blue-600 text-blue-600 font-medium rounded-lg hover:bg-blue-50 transition">
              Schedule a Demo
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <div className="text-2xl font-bold text-white mb-2">ContentPlatform</div>
              <p className="text-gray-400">The ultimate content creation solution</p>
            </div>
            <div className="flex space-x-8">
              <a href="#" className="text-gray-400 hover:text-white transition">Terms</a>
              <a href="#" className="text-gray-400 hover:text-white transition">Privacy</a>
              <a href="#" className="text-gray-400 hover:text-white transition">Contact</a>
              <a href="#" className="text-gray-400 hover:text-white transition">Help Center</a>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-500">
            © 2023 ContentPlatform. All rights reserved.
          </div>
        </div>
      </footer>

      {/* Login Modal */}
      {showLogin && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-md">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold text-gray-800">Login to Your Account</h3>
                <button 
                  onClick={() => setShowLogin(false)}
                  className="text-gray-500 hover:text-gray-700 text-2xl"
                >
                  &times;
                </button>
              </div>
              <form className="space-y-6">
                <div>
                  <label className="block text-gray-700 mb-2">Email</label>
                  <input 
                    type="email" 
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="your@email.com"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">Password</label>
                  <input 
                    type="password" 
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="••••••••"
                  />
                </div>
                <button 
                  type="submit"
                  className="w-full py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition"
                >
                  Sign In
                </button>
                <div className="text-center pt-4">
                  <p className="text-gray-600">
                    Don't have an account?{' '}
                    <button 
                      type="button"
                      onClick={() => {
                        setShowLogin(false);
                        setShowRegister(true);
                      }}
                      className="text-blue-600 font-medium hover:underline"
                    >
                      Register
                    </button>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Register Modal */}
      {showRegister && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-md">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold text-gray-800">Create an Account</h3>
                <button 
                  onClick={() => setShowRegister(false)}
                  className="text-gray-500 hover:text-gray-700 text-2xl"
                >
                  &times;
                </button>
              </div>
              <form className="space-y-6">
                <div>
                  <label className="block text-gray-700 mb-2">Full Name</label>
                  <input 
                    type="text" 
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">Email</label>
                  <input 
                    type="email" 
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="your@email.com"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">Password</label>
                  <input 
                    type="password" 
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="••••••••"
                  />
                </div>
                <button 
                  type="submit"
                  className="w-full py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition"
                >
                  Create Account
                </button>
                <div className="text-center pt-4">
                  <p className="text-gray-600">
                    Already have an account?{' '}
                    <button 
                      type="button"
                      onClick={() => {
                        setShowRegister(false);
                        setShowLogin(true);
                      }}
                      className="text-blue-600 font-medium hover:underline"
                    >
                      Login
                    </button>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}