// UserChatApp.jsx
import { useState } from "react";

const users = [
  { id: 1, name: "Alice 🧑‍💻" },
  { id: 2, name: "Bob 📱" },
  { id: 3, name: "Charlie 🌐" },
];

const Chat = () => {
  const [selectedUser, setSelectedUser] = useState(null);
  const [messages, setMessages] = useState({});
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;

    setMessages((prev) => ({
      ...prev,
      [selectedUser.id]: [
        ...(prev[selectedUser.id] || []),
        { text: input, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) },
      ],
    }));
    setInput("");
  };

  return (
    <div className="h-screen flex bg-zinc-900 text-white">

      {/* User List */}
      <div className="w-64 bg-zinc-800 border-r border-zinc-700 p-4 space-y-2">
        <h2 className="text-xl font-bold mb-4">Users</h2>
        {users.map((user) => (
          <div
            key={user.id}
            onClick={() => setSelectedUser(user)}
            className={`p-3 rounded-lg cursor-pointer hover:bg-zinc-700 ${
              selectedUser?.id === user.id ? "bg-zinc-700" : ""
            }`}
          >
            {user.name}
          </div>
        ))}
      </div>

      {/* Chat Section */}
      {selectedUser && (
        <div className="flex-1 flex flex-col">
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
      )}
    </div>
  );
};

export default Chat;
