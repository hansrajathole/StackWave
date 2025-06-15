import { useState, useEffect, useRef } from "react";
import socket from "../socket/socket";
import axios from "axios";

export const useChat = (roomId, userId) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [showPeople, setShowPeople] = useState(false);
  const [roomData, setRoomData] = useState({});
  const [code, setCode] = useState("");
  const messageBoxRef = useRef(null);

  const baseUrl = import.meta.env.VITE_BACKEND_URL

  // Fetch room data and messages
  useEffect(() => {
    if (!roomId) return;

    const loadRoom = async () => {
      try {
        const res = await axios.get(`${baseUrl}/api/rooms/${roomId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setRoomData(res.data);
        setMessages(res.data.messages || []);
        // setCode(res.data.codeContent);
      } catch (error) {
        // console.error("Failed to load room data:", error);
      }
    };

    loadRoom();
    
    // Join room via socket
    socket.emit("joinRoom", { roomId, userId });

    return () => {
      socket.emit("leaveRoom", { roomId });
    };
  }, [roomId, userId]);

  // Setup message listener
  useEffect(() => {
    if (!roomId) return;

    const handleMessage = (msg) => {
      setMessages((prev) => [...prev, msg]);
    };

    socket.on("receiveMessage", handleMessage);

    return () => {
      socket.off("receiveMessage", handleMessage);
    };
  }, [roomId]);

  // Auto-scroll to bottom when new messages come in
  useEffect(() => {
    if (messageBoxRef.current) {
      messageBoxRef.current.scrollTop = messageBoxRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = () => {
    if (input.trim() === "") return;

    const message = {
      roomId,
      userId,
      text: input,
      sender: roomData.participants?.find(p => p._id === userId) || { _id: userId },
    };

    socket.emit("sendMessage", { roomId, userId, text: input });
    setMessages((prev) => [...prev, message]);
    setInput("");
  };

  return {
    messages,
    input,
    code,
    setInput,
    showPeople,
    setShowPeople,
    roomData,
    messageBoxRef,
    handleSendMessage
  };
};