import React, { useEffect, useState } from "react";
import { FiActivity, FiClock, FiTag, FiSearch, FiFilter, FiPause, FiPlay, FiX, FiCheck, FiArrowLeft } from "react-icons/fi";

const Activities = () => {
  const [activities, setActivities] = useState([]);
  const [filteredActivities, setFilteredActivities] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [currentActivity, setCurrentActivity] = useState(null);
  const [timeLeft, setTimeLeft] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  // Fetch activities
  useEffect(() => {
    const fetchActivities = async () => {
      try {
        setIsLoading(true);
        const response = await fetch("http://localhost:8080/activities");
        const data = await response.json();
        
        if (data.status === "success") {
          setActivities(data.activities);
          setFilteredActivities(data.activities);
        } else {
          setError("Failed to load activities");
        }
      } catch (err) {
        setError("Network error. Please try again later.");
        console.error("Fetch error:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchActivities();
  }, []);

  // Filter activities
  useEffect(() => {
    let results = activities;
    
    if (searchTerm) {
      results = results.filter(activity =>
        activity.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        activity.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    if (categoryFilter !== "all") {
      results = results.filter(activity => 
        activity.category === categoryFilter
      );
    }
    
    setFilteredActivities(results);
  }, [searchTerm, categoryFilter, activities]);

  // Timer effect
  useEffect(() => {
    let interval = null;

    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(time => time - 1);
      }, 1000);
    } else if (isActive && timeLeft === 0) {
      setIsActive(false);
      setIsCompleted(true);
    }

    return () => clearInterval(interval);
  }, [isActive, timeLeft]);

  // Handle activity start
  const handleStartActivity = (activity) => {
    setCurrentActivity(activity);
    setTimeLeft(activity.duration * 60);
    setIsActive(false);
    setIsCompleted(false);
  };

  // Handle timer controls
  const toggleTimer = () => setIsActive(!isActive);
  const resetTimer = () => {
    setIsActive(false);
    setTimeLeft(currentActivity.duration * 60);
    setIsCompleted(false);
  };
  
  const exitTimer = () => {
    setCurrentActivity(null);
    setIsActive(false);
    setIsCompleted(false);
  };

  // Format time as MM:SS
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Calculate progress percentage
  const progress = currentActivity 
    ? 100 - (timeLeft / (currentActivity.duration * 60)) * 100
    : 0;

  // Get unique categories
  const categories = ["all", ...new Set(activities.map(a => a.category))];

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-pulse">
          <div className="bg-indigo-200 rounded-full w-12 h-12 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading activities...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center p-8 bg-white rounded-xl shadow-md">
          <div className="bg-red-100 rounded-full p-4 w-16 h-16 mx-auto">
            <FiActivity className="text-red-500 text-2xl mx-auto" />
          </div>
          <h3 className="text-xl font-bold mt-4 mb-2">Error Loading Activities</h3>
          <p className="text-gray-600 mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  // Timer View
  if (currentActivity) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-100 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md mx-auto">
          <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
            {/* Header */}
            <div className="bg-indigo-600 p-6 text-white">
              <div className="flex items-center justify-between mb-4">
                <button 
                  onClick={exitTimer}
                  className="flex items-center text-indigo-100 hover:text-white"
                >
                  <FiArrowLeft className="mr-2" />
                  Back to Activities
                </button>
              </div>
              <h1 className="text-3xl font-bold">{currentActivity.title}</h1>
              <p className="text-indigo-200 mt-2">
                {currentActivity.category} • {currentActivity.duration} minutes
              </p>
            </div>

            {/* Timer Display */}
            <div className="flex justify-center my-10">
              <div className="relative w-64 h-64">
                <svg className="w-full h-full" viewBox="0 0 100 100">
                  <circle
                    cx="50"
                    cy="50"
                    r="45"
                    fill="none"
                    stroke="#e0e7ff"
                    strokeWidth="8"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="45"
                    fill="none"
                    stroke="#4f46e5"
                    strokeWidth="8"
                    strokeDasharray="283"
                    strokeDashoffset={283 - (283 * progress) / 100}
                    strokeLinecap="round"
                    transform="rotate(-90 50 50)"
                  />
                </svg>
                
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-4xl font-bold text-gray-800">
                      {formatTime(timeLeft)}
                    </div>
                    <div className="mt-2 text-gray-500">
                      {isActive ? 'In progress...' : 
                       isCompleted ? 'Completed!' : 'Ready to start'}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Controls */}
            <div className="p-6">
              <div className="flex justify-center space-x-6">
                {!isCompleted ? (
                  <>
                    <button
                      onClick={toggleTimer}
                      className={`w-16 h-16 rounded-full flex items-center justify-center shadow-lg ${
                        isActive
                          ? 'bg-yellow-500 hover:bg-yellow-600 text-white'
                          : 'bg-indigo-600 hover:bg-indigo-700 text-white'
                      } transition transform hover:scale-105`}
                    >
                      {isActive ? (
                        <FiPause className="text-2xl" />
                      ) : (
                        <FiPlay className="text-2xl ml-1" />
                      )}
                    </button>
                    
                    <button
                      onClick={resetTimer}
                      className="w-16 h-16 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center shadow-lg transition transform hover:scale-105"
                    >
                      <FiX className="text-2xl text-gray-700" />
                    </button>
                  </>
                ) : (
                  <button
                    onClick={exitTimer}
                    className="px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-full flex items-center shadow-lg transition transform hover:scale-105"
                  >
                    <FiCheck className="mr-2" />
                    Finish Activity
                  </button>
                )}
              </div>

              {/* Guidance messages */}
              {isActive && timeLeft > 0 && (
                <div className="mt-8 text-center">
                  <p className="text-gray-600 italic">
                    Focus on your breathing. Inhale deeply... Exhale slowly...
                  </p>
                </div>
              )}
              
              {isCompleted && (
                <div className="mt-8 text-center p-4 bg-green-50 rounded-lg">
                  <h3 className="font-bold text-green-700">Great job!</h3>
                  <p className="text-green-600 mt-1">
                    You completed your mindfulness activity
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Activities List View
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <div className="bg-indigo-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <FiActivity className="text-indigo-600 text-2xl" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            Mindfulness Activities
          </h1>
          <p className="mt-3 text-xl text-gray-500 max-w-2xl mx-auto">
            Discover activities to enhance your well-being and mindfulness practice
          </p>
        </div>

        {/* Search and Filter */}
        <div className="mb-10 bg-white rounded-xl shadow-md p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiSearch className="text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search activities..."
                className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiFilter className="text-gray-400" />
              </div>
              <select
                className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 appearance-none"
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
              >
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category === "all" ? "All Categories" : category}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Activity Grid */}
        {filteredActivities.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredActivities.map((activity) => (
              <div 
                key={activity.id} 
                className="bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
              >
                <div className="p-6">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-xl font-bold text-indigo-700 mb-2">
                        {activity.title}
                      </h3>
                      <div className="flex items-center text-gray-600 mb-1">
                        <FiClock className="mr-2" />
                        <span>{activity.duration} minutes</span>
                      </div>
                      <div className="flex items-center text-gray-600">
                        <FiTag className="mr-2" />
                        <span className="bg-indigo-100 text-indigo-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                          {activity.category}
                        </span>
                      </div>
                    </div>
                    <div className="bg-indigo-100 p-3 rounded-full">
                      <FiActivity className="text-indigo-600 text-xl" />
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-6 py-4 border-t border-gray-100">
                  <button 
                    onClick={() => handleStartActivity(activity)}
                    className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg transition"
                  >
                    Start Activity
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-white rounded-xl shadow-md">
            <div className="bg-gray-100 rounded-full p-4 w-16 h-16 mx-auto">
              <FiSearch className="text-gray-500 text-2xl mx-auto" />
            </div>
            <h3 className="text-xl font-bold mt-4 mb-2">No Activities Found</h3>
            <p className="text-gray-600">
              Try adjusting your search or filter criteria
            </p>
            <button 
              onClick={() => {
                setSearchTerm("");
                setCategoryFilter("all");
              }}
              className="mt-4 text-indigo-600 hover:text-indigo-800 font-medium"
            >
              Clear Filters
            </button>
          </div>
        )}

        {/* Stats Footer */}
        <div className="mt-12 pt-8 border-t border-gray-200 text-center text-gray-500">
          Showing {filteredActivities.length} of {activities.length} activities
        </div>
      </div>
    </div>
  );
};

export default Activities;