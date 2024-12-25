import React, { useState, useContext } from "react";
import { ChatContext } from "../context/ChatContext";
import "../styles/MessageInput.css";

const MessageInput = ({ contactId }) => {
  const [input, setInput] = useState("");
  const { sendMessage } = useContext(ChatContext);

  const handleSend = () => {
    if (input.trim()) {
      sendMessage(contactId, input.trim());
      setInput("");
    }
  };

  return (
    <div className="message-input">
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Type a message..."
      />
      <button onClick={handleSend}>Send</button>
    </div>
  );
};

export default MessageInput;
