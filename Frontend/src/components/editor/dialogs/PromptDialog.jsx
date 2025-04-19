import React from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

const PromptDialog = ({ isOpen, setIsOpen, prompt, setPrompt, onGenerate }) => {
  const handleCancel = () => {
    setPrompt("");
    setIsOpen(false); 
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="bg-purple-700 hover:bg-purple-800 transition">
          Generate
        </Button>
      </DialogTrigger>

      <DialogContent className="bg-white dark:bg-gray-800 text-black dark:text-white">
        <DialogHeader>Enter your prompt</DialogHeader>

        <Textarea
          placeholder="Write your prompt here..."
          className="min-h-[100px] mt-2 bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-700"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />

        <DialogFooter>
          <Button variant="ghost" onClick={handleCancel}>
            Cancel
          </Button>
          <Button className="bg-purple-700 hover:bg-purple-800" onClick={onGenerate}>
            Generate
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default PromptDialog;