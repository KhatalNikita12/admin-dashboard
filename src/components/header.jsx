import React from 'react';
// import { Icons } from '../assets/icons/Icons';


const Header = ({ themeMode, toggleTheme }) => {
  return (
    <header className={themeMode === 'dark' ? 'bg-gray-800' : 'bg-white shadow'}>
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo and App Name */}
        <div className="flex items-center space-x-2">
        
          <h1 className="text-xl font-bold">Admin Dashboard</h1>
        </div>
        
        {/* Theme Toggle Button */}
        <div>
          <button
            onClick={toggleTheme}
            className={`p-2 rounded-md ${
              themeMode === 'dark' 
                ? 'bg-gray-700 hover:bg-gray-600' 
                : 'bg-gray-200 hover:bg-gray-300'
            }`}
            aria-label={`Switch to ${themeMode === 'dark' ? 'light' : 'dark'} mode`}
          >
            {themeMode === 'dark' ? 'Light Mode' : 'Dark Mode'}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;