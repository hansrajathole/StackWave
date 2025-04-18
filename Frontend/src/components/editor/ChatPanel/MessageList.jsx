import React from "react";

const MessageList = ({ messages, currentUserId, messageBoxRef }) => {
  return (
    <div
      ref={messageBoxRef}
      className="message-box p-2 flex-grow flex flex-col gap-2 overflow-auto max-h-full scrollbar-hide hide-scrollbar"
    >
      {messages.map((msg, index) => (
        <div
          key={index}
          className={`${
            msg.sender?._id === currentUserId ? "ml-auto" : ""
          } message flex flex-col p-2 bg-white dark:bg-gray-800 shadow-sm border border-gray-100 dark:border-gray-700 text-gray-950 dark:text-gray-100 w-fit max-w-[80%] rounded-md`}
        >
          <small className="opacity-65 text-xs font-medium">
            {msg.sender?.username || "Unknown"}
            {msg.sender?._id === currentUserId && " (You)"}
          </small>
          <div className="text-sm w-full">
            <p className="break-words">{msg.text}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MessageList;