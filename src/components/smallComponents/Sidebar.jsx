import React, { useState } from 'react';
// import './sidebar.css';  // Import CSS file for styling

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      {/* Three Dots Button to open the sidebar */}
      <button onClick={toggleSidebar} className="menu-btn">
        &#x2022;&#x2022;&#x2022;
      </button>

      {/* Sidebar with a close button */}
      <div className={`sidebar ${isOpen ? 'open' : ''}`}>
        <button onClick={toggleSidebar} className="close-btn">X</button>
        <ul>
          <li>Home</li>
          <li>About</li>
          <li>Projects</li>
          <li>Contact</li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
