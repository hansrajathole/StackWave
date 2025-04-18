import React from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

const LeaveRoomDialog = ({ isOpen, setIsOpen, onLeave }) => {
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="text-black dark:text-white border border-gray-300 dark:border-gray-700 hover:bg-red-600 hover:text-white transition"
        >
          <i className="ri-arrow-left-box-line text-xl mr-2"></i>Leave
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-white dark:bg-gray-800 text-black dark:text-white">
        <DialogHeader>Are you sure you want to leave?</DialogHeader>
        <DialogFooter>
          <Button variant="ghost" onClick={() => setIsOpen(false)}>
            Cancel
          </Button>
          <Button variant="destructive" onClick={onLeave}>
            Leave Room
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default LeaveRoomDialog;