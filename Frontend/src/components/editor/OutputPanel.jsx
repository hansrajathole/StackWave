import React from "react";

const OutputPanel = ({ output, isVisible, onClose }) => {
  if (!isVisible) return null;

  return (
    <div
      className="absolute bottom-0 left-0 right-0 bg-black text-white z-50 border-t border-gray-700 resize-y overflow-auto hide-scrollbar"
      style={{ height: "300px", minHeight: "100px", maxHeight: "60vh" }}
    >
      <div className="flex items-center justify-between bg-gray-800 px-4 py-2 border-b border-gray-700">
        <p className="text-sm font-semibold">Output</p>
        <button
          onClick={onClose}
          className="text-white hover:text-red-500 transition"
        >
          <i className="ri-close-line text-lg"></i>
        </button>
      </div>
      <div className="p-3 h-full overflow-y-auto text-sm font-mono whitespace-pre-wrap">
        {output || "Running..."}
      </div>
    </div>
  );
};

export default OutputPanel;