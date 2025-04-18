import React from "react";
import JoinProjectDialog from "./JoinProjectDialog";
import CreateProjectDialog from "./CreateProjectDialog";

const RoomHeader = ({ onJoin, onCreate, loading }) => {
  return (
    <div className="p-6 max-sm:p-3 flex justify-between items-center border-b border-gray-200 dark:border-gray-700">
      <h1 className="text-2xl font-bold">My Projects</h1>
      <div className="flex space-x-4">
        <JoinProjectDialog onJoin={onJoin} loading={loading} />
        <CreateProjectDialog onCreate={onCreate} loading={loading} />
      </div>
    </div>
  );
};

export default RoomHeader;