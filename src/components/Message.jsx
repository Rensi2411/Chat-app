
import React from "react";


const Message = ({ message }) => {
  const formattedTime = new Date(message.timestamp).toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  });
  return (
    <div className={`message ${message.sender === "me" ? "sent" : "received"}`}>
      <div className="message-content">{message.content}</div>
      <div className="message-time">{formattedTime}</div>
    </div>
  );
};

export default Message;
