// ChatWindow.jsx
import { useState } from "react";

const ChatWindow = ({ selectedUser }) => {
  const [messages, setMessages] = useState({});
  const [input, setInput] = useState("");

  if (!selectedUser) {
    return (
      <div className="flex-1 flex items-center justify-center text-zinc-500 text-lg">
        Select a user to start chatting
      </div>
    );
  }

  const handleSend = () => {
    if (!input.trim()) return;

    setMessages((prev) => ({
      ...prev,
      [selectedUser.id]: [
        ...(prev[selectedUser.id] || []),
        {
          text: input,
          time: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
        },
      ],
    }));
    setInput("");
  };

  return (
    <div className="flex-1 flex flex-col ">
      {/* Header */}
      <div className="p-4 border-b border-zinc-700 text-lg font-medium bg-zinc-800">
        Chat with {selectedUser.name}
      </div>

      {/* Messages */}
      <div className="flex-1 p-4 overflow-y-auto space-y-3">
        {(messages[selectedUser.id] || []).map((msg, index) => (
          <div key={index} className="flex justify-end">
            <div className="bg-blue-600 px-4 py-2 rounded-xl text-sm max-w-[70%]">
              {msg.text}
              <div className="text-xs text-right text-zinc-300 mt-1">{msg.time}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Input */}
      <div className="p-4 border-t border-zinc-700 bg-zinc-800 flex gap-2">
        <input
          className="flex-1 px-4 py-2 rounded-xl bg-zinc-700 text-white outline-none"
          placeholder="Type a message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
        />
        <button
          onClick={handleSend}
          className="bg-blue-600 px-4 py-2 rounded-xl hover:bg-blue-700"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatWindow;
