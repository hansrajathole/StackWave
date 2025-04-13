import React from 'react';
import Editor from '@monaco-editor/react';

const CollabEditor = () => {
  return (
    <div className="min-h-full mx-auto p-6 flex bg-[#0f0f0f] text-white">
      {/* Left Panel (Editor Area) */}
      <div className="flex-1 flex flex-col p-4">
        {/* Top Toolbar */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex gap-3 items-center">
            <button className="border border-gray-600 px-3 py-1 rounded hover:bg-gray-700 transition">Leave</button>
            <span className="bg-gray-800 text-sm px-2 py-1 rounded">rust</span>
            <span className="bg-gray-200 text-black text-sm px-2 py-1 rounded">Rust</span>
          </div>

          <div className="flex gap-3">
            <button className="bg-purple-700 px-3 py-1 rounded hover:bg-purple-800">Generate</button>
            <button className="bg-gray-700 px-3 py-1 rounded hover:bg-gray-600">Fix</button>
            <button className="bg-blue-600 px-4 py-1 rounded hover:bg-blue-700">Run Code</button>
          </div>
        </div>

        {/* Code Editor */}
        <div className="flex-1 rounded overflow-hidden border border-gray-700 ">
          <Editor
            height="calc(100vh - 140px)"
            defaultLanguage="rust"
            defaultValue={`// 🌐 Fearless and fast, crafted by Vijay Ram Subrahmanyam Yathagiri!
// Warning: This Rust code might make you a systems programming wizard. ⚡✨
fn main() {
    println!("Hello, World! 🌍💥");
}`}
            theme="vs-dark"
          />
        </div>
      </div>

      {/* Right Sidebar */}
      <div className="w-[280px] border-l border-gray-800 bg-[#1a1a1a] p-4">
        <h3 className="text-lg font-semibold mb-4">People</h3>

        <div className="bg-[#222] p-3 rounded flex items-center gap-3 mb-2">
          <img
            src="https://avatars.githubusercontent.com/u/0000000?v=4" // Replace with your avatar
            alt="avatar"
            className="w-8 h-8 rounded-full"
          />
          <div>
            <p className="text-sm font-semibold">Hansraj Athole</p>
            <p className="text-xs text-gray-400">(You)</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CollabEditor;
