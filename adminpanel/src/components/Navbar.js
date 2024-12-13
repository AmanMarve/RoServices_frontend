import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';

const Navbar = ({ isLoggedIn, onLogout, onOpenLoginDialog }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className="bg-gray-800 p-4 flex items-center justify-between">
      <div className="grid items-center">
        <Link to='/' className="text-white text-2xl font-semibold mr-2">
          Ganesh Services
        </Link>
        <span className="text-gray-300 text-sm">
          Admin-panel
        </span>
      </div>

      <div className="md:hidden text-white cursor-pointer" onClick={toggleMenu}>
        {menuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
      </div>

      <ul className={`md:flex mt-4 z-[1000] pb-4 gap-8 items-center ${menuOpen ? 'block' : 'hidden'} md:block bg-gray-800 md:bg-transparent absolute md:static top-16 left-0 w-full md:w-auto`}>
        <li className="text-center md:text-left">
          <Link to="/admin/appointment" className="text-white block py-2 px-4 hover:bg-gray-700 md:hover:bg-transparent md:hover:text-blue-400">Appointment's</Link>
        </li>
        <li className="text-center md:text-left">
          <Link to="/admin/add" className="text-white block py-2 px-4 hover:bg-gray-700 md:hover:bg-transparent md:hover:text-blue-400">Add Product</Link>
        </li>
        <li className="text-center md:text-left">
          <Link to="/admin/list" className="text-white block py-2 px-4 hover:bg-gray-700 md:hover:bg-transparent md:hover:text-blue-400">Product's List</Link>
        </li>
        <li className="text-center md:text-left">
          <Link to="/admin/order" className="text-white block py-2 px-4 hover:bg-gray-700 md:hover:bg-transparent md:hover:text-blue-400">Orders</Link>
        </li>
        <li className="text-center md:text-left">
          {isLoggedIn ? (
            <button
              className="bg-red-600 hover:bg-red-500 text-white py-2 px-4 rounded"
              onClick={onLogout}
            >
              Logout
            </button>
          ) : (
            <button
              className="bg-blue-600 hover:bg-blue-500 text-white py-2 px-4 rounded"
              onClick={onOpenLoginDialog}
            >
              Login
            </button>
          )}
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
