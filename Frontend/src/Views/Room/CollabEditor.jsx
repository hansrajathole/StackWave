import React, { useState } from "react";
import Editor from "@monaco-editor/react";

const CollabEditor = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (input.trim() === "") return;
    setMessages((prev) => [...prev, { text: input, sender: "You" }]);
    setInput("");
  };

  return (
    <div className="min-h-screen mx-auto p-6 bg-[#0f0f0f] text-white">
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
      <div className="flex h-full">
        {/* Chat Panel */}
        <div className="min-w-[280px] bg-[#1e1e1e] flex flex-col rounded-l-lg border border-gray-700">
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
          <div className="flex-1 rounded overflow-hidden border border-gray-700">
            <Editor
              height="calc(100vh - 140px)"
              defaultLanguage="rust"
              defaultValue={`function functionName (parameters) {
                
              }`}
              theme="vs-dark"
            />
          </div>
        </div>

        {/* People Panel */}
        
        <div className="w-[280px] border-l border-gray-800 bg-[#1a1a1a] p-4">
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
        <div className="w-10 h-10 border border-gray-400 rounded-full text-center flex items-center justify-center ">
        <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAACXBIWXMAAAsTAAALEwEAmpwYAAAB0ElEQVR4nO2VP0ubURTGU/9VMC6ORacO1pTiEAdd/QSCjSkOUhwU2kE61M2OTiqI2qWCf2o/QbG04GKhbi4OOokGahclW5dW/ZUTnsDlcnPzksbJPONzznl+yeXc+6ZSDTV0rwU8AKaBQ+A3cAksA813DV4grCMgVw9AF7Cnf7Ut7zFwQ2X9AR6p95NmLaMrKfQF8MsJXJE/TnVNqnfN8S6AfDXoQ6Dohc2r9jYBeFa9855fBNpi4P5AWPmoRxKAR9S7Hag9i4EHAgOrNYDfB2oDMXAncO0NbKiWTwAubTaw6fl/LTsGfhoIs+VoBZqAnQj0o3ravOUsKxMDG+AkMLSgep+uiS/zeiN3/diyK4I1mAsM2lF1qz4RqE+o1qNeX6NRqIbtuL54g1/tuVR9OBA87Dyp37zarmVWBSvgtYbOgZdAi/x0IBh5afW0aMZmTa+SQoeAn8AW0CHPFmYKKFBZBfWUHgqb1X22rMEYMAt8Bm6BD87RjlUBhn5Azjn6dWVadtaHvnPu76meThtaonYtKqMdOJNnjDn3o+BqRv5z/l+lbQbeeH7ezAPPfKLm73UA7ysr4/k/UoGvUXmhruoAvnJug6tiok1vqKFUDfoHP6Pm7AnEbIcAAAAASUVORK5CYII=" alt="group" className="h-[60%] w-[60%]"/>
        </div>
      </div>
    </div>
  );
};

export default CollabEditor;
