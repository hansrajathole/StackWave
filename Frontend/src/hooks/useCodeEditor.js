import { useState, useEffect, useRef } from "react";
import socket from "../socket/socket";
import { runCode } from "../services/codeService";
import { fixCode, generateCode } from "../services/aiService";
import toast from "react-hot-toast";

export const useCodeEditor = (roomId, initialCode = "", language = "") => {
  const [code, setCode] = useState(initialCode);
  const [output, setOutput] = useState("");
  const [showRunCode, setShowRunCode] = useState(false);
  const [prompt, setPrompt] = useState("");
  const [isPromptOpen, setIsPromptOpen] = useState(false);
  const editorRef = useRef(null);

  useEffect(() => {
    if (!roomId) return;

    // Set up socket listener for code updates
    const handleCodeUpdate = (updatedCode) => {
      setCode(updatedCode);
    };

    socket.on("codeUpdate", handleCodeUpdate);

    return () => {
      socket.off("codeUpdate", handleCodeUpdate);
    };
  }, [roomId]);

  const handleCodeChange = (newCode) => {
    setCode(newCode);
    socket.emit("codeChange", { roomId, code: newCode });
  };

  const handleRunCode = async (language) => {
    setOutput("Running...");
    setShowRunCode(true);
    
    try {
      const result = await runCode(code, language);
      setOutput(result.stderr || result.stdout || "No output");
    } catch (error) {
      console.error(error);
      setOutput("Error running code.");
    }
  };

  const handleFixCode = async () => {
    if (code.trim() === "") {
      toast.error("You need to write code in the editor first");
      return;
    }
    
    try {
      const result = await fixCode(code);
      setCode(result.fixCode);
      toast.success("Code fixed successfully");
    } catch (error) {
      toast.error("Failed to fix code");
      console.error(error);
    }
  };

  const handleGenerateCode = async () => {
    if (prompt.trim() === "") {
      toast.error("Please enter a prompt first");
      return;
    }
    
    try {
      const result = await generateCode(prompt);
      setCode(result.generatedCode);
      setIsPromptOpen(false);
      setPrompt("");
      toast.success("Code generated successfully");
    } catch (error) {
      toast.error("Failed to generate code");
      console.error(error);
    }
  };

  const onEditorMount = (editor) => {
    editorRef.current = editor;
    editor.focus();
  };

  return {
    code,
    setCode,
    output,
    showRunCode,
    setShowRunCode,
    prompt,
    setPrompt,
    isPromptOpen,
    setIsPromptOpen,
    editorRef,
    handleCodeChange,
    handleRunCode,
    handleFixCode,
    handleGenerateCode,
    onEditorMount
  };
};