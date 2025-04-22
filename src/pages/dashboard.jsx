import React from 'react';

const Dashboard = () => {
  return (
    <div className="p-6">
      {/* Dashboard Title */}
      <h1 className="text-2xl font-bold text-white-800 mb-6">Dashboard</h1>

      {/* Card Container */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Total Students Card */}
        <div className="bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-lg font-semibold text-gray-700">Total Students</h2>
          <div className="mt-4">
            <p className="text-4xl font-bold text-indigo-600">1200</p>
            <p className="text-gray-500">Total students enrolled</p>
          </div>
        </div>

        {/* Top Performers Card */}
        <div className="bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-lg font-semibold text-gray-700">Placed Student</h2>
          <div className="mt-4">
            <p className="text-4xl font-bold text-green-600">200</p>
            <p className="text-gray-500">Placed Student of 2026 batch</p>
          </div>
        </div>

        {/* Active Students Card */}
        <div className="bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-lg font-semibold text-gray-700">Non-Placed Student</h2>
          <div className="mt-4">
            <p className="text-4xl font-bold text-blue-600">1000</p>
            <p className="text-gray-500">Non-Placed Student of 2026 batch</p>
          </div>
        </div>

        {/* Pending Applications Card */}
        <div className="bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-lg font-semibold text-gray-700">Total TPOs</h2>
          <div className="mt-4">
            <p className="text-4xl font-bold text-red-600">50</p>
            <p className="text-gray-500">Total Training and Placement Officer </p>
          </div>
        </div>

        {/* New Enrollments Card */}
        <div className="bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-lg font-semibold text-gray-700">Pending TPOs</h2>
          <div className="mt-4">
            <p className="text-4xl font-bold text-yellow-600">10</p>
            <p className="text-gray-500">Pending TPOs applications</p>
          </div>
        </div>

      
      
      </div>
    </div>
  );
};

export default Dashboard;
