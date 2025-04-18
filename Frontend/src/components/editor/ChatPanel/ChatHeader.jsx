import React from "react";

const ChatHeader = ({ onTogglePeople, showPeople }) => {
  return (
    <header className="text-lg font-semibold p-2 border-b border-gray-300 dark:border-gray-700 flex justify-end">
      <button
        className="rounded-full dark:text-gray-800 dark:bg-white bg-gray-800 text-white px-2 py-1 hover:opacity-90 transition"
        onClick={onTogglePeople}
      >
        {showPeople ? (
          <i className="ri-close-large-line"></i>
        ) : (
          <i className="ri-group-fill"></i>
        )}
      </button>
    </header>
  );
};

export default ChatHeader;