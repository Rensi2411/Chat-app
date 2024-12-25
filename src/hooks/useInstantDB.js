import { useEffect, useState } from "react";
import axios from "axios";
import { useIndexedDB } from "./useIndexedDB"; 

export const useInstantDB = () => {
  const { getMessages, addMessage } = useIndexedDB(); 
  const [messages, setMessages] = useState([]);

  const INSTANTDB_URL = process.env.REACT_APP_INSTANTDB_URL; 
  const INSTANTDB_API_KEY = process.env.REACT_APP_INSTANTDB_API_KEY; 

  const fetchMessages = async (contactId) => {
    try {
      const response = await axios.get(
        `${INSTANTDB_URL}messages?filter=receiver:${contactId}`,
        { headers: { Authorization: `Bearer ${INSTANTDB_API_KEY}` } }
      );
      setMessages(response.data);
      return response.data;
    } catch (error) {
      console.error("Error fetching messages:", error);
      const offlineMessages = await getMessages(); 
      setMessages(offlineMessages);  
      return offlineMessages;
    }
  };

  const sendMessage = async (message) => {
    try {
      const response = await axios.post(
        `${INSTANTDB_URL}messages`,
        message,
        { headers: { Authorization: `Bearer ${INSTANTDB_API_KEY}` } }
      );
      setMessages((prevMessages) => [...prevMessages, response.data]);
      await addMessage(response.data);
      return response.data;
    } catch (error) {
      console.error("Error sending message:", error);
      throw error;
    }
  };

  const listenForMessages = (contactId) => {
    const intervalId = setInterval(async () => {
      const newMessages = await fetchMessages(contactId);
      setMessages(newMessages);
    }, 3000); 

    return () => clearInterval(intervalId);
  };

  useEffect(() => {
    const contactId = "some-contact-id"; 
    fetchMessages(contactId);

    return () => {
      setMessages([]);
    };
  }, []);

  return { messages, sendMessage, listenForMessages };
};
