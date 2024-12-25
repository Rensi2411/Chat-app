import React, { createContext, useReducer, useEffect } from "react";
import { useIndexedDB } from "../hooks/useIndexedDB";  
import { useInstantDB} from "../hooks/useInstantDB";
const initialState = {
  contacts: [],
  messages: [],
};

const chatReducer = (state, action) => {
  switch (action.type) {
    case "SEND_MESSAGE":
      return {
        ...state,
        messages: [...state.messages, action.payload],
      };
    case "SET_CONTACTS":
      return {
        ...state,
        contacts: action.payload,
      };
    case "SET_MESSAGES":
      return {
        ...state,
        messages: action.payload,
      };
    default:
      return state;
  }
};

export const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
  const [state, dispatch] = useReducer(chatReducer, initialState);
  const { getMessages, getContacts, addMessage, addContact } = useIndexedDB();
   const { fetchMessages, sendMessage: sendInstantMessage, messages: instantMessages } = useInstantDB();

  // Fetch contacts and messages from IndexedDB on initial load
  useEffect(() => {
    const fetchData = async () => {
      const savedMessages = await getMessages();
      const savedContacts = await getContacts();
      dispatch({ type: "SET_MESSAGES", payload: savedMessages });
      dispatch({ type: "SET_CONTACTS", payload: savedContacts });
    };
    fetchData();
  }, [getMessages, getContacts]);

  const sendMessage = (receiverId, content) => {
    const newMessage = {
      sender: "me",
      receiver: receiverId,
      content,
      timestamp: new Date(),
      isSent: true,
    };

    addMessage(newMessage); 
    dispatch({ type: "SEND_MESSAGE", payload: newMessage });
  };

  return (
    <ChatContext.Provider value={{ ...state, sendMessage }}>
      {children}
    </ChatContext.Provider>
  );
};
