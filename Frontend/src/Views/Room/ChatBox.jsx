// src/components/ChatBox.jsx
import { useState } from "react";

const ChatBox = ({ messages, sendMessage }) => {
  const [text, setText] = useState("");

  const handleSend = () => {
    if (text.trim() !== "") {
      sendMessage(text);
      setText("");
    }
  };

  return (
    <div className="mt-4 border rounded p-2 bg-gray-800 text-white">
      <div className="h-40 overflow-y-auto mb-2">
        {messages.map((msg, idx) => (
          <div key={idx} className="mb-1">
            <strong>{msg.sender?.username || "User"}:</strong> {msg.text}
          </div>
        ))}
      </div>
      <div className="flex gap-2">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type message..."
          className="flex-1 p-1 text-black"
        />
        <button onClick={handleSend} className="bg-blue-500 px-3 py-1 rounded">
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatBox;
