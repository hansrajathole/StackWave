import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import LeaveRoomDialog from "./dialogs/LeaveRoomDialog";
import PromptDialog from "./dialogs/PromptDialog";
import { FiCopy, FiCheck } from "react-icons/fi";

const EditorToolbar = ({
  roomData,
  isLeaveOpen,
  setIsLeaveOpen,
  isPromptOpen,
  setIsPromptOpen,
  prompt,
  setPrompt,
  onLeave,
  onFix,
  onRun,
  onGenerate,
  isFix,
  setisFix,
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopyRoomId = () => {
    if (roomData?.roomId) {
      navigator.clipboard.writeText(roomData.roomId)
        .then(() => {
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
        })
        .catch(err => {
          console.error("Failed to copy room ID: ", err);
        });
    }
  };

  return (
    <div className="flex justify-between p-3 shadow dark:shadow-lg border-b border-gray-200 dark:border-gray-800 max-sm:flex-col gap-2">
      
      {/* Left Section */}
      <div className="flex gap-3 items-center flex-wrap max-sm:w-full max-sm:justify-between">
        <LeaveRoomDialog
          isOpen={isLeaveOpen}
          setIsOpen={setIsLeaveOpen}
          onLeave={onLeave}
        />
        <span className="px-3 py-1 rounded bg-gray-100 dark:bg-gray-700 text-md cursor-not-allowed max-sm:text-sm max-sm:px-2">
          {roomData?.title || "Loading..."}
        </span>
        <span className="px-3 py-1 rounded bg-gray-200 text-black dark:bg-gray-800 dark:text-white text-sm font-medium max-sm:text-xs max-sm:px-2 max-sm:hidden">
          {roomData?.language || "..."}
        </span>
        <Button
          className="flex items-center gap-1 bg-gray-200 hover:bg-gray-300 text-gray-700 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-white transition max-sm:text-xs"
          onClick={handleCopyRoomId}
          title="Copy Room ID"
          disabled={!roomData?.roomId}
        >
          {copied ? (
            <>
              <FiCheck className="text-green-500" />
              <span className="text-xs">Copied!</span>
            </>
          ) : (
            <>
              <FiCopy />
              <span className="text-xs">Copy ID</span>
            </>
          )}
        </Button>
      </div>

      {/* Right Section */}
      <div className="flex gap-3 max-sm:flex-wrap max-sm:justify-between max-sm:w-full">
        <PromptDialog
          isOpen={isPromptOpen}
          setIsOpen={setIsPromptOpen}
          prompt={prompt}
          setPrompt={setPrompt}
          onGenerate={onGenerate}
        />
        <Button
          className="bg-gray-700 hover:bg-gray-600 transition active:scale-95 max-sm:flex-1"
          onClick={() => {
            setisFix(!isFix);
            onFix();
          }}
        >
          {isFix ? "Fixing..." : "Fix Code"}
        </Button>
        <Button
          className="bg-blue-600 hover:bg-blue-700 transition max-sm:flex-1"
          onClick={onRun}
        >
          Run Code
        </Button>
      </div>
    </div>
  );
};

export default EditorToolbar;
