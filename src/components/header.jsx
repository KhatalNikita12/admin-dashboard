import React from 'react';

const Header = ({ themeMode, toggleTheme }) => {
  const handleLogout = () => {
    // Clear relevant user data from localStorage
    localStorage.removeItem("loggedInUser");
    localStorage.removeItem("tpo");
    localStorage.removeItem("admin");
    localStorage.removeItem("student");
    localStorage.removeItem("token"); // if any
    window.location.href = "/"; // Redirect to login or home page
  };

  return (
    <header className={themeMode === 'dark' ? 'bg-gray-800' : 'bg-blue-300 shadow'}>
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo and App Name */}
        <div className="flex items-center space-x-2">
          <h1 className="text-xl font-bold text-white dark:text-black">
            Student Placement System
          </h1>
        </div>

        {/* Right-side Buttons: Theme Toggle + Logout */}
        <div className="flex items-center space-x-4">
          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            className={`p-2 rounded-md ${
              themeMode === 'dark'
                ? 'bg-gray-700 hover:bg-gray-600 text-white'
                : 'bg-gray-200 hover:bg-gray-300 text-black'
            }`}
            aria-label={`Switch to ${themeMode === 'dark' ? 'light' : 'dark'} mode`}
          >
            {themeMode === 'dark' ? '🌞 Light Mode' : '🌙 Dark Mode'}
          </button>
{/* logout Button */}
        <button
  type="button"  // ✅ Prevents form submit
  onClick={handleLogout}
  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
>
  Logout
</button>

        </div>
      </div>
    </header>
  );
};

export default Header;
