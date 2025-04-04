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
import { Button } from "@/components/ui/button"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";


const Room = () => {


  return (
   <div className="mx-auto p-6 bg-gray-900 text-white min-h-full">
     <div className="bg-gray-900 text-white p-8 flex justify-between">
      <h1 className="text-2xl font-bold">My Projects</h1>

      {/* Buttons to open modals */}
      <div className="flex space-x-4 mt-4 ">
        
        <Dialog>
          <DialogTrigger className="border border-purple-500 px-4 py-2 rounded-md text-purple-400 hover:bg-purple-600">
            Join
          </DialogTrigger>
          <DialogContent className="bg-gray-900 text-white p-6 rounded-lg w-[425px]">
            <DialogHeader>
              <DialogTitle>Join Project</DialogTitle>
              <DialogDescription>
              To join a project, enter the join ID, which can be obtained from your friend.
              </DialogDescription>
              <div className="flex text-center items-center justify-between mt-4">
                <label htmlFor="project">project ID</label>
                <Input
                  type="text"
                  placeholder="Project Id"
                  className=" bg-gray-800 w-[70%] px-3 py-1 rounded-md outline-none border-none ring-0 focus-visible:ring-0 "
                />
              </div>
              <div className="flex justify-end mt-8">
                
              <Button variant="secondary" className="bg-gray-400 text-end">Join Project</Button>
              </div>
          
            </DialogHeader>
          </DialogContent>
        </Dialog>
        {/* New Project Modal */}
        <Dialog>
          <DialogTrigger className="bg-blue-500 px-4 py-2 rounded-md hover:bg-blue-600">
            New Project +
          </DialogTrigger>
          <DialogContent className="bg-gray-900 text-white p-6 rounded-lg w-[425px]">
            <DialogHeader>
              <DialogTitle>Create New Project</DialogTitle>
              <DialogDescription>
                Start coding with your friends by creating a new project and
                start debugging with AI.
              </DialogDescription>
              <div className="flex text-center items-center justify-between mt-4">
                <label htmlFor="project">Title</label>
                <Input
                  type="text"
                  placeholder="Project Name"
                  className=" bg-gray-800 w-[70%] px-3 py-1 rounded-md outline-none border-none ring-0 focus-visible:ring-0 "
                />
              </div>

              {/* Language Select Dropdown */}
              <div className="flex text-center items-center justify-between gap-2 mt-4">
                <label className="text-sm">Language</label>
                <Select>
                  <SelectTrigger className="w-[70%] bg-gray-800 text-white border-none">
                    <SelectValue placeholder="Select a language" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-800 text-white">
                    <SelectItem value="javascript">JavaScript</SelectItem>
                    <SelectItem value="python">Python</SelectItem>
                    <SelectItem value="java">Java</SelectItem>
                    <SelectItem value="c">C</SelectItem>
                    <SelectItem value="cpp">C++</SelectItem>
                    <SelectItem value="typeScript">TypeScript</SelectItem>
                    <SelectItem value="go">Go</SelectItem>
                    <SelectItem value="ruby">Ruby</SelectItem>
                    <SelectItem value="rust">Rust</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex justify-end mt-8">
              <Button variant="secondary" className="bg-gray-400 text-end">Create Project +</Button>
              </div>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>
    </div>
   </div>
  );
};

export default Room;
