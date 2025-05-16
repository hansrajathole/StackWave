import React from "react";
import ChatHeader from "./ChatHeader";
import MessageList from "./MessageList";
import MessageInput from "./MessageInput";
import MembersPanel from "./MembersPanel";

const ChatPanel = ({
  messages,
  input,
  setInput,
  showPeople,
  setShowPeople,
  roomData,
  messageBoxRef,
  currentUserId,
  onSendMessage
}) => {
  return (
    <div className="w-80 max-sm:w-screen h-full bg-gray-50 dark:bg-gray-900 border-r border-gray-300 dark:border-gray-800 flex flex-col relative">
      <ChatHeader 
        onTogglePeople={() => setShowPeople(!showPeople)} 
        showPeople={showPeople} 
      />
      
      <MessageList 
        messages={messages} 
        currentUserId={currentUserId} 
        messageBoxRef={messageBoxRef} 
      />
      
      <MessageInput 
        input={input} 
        setInput={setInput} 
        onSend={onSendMessage} 
      />
      
      <MembersPanel
        show={showPeople}
        participants={roomData?.participants}
        currentUserId={currentUserId}
        onClose={() => setShowPeople(false)}
      />
    </div>
  );
};

export default ChatPanel;