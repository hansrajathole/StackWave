import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setAuthUser } from "../../Redux/AuthSlice";
import icon from "../../assets/StackWave-icon.png";
import { DarkModeSwitch } from "react-toggle-dark-mode";

import Hamburger from "hamburger-react";
import { toggleSidebar } from "../../Redux/sidebarSlice";
const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const isOpen = useSelector((state) => state.sidebar.isOpen);
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const [isDarkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const savedMode = localStorage.getItem("theme");
    const isDark = savedMode === "dark";
    setDarkMode(isDark);
    if (isDark) {
      document.documentElement.classList.add("dark");
    }
  }, []);

  const toggleDarkMode = (checked) => {
    setDarkMode(checked);
    if (checked) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  const handleProfileClick = () => {
    setDropdownOpen(!isDropdownOpen);
  };

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

  const handleLogout = () => {
    dispatch(setAuthUser(null));
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="flex h-screen z-40">
      <div className="flex-1">
        <nav className="bg-white dark:bg-gray-900 text-black dark:text-white p-3 flex items-center justify-between fixed top-0 left-0 w-full z-50 shadow-md">
          {/* Hamburger Menu Icon */}

          {/* Left Section - Logo */}
          <div className="flex items-center space-x-2 text-center">
            <span className="">
              <Hamburger
                toggled={isOpen}
                toggle={() => dispatch(toggleSidebar())}
                size={20}
              />
            </span>
            <div className="flex items-center">
              <img src={icon} alt="" className="w-10 h-10" />
              <h1 className="text-lg">
                Stack<span className="text-orange-500 font-bold">Wave</span>
              </h1>
            </div>
            <span className="text-gray-600 dark:text-gray-300 text-sm cursor-pointer hover:text-black dark:hover:text-white max-sm:hidden">
              Products
            </span>
            <span className="text-gray-600 dark:text-gray-300 text-sm cursor-pointer hover:text-black dark:hover:text-white max-sm:hidden">
              OverflowAI
            </span>
          </div>

          {/* Search Bar */}
          <div className="flex-1 mx-4 max-w-lg max-sm:hidden">
            <input
              type="text"
              placeholder="Search..."
              className="w-full bg-gray-100 dark:bg-gray-800 text-black dark:text-white px-3 py-1 rounded-md outline-none border border-gray-300 dark:border-gray-700 focus:border-blue-500"
            />
          </div>

          {/* Right Section */}
          <div className="flex items-center space-x-3 relative">
            <button className="text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white">
              🏆
            </button>
            <button className="text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white">
              📥
            </button>
            <button className="text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white">
              ❓
            </button>

            {user ? (
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={handleProfileClick}
                  className="w-8 h-8 rounded-full overflow-hidden border-2 border-white"
                >
                  <img
                    src={user.avatar}
                    alt="profile"
                    className="w-full h-full object-cover"
                  />
                </button>

                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 text-black dark:text-white rounded-md shadow-lg overflow-hidden">
                    <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700 flex items-center space-x-2 justify-between">
                      <img
                        src={user.avatar}
                        alt="profile"
                        className="w-8 h-8 rounded-full  cursor-pointer"
                        onClick={() => navigate("/profile")}
                      />
                      <span className="block text-sm">{user.username}</span>
                    </div>
                    <div
                      className="px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
                      onClick={() => navigate("/profile")}
                    >
                      <span>View Profile</span>
                    </div>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-gray-100 dark:hover:bg-gray-700 font-semibold"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                className="bg-blue-600 px-3 py-1 rounded-md text-white text-sm hover:bg-blue-700"
                onClick={() => navigate("/login")}
              >
                Sign in
              </button>
            )}

            <div className="flex items-center">
              <DarkModeSwitch
                checked={isDarkMode}
                onChange={toggleDarkMode}
                size={30}
                className="ml-2"
              />
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Navbar;
