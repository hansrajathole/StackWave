import React from "react";
import RoomHeader from "./RoomHeader";
import ProjectGrid from "./ProjectGrid";
import { useRooms } from "../../hooks/useRooms";

const Room = () => {
  const { 
    projects, 
    loading, 
    handleCreateProject, 
    handleJoinProject, 
    handleDeleteRoom 
  } = useRooms();

  return (
    <div className="mx-auto p-6 max-sm:p-4 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white min-h-full ">
      <RoomHeader 
        onJoin={handleJoinProject}
        onCreate={handleCreateProject}
        loading={loading}
      />
      <ProjectGrid 
        projects={projects} 
        onDeleteRoom={handleDeleteRoom} 
      />
    </div>
  );
};

export default Room;