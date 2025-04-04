import React from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="bg-gray-900 text-white w-64 h-screen fixed top-2 left-0 pt-16 p-4 z-50 shadow-md">
      {/* Navigation Items */}
      <nav className="space-y-2">
        <Link to="/" className="flex items-center space-x-2 active:bg-gray-700 p-2 rounded-md hover:bg-gray-600">
          <span>🏠</span>
          <span>Home</span>
        </Link>
        <Link to="/questions" className="flex items-center space-x-2 p-2 text-gray-300 hover:bg-gray-600 active:bg-gray-700 rounded-md">
          <span>🔍</span>
          <span>Questions</span>
        </Link>
        <Link to="/tags" className="flex items-center space-x-2 p-2 text-gray-300 hover:bg-gray-600 active:bg-gray-700 rounded-md">
          <span>🏷️</span>
          <span>Tags</span>
        </Link>
        <Link to="/saves" className="flex items-center space-x-2 p-2 text-gray-300 hover:bg-gray-600 active:bg-gray-700 rounded-md">
          <span>🔖</span>
          <span>Saves</span>
        </Link>
        <Link to="/discussions" className="flex items-center space-x-2 p-2 text-gray-300 hover:bg-gray-600 active:bg-gray-700 rounded-md">
          <span>💬</span>
          <span>Discussions</span>
          <span className="bg-blue-500 text-xs px-2 py-0.5 rounded-full">Labs</span>
        </Link>
        <Link to="/chat" className="flex items-center space-x-2 p-2 text-gray-300 hover:bg-gray-600 active:bg-gray-700 rounded-md">
          <span>📢</span>
          <span>Chat</span>
        </Link>
        <Link to="/users" className="flex items-center space-x-2 p-2 text-gray-300 hover:bg-gray-600 active:bg-gray-700 rounded-md">
          <span>👥</span>
          <span>Users</span>
        </Link>
        <Link to="/room" className="flex items-center space-x-2 p-2 text-gray-300 hover:bg-gray-600 active:bg-gray-700 rounded-md">
          <span>🏢</span>
          <span>Room</span>
        </Link>
      </nav>

      {/* Collectives Section */}
      <div className="mt-6">
        <h3 className="text-sm font-bold">COLLECTIVES</h3>
        <p className="text-gray-400 text-xs">Communities for your favorite technologies.</p>
        <Link to="/collectives" className="text-blue-400 text-sm">Explore all Collectives</Link>
      </div>

      {/* Teams Section */}
      <div className="mt-6 bg-gray-800 p-3 rounded-lg">
        <h3 className="text-sm font-bold">TEAMS</h3>
        <p className="text-gray-400 text-xs">
          Ask questions, find answers, and collaborate at work with Stack Overflow for Teams.
        </p>
        <button className="mt-2 bg-orange-500 text-white text-sm px-3 py-1 rounded-md hover:bg-orange-600">
          Try Teams for free
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
