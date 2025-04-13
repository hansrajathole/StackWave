
import React from 'react'
import MonacoEditor from '@monaco-editor/react';

const CodeEditor = ({ code, setCode }) => {
  return (
    <MonacoEditor
      height="60vh"
      language="javascript"
      theme="vs-dark"
      value={code}
      onChange={setCode}
    />
  );
};

export default CodeEditor;
