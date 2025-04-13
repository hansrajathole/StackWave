import React, { useState } from "react";
import Editor from "@monaco-editor/react";

const CollabEditor = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [showPeople, setShowPeople] = useState(true);

  const handleSend = () => {
    if (input.trim() === "") return;
    setMessages((prev) => [...prev, { text: input, sender: "You" }]);
    setInput("");
  };

  return (
    <div className="min-h-screen mx-auto p-4 bg-[#0f0f0f] text-white overflow-hidden">
      {/* Toolbar */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex gap-3 items-center">
          <button className="border border-gray-600 px-3 py-1 rounded hover:bg-gray-700 transition">
            Leave
          </button>
          <span className="bg-gray-800 text-sm px-2 py-1 rounded">rust</span>
          <span className="bg-gray-200 text-black text-sm px-2 py-1 rounded">
            Rust
          </span>
        </div>

        <div className="flex gap-3">
          <button className="bg-purple-700 px-3 py-1 rounded hover:bg-purple-800">
            Generate
          </button>
          <button className="bg-gray-700 px-3 py-1 rounded hover:bg-gray-600">
            Fix
          </button>
          <button className="bg-blue-600 px-4 py-1 rounded hover:bg-blue-700">
            Run Code
          </button>
        </div>
      </div>

      {/* Main Body */}
      <div className="flex h-[calc(100vh-120px)] overflow-hidden rounded-lg border border-gray-700">
        {/* Chat Panel */}
        <div className="min-w-[280px] bg-[#1e1e1e] flex flex-col">
          <h3 className="text-lg font-semibold p-3 border-b border-gray-700">
            💬 Chat
          </h3>
          <div className="flex-1 p-3 overflow-y-auto space-y-2">
            {messages.map((msg, idx) => (
              <div key={idx} className="bg-[#2a2a2a] p-2 rounded text-sm">
                <span className="font-semibold text-blue-400">
                  {msg.sender}:
                </span>{" "}
                {msg.text}
              </div>
            ))}
          </div>
          <div className="p-3 border-t border-gray-700 flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder="Type a message..."
              className="flex-1 px-3 py-1 bg-[#2a2a2a] rounded text-sm focus:outline-none"
            />
            <button
              onClick={handleSend}
              className="bg-blue-600 px-3 py-1 rounded hover:bg-blue-700 text-sm"
            >
              Send
            </button>
          </div>
        </div>

        {/* Code Editor */}
        <div className="flex-1 flex flex-col px-2">
          <div className="flex justify-end py-2">
            <button
              onClick={() => setShowPeople((prev) => !prev)}
              className="bg-gray-700 text-sm px-3 py-1 rounded hover:bg-gray-600 transition"
            >
              {showPeople ? "Hide" : "Show"} Users
            </button>
          </div>
          <div className="flex-1 rounded overflow-hidden border border-gray-700">
            <Editor
              height="100%"
              defaultLanguage="rust"
              defaultValue={`function functionName (parameters) {
  
}`}
              theme="vs-dark"
            />
          </div>
        </div>

        {/* People Panel - Toggleable */}
        {showPeople && (
          <div className="w-[280px] border-l border-gray-800 bg-[#1a1a1a] p-4 transition-all duration-300 ease-in-out">
            <h3 className="text-lg font-semibold mb-4">People</h3>
            <div className="bg-[#222] p-3 rounded flex items-center gap-3 mb-2">
              <img
                src="https://avatars.githubusercontent.com/u/0000000?v=4"
                alt="avatar"
                className="w-8 h-8 rounded-full"
              />
              <div>
                <p className="text-sm font-semibold">Hansraj Athole</p>
                <p className="text-xs text-gray-400">(You)</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CollabEditor;
