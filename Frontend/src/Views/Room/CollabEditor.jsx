import React, { useState, useRef, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Editor } from "@monaco-editor/react";
import socket from "../../socket/socket";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";

const CollabEditor = () => {
  const { roomId } = useParams();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);
  const userId = user._id;

  const [code, setCode] = useState();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [showPeople, setShowPeople] = useState(false);
  const [isLeaveOpen, setIsLeaveOpen] = useState(false);
  const [roomData, setroomData] = useState({});
  const messageBox = React.createRef();
  const [message, setMessage] = useState('')
  useEffect(() => {
    const loadRoom = async () => {
      const res = await axios.get(`http://localhost:3000/api/rooms/${roomId}`, {
        headers: {
          Authorization: `bearer ${localStorage.getItem("token")}`,
        },
      });
      console.log(res.data.messages);
      setroomData(res.data);
      setCode(res.data.codeContent || "");
      setMessages(res.data.messages || []);
      console.log(messages);
      
    };
    loadRoom();

    socket.emit("joinRoom", { roomId, userId: user._id });

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
    const message = { sender: { username: user.username }, text: input };
    setMessages(prevMessages => [ ...prevMessages, { sender: user, message } ]) // Update messages state
    socket.emit("sendMessage", { roomId, userId, text: input });
    setInput("");
  };

  const handleLeave = () => {
    setIsLeaveOpen(false);
    navigate("/rooms");
  };

  useEffect(() => {
    if (messageBox.current) {
      messageBox.current.scrollTop = messageBox.current.scrollHeight;
    }
  }, [messages]);
  
  return (
    <div className="h-screen w-full mx-auto bg-white dark:bg-gray-900 text-gray-900 dark:text-white flex flex-col overflow-hidden">
      {/* Toolbar */}
      <div className="flex items-center justify-between p-3 shadow dark:shadow-lg border-b border-gray-200 dark:border-gray-800">
        <div className="flex gap-3 items-center">
          <Dialog open={isLeaveOpen} onOpenChange={setIsLeaveOpen}>
            <DialogTrigger asChild>
              <Button
                variant="outline"
                className="text-black dark:text-white border border-gray-300 dark:border-gray-700 hover:bg-red-600 hover:text-white"
              >
                <i className="ri-arrow-left-box-line text-xl mr-2"></i>Leave
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-white dark:bg-gray-800 text-black dark:text-white">
              <DialogHeader>Are you sure you want to leave?</DialogHeader>
              <DialogFooter>
                <Button variant="ghost" onClick={() => setIsLeaveOpen(false)}>
                  Cancel
                </Button>
                <Button variant="destructive" onClick={handleLeave}>
                  Leave Room
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          <span className="px-3 py-1 rounded bg-gray-100 dark:bg-gray-700 text-md cursor-not-allowed">
            {roomData.title}
          </span>
          <span className="px-3 py-1 rounded bg-gray-200 text-black dark:bg-gray-800 dark:text-white text-sm font-medium">
            {roomData.language}
          </span>
        </div>

        <div className="flex gap-3">
          <Button className="bg-purple-700 hover:bg-purple-800">
            Generate
          </Button>
          <Button className="bg-gray-700 hover:bg-gray-600">Fix</Button>
          <Button className="bg-blue-600 hover:bg-blue-700">Run Code</Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-1  overflow-hidden">
        {/* Chat Panel */}
        <div className="min-w-80 bg-gray-100 dark:bg-gray-900 border-r border-gray-300 dark:border-gray-800 flex flex-col relative">
          <header className="text-lg font-semibold p-2 border-b border-gray-300 dark:border-gray-700 flex justify-end">
            <button
              className="rounded-full dark:text-gray-800 dark:bg-white bg-gray-800 text-white px-2 py-1"
              onClick={() => setShowPeople(!showPeople)}
            >
              <i className="ri-group-fill"></i>
            </button>
          </header>
          <div
            ref={messageBox}
            className="message-box p-1 flex-grow flex flex-col gap-1 overflow-auto max-h-full scrollbar-hide"
          >
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`${
                  msg.sender?._id === "ai" ? "max-w-80" : "max-w-52"
                } ${
                  msg.sender?._id == user?._id.toString() && "ml-auto"
                }  message flex flex-col p-2 bg-slate-50 dark:text-gray-950 w-fit rounded-md`}
              >
                <small className="opacity-65 text-xs">
                  {msg.sender?.username}
                </small>
                <div className="text-sm max-w-36  w-full">
                <p className="break-words max-w-40">{msg.text}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="p-2 border-t border-gray-300 dark:border-gray-700 flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder="Type a message..."
              className="flex-1 px-4 py-2 rounded bg-white dark:bg-[#2a2a2a] text-black dark:text-white focus:outline-none focus:ring focus:ring-blue-500"
            />
            <Button onClick={handleSend} className="bg-blue-600 hover:bg-blue-700">
              <i className="ri-send-plane-fill"></i>
            </Button>
          </div>
          <div
            className={`sidePannel bg-red-200 h-full absolute w-full transition-all ${
              showPeople ? " translate-x-0" : "-translate-x-full"
            } `}
          >
            <header className="text-lg font-semibold p-2 border-b border-gray-300 dark:border-gray-700 flex justify-end">
              <button
                className="rounded-full dark:text-gray-800 dark:bg-white bg-gray-800 text-white px-2 py-1"
                onClick={() => setShowPeople(!showPeople)}
              >
                <i className="ri-close-large-line"></i>
              </button>
            </header>
            <div className="flex flex-col gap-2">
              <h3 className="text-lg font-semibold">People</h3>
              <div className="p-2 ">
                <div className="flex items-center gap-3  bg-gray-200 dark:bg-[#2a2a2a] p-1 rounded">
                  <img
                    src={user.avatar}
                    alt="avatar"
                    className="w-10 h-10 rounded-full"
                  />
                  <div>
                    <p className="text-sm font-semibold">{user.username}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      (You)
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Code Editor */}
        <div className="flex-1 flex flex-col relative">
          <div className="flex-1 rounded overflow-hidden">
            <Editor
              height="100%"
              defaultLanguage={roomData.language}
              value={code}
              onChange={handleCodeChange}
              theme="vs-dark"
              options={{
                minimap: { enabled: false },
                fontSize: 14,
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CollabEditor;
