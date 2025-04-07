// Chat.jsx
import { useState } from "react";
import { Send } from "lucide-react";

const Chat = () => {
  const [messages, setMessages] = useState([
    { id: 1, text: "Hey there!", sender: "other", time: "10:00 AM" },
    { id: 2, text: "Hi! How are you?", sender: "me", time: "10:01 AM" },
  ]);
  const [input, setInput] = useState("");

  const sendMessage = () => {
    if (!input.trim()) return;
    setMessages([...messages, { id: Date.now(), text: input, sender: "me", time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }]);
    setInput("");
  };

  return (
    <div className="h-screen w-full bg-zinc-900 text-white flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-2xl h-[600px] bg-zinc-800 rounded-2xl shadow-lg flex flex-col overflow-hidden">
        
        {/* Header */}
        <div className="p-4 border-b border-zinc-700 text-lg font-semibold">
          Chat with DevBot
        </div>
        
        {/* Chat Messages */}
        <div className="flex-1 p-4 space-y-3 overflow-y-auto">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.sender === "me" ? "justify-end" : "justify-start"}`}
            >
              <div className={`rounded-xl px-4 py-2 max-w-[70%] text-sm ${msg.sender === "me" ? "bg-blue-600" : "bg-zinc-700"}`}>
                {msg.text}
                <div className="text-xs text-zinc-300 mt-1 text-right">
                  {msg.time}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Input Field */}
        <div className="p-4 border-t border-zinc-700 flex items-center gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            placeholder="Type your message..."
            className="flex-1 px-4 py-2 rounded-xl bg-zinc-700 text-white outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={sendMessage}
            className="bg-blue-600 p-2 rounded-xl hover:bg-blue-700 transition"
          >
            <Send className="w-5 h-5 text-white" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
