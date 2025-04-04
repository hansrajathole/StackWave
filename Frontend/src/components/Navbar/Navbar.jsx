import React, { useState, useRef, useEffect } from "react";
import Sidebar from "./Sidebar";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setAuthUser } from "../../Redux/AuthSlice"; // Import the logout action
import Home from "../../Views/Home/Home";

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Toggle dropdown menu
  const handleProfileClick = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Logout function
  const handleLogout = () => {
    dispatch(setAuthUser(null)); // Clear user data from Redux
    localStorage.removeItem("token")
    navigate("/login"); // Redirect to login page
  };

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
            <div class="loader"></div>
          </div>

          {/* Right Section - Icons and Profile */}
          <div className="flex items-center space-x-3 relative">
            <button className="text-gray-400 hover:text-white">🏆</button>
            <button className="text-gray-400 hover:text-white">📥</button>
            <button className="text-gray-400 hover:text-white">❓</button>

            {user ? (
              <div className="relative" ref={dropdownRef}>
                {/* Profile Image Button */}
                <button onClick={handleProfileClick} className="w-10 h-10 rounded-full overflow-hidden border-2 border-white">
                  <img src={user.avatar} alt="profile" className="w-full h-full object-cover" />
                </button>

                {/* Profile Dropdown */}
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-gray-800 text-white rounded-md shadow-lg overflow-hidden">
                    <div className="px-4 py-3 border-b border-gray-700">
                      <span className="block text-sm">{user.username}</span>
                    </div>
                    <button 
                      onClick={handleLogout} 
                      className="w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-gray-700 font-semibold
                      "
                    >
                      Logout
                    </button>
                  </div>
                )}
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
