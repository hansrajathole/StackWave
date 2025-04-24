import React, { useState, useRef, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Editor } from "@monaco-editor/react";
import socket from "../../socket/socket";
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";

const CollabEditor = () => {
  const { roomId } = useParams();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);
  const userId = user._id;
  const [roomData, setroomData] = useState({});

  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [code, setCode] = useState("");
  const [output, setOutput] = useState("");
  const [prompt, setPrompt] = useState("");
  const [showRunCode, setShowRunCode] = useState(false);
  const [showPeople, setShowPeople] = useState(false);
  const [isLeaveOpen, setIsLeaveOpen] = useState(false);
  const [isPromptOpen, setisPromptOpen] = useState(false);
  const messageBox = React.createRef();
  const baseUrl = "https://stackwave-y6a7.onrender.com"

  const editorRef = useRef();

  const onMount = (editor) => {
    editorRef.current = editor;
    editor.focus();
  };

  useEffect(() => {
    const loadRoom = async () => {
      const res = await axios.get(`${baseUrl}/api/rooms/${roomId}`, {
        headers: {
          Authorization: `bearer ${localStorage.getItem("token")}`,
        },
      });

      setroomData(res.data);
      setCode(res.data.codeContent);
      setMessages(res.data.messages || []);
    };
    loadRoom();

    socket.emit("joinRoom", { roomId, userId: user._id });

    socket.on("codeUpdate", (code) => {
      setCode(code);
    });

    return () => {
      socket.emit("leaveRoom", { roomId });
      socket.off("codeUpdate");
    };
  }, [roomId]);

  useEffect(() => {
    const handleMessage = (msg) => {
      setMessages((prev) => [...prev, msg]);
    };

    socket.on("receiveMessage", handleMessage);

    return () => {
      socket.off("receiveMessage", handleMessage);
    };
  }, [roomId]);

  const handleCodeChange = (newCode) => {
    setCode(newCode);
    socket.emit("codeChange", { roomId, code: newCode });
  };

  const handleSend = () => {
    if (input.trim() === "") return;

    const message = {
      roomId,
      userId,
      text: input,
      sender: { _id: user._id, username: user.username, avatar: user.avatar },
    };

    socket.emit("sendMessage", { roomId, userId, text: input });
    setMessages((prev) => [...prev, message]);
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

  const runCode = async () => {
    setOutput("Running...");
    await axios
      .post(
        `${baseUrl}/api/code/run`,
        {
          code,
          language: roomData.language,
        },
        {
          headers: {
            Authorization: `bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => {
        console.log(res.data.output);

        console.log(
          "Output:",
          res.data.output.stdout || res.data.output.stderr
        );
        const result = res.data.output;
        setOutput(result.stderr || result.stdout || "No output");
      })
      .catch((error) => {
        console.error(error);
        setOutput("Error running code.");
      });
  };

  const handleFix = (code) => {
    if (code.trim() === "") {
      toast.error("you not write any code in your code Editor");
      return;
    }
    console.log(code);

    axios
      .post(
        `${baseUrl}/api/ai/fix `,
        { code },
        {
          headers: {
            Authorization: `bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => {
        console.log(res.data);
        setCode(res.data.fixCode);
        // console.log(code);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const handleGenerate = () => {
    if(prompt.trim()=== '')return
    console.log("Generating with prompt:", prompt);
    axios
      .post(
        `${baseUrl}/api/ai/generatecode`,
        { prompt },
        {
          headers: {
            Authorization: `bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => {
        console.log(res.data);
        setisPromptOpen(!isPromptOpen)
        setCode(res.data.generatedCode);
      })
      .catch((err) => {
        console.log(err.message);
      });
};

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
          <Dialog open={isPromptOpen} onOpenChange={setisPromptOpen}>
            <DialogTrigger asChild>
              <Button className="bg-purple-700 hover:bg-purple-800">
                Generate
              </Button>
            </DialogTrigger>

            <DialogContent className="bg-white dark:bg-gray-800 text-black dark:text-white">
              <DialogHeader>Enter your prompt</DialogHeader>

              <Textarea
                placeholder="Write your prompt here..."
                className="min-h-[100px] mt-2"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
              />

              <DialogFooter>
                <Button variant="ghost" onClick={() => {
                  setPrompt("")
                  setisPromptOpen(false)}}>
                  Cancel
                </Button>
                <Button variant="" onClick={handleGenerate}>
                  Generate
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          <Button
            className="bg-gray-700 hover:bg-gray-600"
            onClick={() => handleFix(code)}
          >
            Fix
          </Button>
          <Button
            className="bg-blue-600 hover:bg-blue-700"
            onClick={() => {
              setShowRunCode(true);
              runCode();
            }}
          >
            Run Code
          </Button>
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
            className="message-box p-1 flex-grow flex flex-col gap-1 overflow-auto max-h-full scrollbar-hide hide-scrollbar"
          >
            {messages.map((msg, index) => (
              <div
                key={index}
                className={` ${
                  msg.sender?._id == user?._id.toString() && "ml-auto"
                }  message flex flex-col p-2 bg-slate-50 dark:text-gray-950 w-fit rounded-md`}
              >
                <small className="opacity-65 text-xs">
                  {msg.sender?.username}
                  <small>{msg?.sender?._id === userId && "(You)"}</small>
                </small>
                <div className="text-sm max-w-36  w-full">
                  <p className="break-words">{msg.text}</p>
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
            <Button
              onClick={handleSend}
              className="bg-blue-600 hover:bg-blue-700"
            >
              <i className="ri-send-plane-fill"></i>
            </Button>
          </div>
          <div
            className={`sidePannel backdrop-blur-xl h-full absolute w-full transition-all ${
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
            <div className="flex flex-col">
              <h3 className="text-lg font-semibold px-2">Members :</h3>
              <div className="p-2 flex flex-col gap-1 ">
                {roomData?.participants?.map((user, ind) => (
                  <div
                    key={ind}
                    className="flex items-center gap-3  bg-gray-200 dark:bg-[#4b484896] p-1 rounded"
                  >
                    <img
                      src={user.avatar}
                      alt="avatar"
                      className="w-10 h-10 rounded-full"
                    />
                    <div>
                      <p className="text-sm font-semibold">{user.username}</p>
                      {user._id == userId ? (
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          (You)
                        </p>
                      ) : (
                        <> </>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Code Editor */}
        <div className="flex-1 flex flex-col relative">
          <div className="flex-1 rounded">
            <Editor
              height="100%"
              language={roomData.language}
              value={code}
              onChange={handleCodeChange}
              theme="vs-dark"
              onMount={onMount}
              options={{
                minimap: { enabled: false },
                fontSize: 14,
              }}
            />
          </div>
          {showRunCode && (
            <div
              className="absolute bottom-0 left-0 right-0 bg-black text-white z-50 border-t border-gray-700 resize-y overflow-auto hide-scrollbar"
              style={{ height: "300px", minHeight: "100px", maxHeight: "60vh" }}
            >
              <div className="flex items-center justify-between bg-gray-800 px-4 py-2 border-b border-gray-700">
                <p className="text-sm font-semibold">Output</p>
                <button
                  onClick={() => setShowRunCode(false)}
                  className="text-white hover:text-red-500"
                >
                  <i className="ri-close-line text-lg"></i>
                </button>
              </div>
              <div className="p-3 h-full overflow-y-auto text-sm font-mono whitespace-pre-wrap">
                {output || "Running..."}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CollabEditor;
