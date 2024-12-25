import React, { useContext } from "react";
import { ChatContext } from "../context/ChatContext";
import Message from "./Message";  
import MessageInput from "./MessageInput"; 

const ChatWindow = ({ contactId }) => {
  const { messages } = useContext(ChatContext);

  const filteredMessages = messages.filter(
    (msg) => msg.sender === contactId || msg.receiver === contactId
  );

  return (
    <div className="chat-window">
      <div className="messages">
        {filteredMessages.map((msg, index) => (
          <Message key={index} message={msg} />
        ))}
      </div>
      <MessageInput contactId={contactId} />
    </div>
  );
};

export default ChatWindow;
