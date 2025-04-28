import React from "react";
import { Button } from "@/components/ui/button";
import LeaveRoomDialog from "./dialogs/LeaveRoomDialog";
import PromptDialog from "./dialogs/PromptDialog";
import { IoIosArrowDown } from "react-icons/io";
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
  console.log(isLeaveOpen)
  console.log(isFix)
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
          onClick={()=>{
            setisFix(!isFix)
            onFix()
          }}

        >
         {isFix ? "Fixing..." : "Fix Code"}
        </Button>
        <Button
          className="bg-blue-600 hover:bg-blue-700 transition"
         
        >
          <span  onClick={onRun} > Run Code</span>
          {/* <IoIosArrowDown /> */}
        </Button>
      </div>
    </div>
  );
};

export default EditorToolbar;