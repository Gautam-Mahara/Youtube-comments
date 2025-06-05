import React, { useEffect, useState, useMemo } from "react";
import { FiActivity, FiClock, FiTag, FiSearch, FiFilter } from "react-icons/fi";

const ActivityCard = ({ activity }) => (
  <div className="bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
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
      <button className="text-indigo-600 hover:text-indigo-800 font-medium text-sm">
        Start Activity
      </button>
    </div>
  </div>
);

const Meditation = () => {
  const [activities, setActivities] = useState([]);
  const [filteredActivities, setFilteredActivities] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        setIsLoading(true);
        const response = await fetch("http://localhost:8080/meditations");
        const data = await response.json();
        
        if (data.status === "success") {
          setActivities(data.meditations);
          setFilteredActivities(data.meditations);
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

  // Debounce search implementation
  useEffect(() => {
    const handler = setTimeout(() => {
      filterActivities();
    }, 300); // 300ms debounce delay

    return () => {
      clearTimeout(handler);
    };
  }, [searchTerm, categoryFilter, activities]);

  const filterActivities = () => {
    let results = activities;
    
    // Apply search filter
    if (searchTerm) {
      results = results.filter(activity =>
        activity.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        activity.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Apply category filter
    if (categoryFilter !== "all") {
      results = results.filter(activity => 
        activity.category === categoryFilter
      );
    }
    
    setFilteredActivities(results);
  };

  // Get unique categories for filter dropdown
  const categories = useMemo(() => 
    ["all", ...new Set(activities.map(a => a.category))],
    [activities]
  );

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

        {/* Search and Filter Section */}
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
              <ActivityCard key={activity.id} activity={activity} />
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

export default Meditation;