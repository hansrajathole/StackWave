import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { LANGUAGE_OPTIONS } from "../../utils/constants";

const CreateProjectDialog = ({ onCreate, loading }) => {
  const [open, setOpen] = useState(false);
  const [language, setLanguage] = useState("");
  const [title, setTitle] = useState("");

  const handleCreateClick = async () => {
    const success = await onCreate(language, title);
    if (success) {
      setOpen(false);
      setLanguage("");
      setTitle("");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className="bg-blue-500 px-4 py-2 rounded-md text-white hover:bg-blue-600 transition">
        New Project +
      </DialogTrigger>
      <DialogContent className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white p-6 rounded-lg w-[425px]">
        <DialogHeader>
          <DialogTitle>Create New Project</DialogTitle>
          <DialogDescription>
            Start coding with your friends by creating a new project and
            start debugging with AI.
          </DialogDescription>

          <div className="flex items-center justify-between gap-2 mt-4">
            <label htmlFor="project" className="text-sm font-medium">
              Title
            </label>
            <Input
              type="text"
              placeholder="Project Name"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="bg-gray-100 dark:bg-gray-800 w-[70%] px-3 py-1 rounded-md border-none ring-0 focus-visible:ring-0"
            />
          </div>

          <div className="flex items-center justify-between gap-2 mt-4">
            <label className="text-sm font-medium">Language</label>
            <Select onValueChange={setLanguage} value={language}>
              <SelectTrigger className="w-[70%] bg-gray-100 dark:bg-gray-800 text-black dark:text-white border-none">
                <SelectValue placeholder="Select a language" />
              </SelectTrigger>
              <SelectContent className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white">
                {LANGUAGE_OPTIONS.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex justify-end mt-8">
            <Button
              variant="secondary"
              onClick={handleCreateClick}
              className="bg-green-500 hover:bg-green-600 text-white transition"
              disabled={loading}
            >
              {loading ? "Creating..." : "Create Project +"}
            </Button>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default CreateProjectDialog;