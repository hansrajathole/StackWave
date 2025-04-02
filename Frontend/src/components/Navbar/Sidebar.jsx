import React from 'react'

const Sidebar = () => {
  return (
    <div className="bg-gray-900 text-white w-64 h-screen p-4 overflow-y-auto">
      {/* Navigation Items */}
      <nav className="space-y-2">
        <a href="#" className="flex items-center space-x-2 bg-gray-700 p-2 rounded-md">
          <span>🏠</span>
          <span>Home</span>
        </a>
        <a href="#" className="flex items-center space-x-2 p-2 text-gray-300 hover:bg-gray-700 rounded-md">
          <span>🔍</span>
          <span>Questions</span>
        </a>
        <a href="#" className="flex items-center space-x-2 p-2 text-gray-300 hover:bg-gray-700 rounded-md">
          <span>🏷️</span>
          <span>Tags</span>
        </a>
        <a href="#" className="flex items-center space-x-2 p-2 text-gray-300 hover:bg-gray-700 rounded-md">
          <span>🔖</span>
          <span>Saves</span>
        </a>
        <a href="#" className="flex items-center space-x-2 p-2 text-gray-300 hover:bg-gray-700 rounded-md">
          <span>💬</span>
          <span>Discussions</span>
          <span className="bg-blue-500 text-xs px-2 py-0.5 rounded-full">Labs</span>
        </a>
        <a href="#" className="flex items-center space-x-2 p-2 text-gray-300 hover:bg-gray-700 rounded-md">
          <span>📢</span>
          <span>Chat</span>
        </a>
        <a href="#" className="flex items-center space-x-2 p-2 text-gray-300 hover:bg-gray-700 rounded-md">
          <span>👥</span>
          <span>Users</span>
        </a>
        <a href="#" className="flex items-center space-x-2 p-2 text-gray-300 hover:bg-gray-700 rounded-md">
          <span>🏢</span>
          <span>Companies</span>
        </a>
      </nav>

      {/* Collectives Section */}
      <div className="mt-6">
        <h3 className="text-sm font-bold">COLLECTIVES</h3>
        <p className="text-gray-400 text-xs">Communities for your favorite technologies.</p>
        <a href="#" className="text-blue-400 text-sm">Explore all Collectives</a>
      </div>

      {/* Teams Section */}
      <div className="mt-6 bg-gray-800 p-3 rounded-lg">
        <h3 className="text-sm font-bold">TEAMS</h3>
        <p className="text-gray-400 text-xs">
          Ask questions, find answers and collaborate at work with Stack Overflow for Teams.
        </p>
        <button className="mt-2 bg-orange-500 text-white text-sm px-3 py-1 rounded-md">
          Try Teams for free
        </button>
      </div>
    </div>
  )
}

export default Sidebar
