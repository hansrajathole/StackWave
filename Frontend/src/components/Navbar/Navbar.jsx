import React from "react";
import Sidebar from "./Sidebar";

const Navbar = () => {
  return (
    <div className="relative">
      <nav className="bg-gray-900 text-white p-3 flex items-center justify-between fixed w-full">
        {/* Left Section - Logo */}
        <div className="flex items-center space-x-2">
          <h1 className="mx-5">StackWave</h1>
          <span className="text-gray-300 text-sm">Products</span>
          <span className="text-gray-300 text-sm">OverflowAI</span>
        </div>

        {/* Search Bar */}
        <div className="flex-1 mx-4">
          <input
            type="text"
            placeholder="Search..."
            className="w-full bg-gray-800 text-white px-3 py-1 rounded-md outline-none border border-gray-700 focus:border-blue-500"
          />
        </div>

        {/* Right Section - Icons and Profile */}
        <div className="flex items-center space-x-3">
          <button className="text-gray-400 hover:text-white">🏆</button>
          <button className="text-gray-400 hover:text-white">📥</button>
          <button className="text-gray-400 hover:text-white">❓</button>
          <div className="w-6 h-6 rounded-full bg-pink-500"></div>
        </div>
        <div></div>
      </nav>
      <Sidebar />
    </div>
  );
};

export default Navbar;
