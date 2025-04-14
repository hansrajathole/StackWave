// src/components/CodeEditor.jsx
import { useEffect } from "react";
import { Editor } from "@monaco-editor/react";

const CodeEditor = ({ code, setCode, onCodeChange }) => {
  useEffect(() => {
    if (onCodeChange) onCodeChange(code);
  }, [code]);

  return (
    <div className="w-full border rounded-md">
      <Editor
        height="60vh"
        theme="vs-dark"
        language="javascript"
        value={code}
        onChange={(value) => setCode(value)}
        options={{
          fontSize: 14,
          minimap: { enabled: false },
        }}
      />
    </div>
  );
};

export default CodeEditor;
