import React, { useEffect, useState } from "react";
import axios from "axios";
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
import toast from "react-hot-toast";
import { MdDeleteOutline } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import icons from './icons.json';
const Room = () => {
  
  const [language, setLanguage] = useState("");
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const [projects, setProjects] = useState([]);
  const navigate = useNavigate()
  const [openCreate, setOpenCreate] = useState(false)
  const [openJoin, setOpenJoin] = useState(false)
  
  const fetchAllRooms = () => {
    axios
      .get("http://localhost:3000/api/rooms", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        setProjects(res.data?.rooms || []);
      })
      .catch((err) => {
        console.log(err.message);
        toast.error("Failed to load rooms");
      });
  };

  useEffect(() => {
    fetchAllRooms();
  }, []);

  const handleCreateProject = async () => {
    if (!language || !title) {
      toast.error("Please fill in both title and language.");
      return;
    }
    const icon = icons[language.toLowerCase()];
    if (!icon) {
      toast.error("Invalid language selected.");
      return;
    }
    console.log(icon);



    setLoading(true);
    try {
      const res = await axios.post(
        "http://localhost:3000/api/rooms",
        { language, title, languageIcon : icon },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      fetchAllRooms();
      toast.success("Project created successfully!");
      setTitle("");
      setLanguage("");
      setOpenCreate(false)
    } catch (err) {
      toast.error(err?.response?.data?.message || "Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  
const handleJoinProject = async (projectId) => {
  if (!projectId) {
    toast.error("Please enter a valid Project ID.");
    return;
  }

  setLoading(true);
  try {
    await axios.post(
      "http://localhost:3000/api/room/join",
      { projectId },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    fetchAllRooms();
    toast.success("Joined project successfully!");
    setOpenJoin(false); // Close the dialog after successful join
  } catch (err) {
    toast.error(err?.response?.data?.message || "Something went wrong!");
  } finally {
    setLoading(false);
  }
};
  return (
    <div className="mx-auto p-6 max-sm:p-4 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white min-h-full">
      {/* Header Section */}
      <div className="p-6 max-sm:p-3 flex justify-between items-center border-b border-gray-200 dark:border-gray-700">
        <h1 className="text-2xl font-bold">My Projects</h1>
        <div className="flex space-x-4">
          {/* Join Project Dialog */}
          <Dialog open={openJoin} onOpenChange={setOpenJoin}>
            <DialogTrigger className="border border-purple-500 px-3 py-1 rounded-md text-purple-600 dark:text-purple-400 hover:bg-purple-100 dark:hover:bg-purple-600/20 transition">
              Join
            </DialogTrigger>
            <DialogContent className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white p-6 rounded-lg w-[425px]">
              <DialogHeader>
                <DialogTitle>Join Project</DialogTitle>
                <DialogDescription>
                  To join a project, enter the join ID, which can be obtained
                  from your friend.
                </DialogDescription>
                <div className="flex items-center justify-between mt-4">
                  <label htmlFor="project" className="text-sm font-medium">
                    Project ID
                  </label>
                  <Input
                    type="text"
                    placeholder="Enter Project ID"
                    className="bg-gray-100 dark:bg-gray-800 w-[70%] px-3 py-1 rounded-md border-none ring-0 focus-visible:ring-0"
                  />
                </div>
                <div className="flex justify-end mt-8">
                  <Button
                    variant="secondary"
                    className="bg-indigo-500 hover:bg-indigo-600 text-white transition"
                  >
                    Join Project
                  </Button>
                </div>
              </DialogHeader>
            </DialogContent>
          </Dialog>

          {/* New Project Dialog */}
          <Dialog open={openCreate} onOpenChange={setOpenCreate}>
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
                  <Select
                    onValueChange={(val) => setLanguage(val)}
                    value={language}
                  >
                    <SelectTrigger className="w-[70%] bg-gray-100 dark:bg-gray-800 text-black dark:text-white border-none">
                      <SelectValue placeholder="Select a language" />
                    </SelectTrigger>
                    <SelectContent className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white">
                      <SelectItem value="javascript">JavaScript</SelectItem>
                      <SelectItem value="python">Python</SelectItem>
                      <SelectItem value="java">Java</SelectItem>
                      <SelectItem value="c">C</SelectItem>
                      <SelectItem value="cpp">C++</SelectItem>
                      <SelectItem value="typescript">TypeScript</SelectItem>
                      <SelectItem value="go">Go</SelectItem>
                      <SelectItem value="ruby">Ruby</SelectItem>
                      <SelectItem value="rust">Rust</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex justify-end mt-8">
                  <Button
                    variant="secondary"
                    onClick={handleCreateProject}
                    className="bg-green-500 hover:bg-green-600 text-white transition"
                    disabled={loading}
                  >
                    {loading ? "Creating..." : "Create Project +"}
                  </Button>
                </div>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Display Created Projects */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {projects.map((proj) => (
          <div
            key={proj._id}
            className="relative bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md hover:shadow-lg"
          >
            {/* Delete Icon */}
            <div className=" text-red-500 cursor-pointer ">
              <MdDeleteOutline size={25} />
            </div>

            {/* Language Badge */}
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300">
                {proj?.title}
              </h3>
              <img
                src={proj?.languageIcon}
                alt="Language Icon"
                className="w-8 h-8"
              />
            </div>

            {/* Members */}
            <p className="text-sm font-medium mb-2">Members:</p>
            <div className="flex -space-x-2 mb-4">
              {proj.participants?.map((user) => (
                <img
                  key={user._id}
                  src={user.avatar}
                  alt={user.username}
                  className="w-8 h-8 rounded-full border-2 border-white dark:border-gray-800"
                />
              ))}
              
            </div>

            {/* Creation Date & Creator */}
            <p className="text-xs text-gray-500">
              <span className="text-gray-900 dark:text-gray-400">Created at</span> {new Date(proj.createdAt).toDateString()}
            </p>
            <div className="flex justify-between items-center gap-2 text-xs ">
              <div className="flex items-center gap-2">
              <span className="text-lg">By</span>
              {proj.roomCreatedby?.avatar && (
                <img
                  src={proj.roomCreatedby.avatar}
                  alt="creator-avatar"
                  className="w-5 h-5 rounded-full"
                />
              )}
              </div>
              
               <div className="flex justify-end ">
              <button className="px-4 py-2 border border-blue-500 dark:text-white  text-sm rounded hover:bg-blue-500  hover:shadow-md hover:shadow-blue-700 transition"
              onClick={()=>navigate(`/rooms/room/${proj._id}`)}
              >
                Open
              </button>
            </div>
            </div>

            {/* Open Button */}
           
          </div>
        ))}
      </div>
    </div>
  );
};

export default Room;
