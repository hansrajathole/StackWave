import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import LeaveRoomDialog from "./dialogs/LeaveRoomDialog";
import PromptDialog from "./dialogs/PromptDialog";
import { IoIosArrowDown } from "react-icons/io";
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
          setTimeout(() => setCopied(false), 2000); // Reset after 2 seconds
        })
        .catch(err => {
          console.error("Failed to copy room ID: ", err);
        });
    }
  };

  return (
    <div className="flex items-center justify-between p-3 shadow dark:shadow-lg border-b border-gray-200 dark:border-gray-800">
      <div className="flex gap-3 items-center">
        <LeaveRoomDialog
          isOpen={isLeaveOpen}
          setIsOpen={setIsLeaveOpen}
          onLeave={onLeave}
        />
        <span className="px-3 py-1 rounded bg-gray-100 dark:bg-gray-700 text-md cursor-not-allowed">
          {roomData?.title || "Loading..."}
        </span>
        <span className="px-3 py-1 rounded bg-gray-200 text-black dark:bg-gray-800 dark:text-white text-sm font-medium">
          {roomData?.language || "..."}
        </span>
        <Button
          className="flex items-center gap-1 bg-gray-200 hover:bg-gray-300 text-gray-700 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-white transition"
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

      <div className="flex gap-3">
        <PromptDialog
          isOpen={isPromptOpen}
          setIsOpen={setIsPromptOpen}
          prompt={prompt}
          setPrompt={setPrompt}
          onGenerate={onGenerate}
        />
        <Button
          className="bg-gray-700 hover:bg-gray-600 transition active:scale-95"
          onClick={() => {
            setisFix(!isFix);
            onFix();
          }}
        >
          {isFix ? "Fixing..." : "Fix Code"}
        </Button>
        <Button
          className="bg-blue-600 hover:bg-blue-700 transition"
          onClick={onRun}
        >
          <span>Run Code</span>
          {/* <IoIosArrowDown /> */}
        </Button>
      </div>
    </div>
  );
};

export default EditorToolbar;