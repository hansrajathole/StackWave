import React from "react";
import { MdDeleteOutline } from "react-icons/md";

const DeleteButton = ({ onClick, size = 25 }) => {
  return (
    <div className="text-red-500 cursor-pointer" onClick={onClick}>
      <MdDeleteOutline size={size} />
    </div>
  );
};

export default DeleteButton;