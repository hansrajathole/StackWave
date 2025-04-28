import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import EditorToolbar from "./EditorToolbar";
import CodeEditor from "./CodeEditor";
import OutputPanel from "./OutputPanel";
import ChatPanel from "./ChatPanel/ChatPanel";
import { useCodeEditor } from "../../hooks/useCodeEditor";
import { useChat } from "../../hooks/useChat";

const CollabEditor = () => {
  const { roomId } = useParams();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);
  const userId = user._id;
  const [isLeaveOpen, setIsLeaveOpen] = useState(false);

  // Initialize hooks
  const {
    code,
    output,
    showRunCode,
    setShowRunCode,
    prompt,
    setPrompt,
    isPromptOpen,
    setIsPromptOpen,
    handleCodeChange,
    handleRunCode,
    handleFixCode,
    handleGenerateCode,
    onEditorMount,
    isFix,
    setisFix,

  } = useCodeEditor(roomId);

  const {
    messages,
    input,
    setInput,
    showPeople,
    setShowPeople,
    roomData,
    messageBoxRef,
    handleSendMessage
  } = useChat(roomId, userId);

  const handleLeave = () => {
    setIsLeaveOpen(false);
    navigate("/rooms");
  };
  
  return (
    
    <div className="h-screen w-full mx-auto bg-white dark:bg-gray-900 text-gray-900 dark:text-white flex flex-col overflow-hidden">
      {/* Toolbar */}
      <EditorToolbar
        roomData={roomData}
        isLeaveOpen={isLeaveOpen}
        setIsLeaveOpen={setIsLeaveOpen}
        isPromptOpen={isPromptOpen}
        setIsPromptOpen={setIsPromptOpen}
        prompt={prompt}
        setPrompt={setPrompt}
        onLeave={handleLeave}
        onFix={() => handleFixCode()}
        onRun={() => handleRunCode(roomData.language)}
        onGenerate={handleGenerateCode}
        isFix={isFix}
        setisFix={setisFix}
      />

      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Chat Panel */}
        <ChatPanel
          messages={messages}
          input={input}
          setInput={setInput}
          showPeople={showPeople}
          setShowPeople={setShowPeople}
          roomData={roomData}
          messageBoxRef={messageBoxRef}
          currentUserId={userId}
          onSendMessage={handleSendMessage}
        />

        {/* Code Editor */}
        <div className="flex-1 flex flex-col relative">
          <CodeEditor
            language={roomData.language}
            code={code}
            onChange={handleCodeChange}
            onMount={onEditorMount}
          />
          
          <OutputPanel
            output={output}
            isVisible={showRunCode}
            onClose={() => setShowRunCode(false)}
          />
        </div>
      </div>
    </div>
  );
};

export default CollabEditor;