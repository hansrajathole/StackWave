import React, { useState } from "react";

const Room = () => {
  const [isNewProjectOpen, setIsNewProjectOpen] = useState(false);
  const [isJoinProjectOpen, setIsJoinProjectOpen] = useState(false);

  return (
    <div className="bg-gray-900 text-white min-h-full p-8">
      <h1 className="text-2xl font-bold">My Projects</h1>

      {/* Buttons to open modals */}
      <div className="flex space-x-4 mt-4">
        <button
          onClick={() => setIsJoinProjectOpen(true)}
          className="border border-purple-500 px-4 py-2 rounded-md text-purple-400 hover:bg-purple-600"
        >
          Join
        </button>
        <button
          onClick={() => setIsNewProjectOpen(true)}
          className="bg-blue-500 px-4 py-2 rounded-md hover:bg-blue-600"
        >
          New Project +
        </button>
      </div>

      {/* Join Project Modal */}
      {isJoinProjectOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="bg-gray-950 p-6 rounded-lg w-96">
            <h2 className="text-lg font-bold">Join Project</h2>
            <p className="text-gray-400 text-sm">
              To join a project, enter the join ID provided by your friend.
            </p>
            <input
              type="text"
              placeholder="Project ID"
              className="w-full bg-gray-800 p-2 mt-3 rounded-md outline-none"
            />
            <div className="flex justify-end mt-4">
              <button
                onClick={() => setIsJoinProjectOpen(false)}
                className="text-gray-400 mr-4"
              >
                Cancel
              </button>
              <button className="bg-gray-700 px-4 py-2 rounded-md text-gray-500">
                Join Project
              </button>
            </div>
          </div>
        </div>
      )}

      {/* New Project Modal */}
      {isNewProjectOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="bg-gray-950 p-6 rounded-lg w-96">
            <h2 className="text-lg font-bold">Create New Project</h2>
            <p className="text-gray-400 text-sm">
              Start coding with your friends by creating a new project and debugging with AI.
            </p>
            <input
              type="text"
              placeholder="Title (at least 3 characters)"
              className="w-full bg-gray-800 p-2 mt-3 rounded-md outline-none"
            />
            <select className="w-full bg-gray-800 p-2 mt-3 rounded-md outline-none">
              <option>Programming Language</option>
              <option>JavaScript</option>
              <option>Python</option>
              <option>C++</option>
            </select>
            <div className="flex justify-end mt-4">
              <button
                onClick={() => setIsNewProjectOpen(false)}
                className="text-gray-400 mr-4"
              >
                Cancel
              </button>
              <button className="bg-gray-700 px-4 py-2 rounded-md text-gray-500">
                Create Project
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Room;
