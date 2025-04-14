import React, { useState, useRef, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Editor } from "@monaco-editor/react";
import socket from "../../socket/socket";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import axios from "axios";

const CollabEditor = () => {
  const { roomId } = useParams();
  console.log(roomId);
  
  const navigate = useNavigate();

  const [code, setCode] = useState("function functionName (parameters) {\n  \n}");
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [showPeople, setShowPeople] = useState(true);
  const [isLeaveOpen, setIsLeaveOpen] = useState(false);
  const chatEndRef = useRef(null);
  const userId = localStorage.getItem("userId");
  const username = localStorage.getItem("username") || "You";

  // Auto scroll chat
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Load Room Data
  useEffect(() => {
    const loadRoom = async () => {
      const res = await axios.get(`http://localhost:3000/api/rooms/${roomId}`,
        {
          headers : {
            Authorization : `bearer ${localStorage.getItem("token")}`
          }
        }
      );
      console.log(res);
      
      setCode(res.data.codeContent || "");
      setMessages(res.data.messages || []);
    };
    loadRoom();

    socket.emit("joinRoom", { roomId, userId });

    socket.on("codeUpdate", setCode);
    socket.on("receiveMessage", (msg) => setMessages((prev) => [...prev, msg]));

    return () => {
      socket.emit("leaveRoom", { roomId });
      socket.off("codeUpdate");
      socket.off("receiveMessage");
    };
  }, [roomId]);

  const handleCodeChange = (newCode) => {
    setCode(newCode);
    socket.emit("codeChange", { roomId, code: newCode });
  };

  const handleSend = () => {
    if (input.trim() === "") return;
    const message = { sender: { username }, text: input };
    setMessages((prev) => [...prev, message]);
    socket.emit("sendMessage", { roomId, userId, text: input });
    setInput("");
  };

  const handleLeave = () => {
    setIsLeaveOpen(false);
    navigate("/rooms");
  };

  return (
    <div className="h-screen mx-auto p-4 bg-[#0f0f0f] text-white flex flex-col overflow-hidden">
      {/* Toolbar */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex gap-3 items-center">
          <Dialog open={isLeaveOpen} onOpenChange={setIsLeaveOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" className="border-gray-600 hover:bg-gray-700">Leave</Button>
            </DialogTrigger>
            <DialogContent className="bg-[#1e1e1e] text-white">
              <DialogHeader>Are you sure you want to leave?</DialogHeader>
              <DialogFooter>
                <Button variant="ghost" onClick={() => setIsLeaveOpen(false)}>Cancel</Button>
                <Button variant="destructive" onClick={handleLeave}>Leave Room</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          <span className="bg-gray-800 text-sm px-2 py-1 rounded">rust</span>
          <span className="bg-gray-200 text-black text-sm px-2 py-1 rounded">Rust</span>
        </div>

        <div className="flex gap-3">
          <Button className="bg-purple-700 hover:bg-purple-800">Generate</Button>
          <Button className="bg-gray-700 hover:bg-gray-600">Fix</Button>
          <Button className="bg-blue-600 hover:bg-blue-700">Run Code</Button>
        </div>
      </div>

      {/* Main Body */}
      <div className="flex flex-1 overflow-hidden rounded-lg border border-gray-700 relative">
        {/* Chat Panel */}
        <div className="min-w-[280px] bg-[#1e1e1e] flex flex-col border-r border-gray-700">
          <h3 className="text-lg font-semibold p-3 border-b border-gray-700">💬 Chat</h3>
          <div className="flex-1 p-3 overflow-y-auto space-y-2">
            {messages.map((msg, idx) => (
              <div key={idx} className="bg-[#2a2a2a] p-2 rounded text-sm">
                <span className="font-semibold text-blue-400 block mb-1">{msg.sender?.username || "User"}</span>
                <p className="text-gray-300">{msg.text}</p>
              </div>
            ))}
            <div ref={chatEndRef} />
          </div>
          <div className="p-3 border-t border-gray-700 flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder="Type a message..."
              className="flex-1 px-3 py-2 bg-[#2a2a2a] rounded text-sm focus:outline-none focus:ring focus:ring-blue-500"
            />
            <button
              onClick={handleSend}
              className="bg-blue-600 px-3 py-2 rounded hover:bg-blue-700 text-sm"
            >
              Send
            </button>
          </div>
        </div>

        {/* Code Editor */}
        <div className="flex-1 flex flex-col px-2 relative">
          <div className="flex-1 rounded overflow-hidden border border-gray-700">
            <Editor
              height="100%"
              defaultLanguage="rust"
              value={code}
              onChange={handleCodeChange}
              theme="vs-dark"
              options={{
                minimap: { enabled: false },
                fontSize: 14,
              }}
            />
          </div>

          {/* Toggle Button */}
          <div className="absolute bottom-4 right-4 z-10">
            <button
              onClick={() => setShowPeople((prev) => !prev)}
              className="bg-gray-800 border border-gray-600 px-3 py-1 text-sm rounded hover:bg-gray-700 transition"
            >
              {showPeople ? "Hide" : "Show"} Users
            </button>
          </div>
        </div>

        {/* People Panel */}
        {showPeople && (
          <div className="w-[280px] bg-[#1a1a1a] border-l border-gray-800 p-4">
            <h3 className="text-lg font-semibold mb-4">People</h3>
            <div className="bg-[#222] p-3 rounded flex items-center gap-3 mb-2">
              <img
                src="https://avatars.githubusercontent.com/u/0000000?v=4"
                alt="avatar"
                className="w-8 h-8 rounded-full"
              />
              <div>
                <p className="text-sm font-semibold">{username}</p>
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
