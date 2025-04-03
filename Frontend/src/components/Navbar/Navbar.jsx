import React from "react";
import Sidebar from "./Sidebar";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Navbar = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1">
        {/* Navbar */}
        <nav className="bg-gray-900 text-white p-3 flex items-center justify-between fixed top-0 left-0 w-full z-50 shadow-md">
          {/* Left Section - Logo */}
          <div className="flex items-center space-x-2">
            <h1 className="mx-5 text-lg font-semibold">StackWave</h1>
            <span className="text-gray-300 text-sm cursor-pointer hover:text-white">Products</span>
            <span className="text-gray-300 text-sm cursor-pointer hover:text-white">OverflowAI</span>
          </div>

          {/* Search Bar */}
          <div className="flex-1 mx-4 max-w-lg">
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

            {user ? (
              <div className="flex items-center space-x-3">
                <span className="text-white text-sm">{user.name}</span>
                <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-white">
                  <img src={user.avatar} alt="profile" className="w-full h-full object-cover" />
                </div>
              </div>
            ) : (
              <button className="bg-blue-600 px-3 py-1 rounded-md text-white text-sm hover:bg-blue-700"
                onClick={() => navigate("/login")}
              >
                Sign in
              </button>
            )}
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Navbar;
