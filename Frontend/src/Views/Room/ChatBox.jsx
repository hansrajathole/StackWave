import React from "react";

const ChatBox = ({ messages, sendMessage }) => {
    const [text, setText] = useState('');
  
    return (
      <div>
        <div className="h-40 overflow-y-auto bg-gray-800 text-white p-2">
          {messages.map((msg, idx) => (
            <div key={idx}>{msg}</div>
          ))}
        </div>
        <input value={text} onChange={(e) => setText(e.target.value)} />
        <button onClick={() => sendMessage(text)}>Send</button>
      </div>
    );
  };
  
  export default ChatBox;
  