import React from 'react';
import { Link } from 'react-router-dom';

const AdminPanel = () => {
  return (
    <div className="min-h-screen flex items-center justify-center relative">
      <div className="bg-white bg-opacity-80 shadow-lg rounded-lg p-8 max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-4 text-gray-800">
          Welcome, Ganesh Derkar!
        </h1>
        <p className="text-center text-gray-700 mb-6">
          We're glad to have you here. Below are some quick links to help you manage the admin panel efficiently.
        </p>

        {/* Note about login status in the upper right corner */}
        <p className="absolute top-4 right-4 text-red-500">
          If you are not logged in, you may not be allowed to access anything.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Link
            to="/admin/appointment"
            className="bg-gradient-to-r from-blue-500 to-blue-700 text-white text-center py-3 rounded-lg shadow hover:shadow-lg transition-all duration-300 transform hover:scale-105"
          >
            Manage Appointments
          </Link>
          <Link
            to="/admin/add"
            className="bg-gradient-to-r from-green-500 to-green-700 text-white text-center py-3 rounded-lg shadow hover:shadow-lg transition-all duration-300 transform hover:scale-105"
          >
            Add New Product
          </Link>
          <Link
            to="/admin/List"
            className="bg-gradient-to-r from-yellow-500 to-yellow-700 text-white text-center py-3 rounded-lg shadow hover:shadow-lg transition-all duration-300 transform hover:scale-105"
          >
            View Product List
          </Link>
          <Link
            to="/admin/order"
            className="bg-gradient-to-r from-red-500 to-red-700 text-white text-center py-3 rounded-lg shadow hover:shadow-lg transition-all duration-300 transform hover:scale-105"
          >
            Manage Orders
          </Link>
          <Link
            to="/admin/logout"
            className="bg-gradient-to-r from-gray-500 to-gray-700 text-white text-center py-3 rounded-lg shadow hover:shadow-lg transition-all duration-300 transform hover:scale-105"
          >
            Logout
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
