import React from "react";

const MembersPanel = ({ show, participants, currentUserId, onClose }) => {
  return (
    <div
      className={`sidePannel backdrop-blur-xl h-full absolute top-0 left-0 w-full bg-gray-100/95 dark:bg-gray-900/95 transition-all duration-300 ${
        show ? "translate-x-0" : "-translate-x-full"
      } z-10`}
    >
      <header className="text-lg font-semibold p-2 border-b border-gray-300 dark:border-gray-700 flex justify-end">
        <button
          className="rounded-full dark:text-gray-800 dark:bg-white bg-gray-800 text-white px-2 py-1 hover:opacity-90 transition"
          onClick={onClose}
        >
          <i className="ri-close-large-line"></i>
        </button>
      </header>
      <div className="flex flex-col">
        <h3 className="text-lg font-semibold px-2 py-2">Members:</h3>
        <div className="p-2 flex flex-col gap-2">
          {participants?.map((user, ind) => (
            <div
              key={ind}
              className="flex items-center gap-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-2 rounded shadow-sm"
            >
              <img
                src={user.avatar}
                alt="avatar"
                className="w-10 h-10 rounded-full border border-gray-200 dark:border-gray-600"
              />
              <div>
                <p className="text-sm font-semibold">{user.username}</p>
                {user._id === currentUserId && (
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    (You)
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MembersPanel;