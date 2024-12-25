
import React, { useEffect, useState, useContext } from 'react';
import { useIndexedDB } from '../hooks/useIndexedDB';
import { ChatContext } from "../context/ChatContext";
import '../styles/ContactList.css';
import AddContact from "./AddContact";

const ContactList = ({ onSelectContact }) => {
  const [indexedContacts, setIndexedContacts] = useState([]);
  const { getContacts } = useIndexedDB();
  const { contacts: contextContacts } = useContext(ChatContext);

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const retrievedContacts = await getContacts();
        setIndexedContacts(retrievedContacts || []); 
      } catch (error) {
        console.error("Error fetching contacts from IndexedDB:", error);
        setIndexedContacts([]); 
      }
    };

    fetchContacts();
  }, [getContacts]);

  const combinedContacts = indexedContacts.length > 0 ? indexedContacts : contextContacts;

  return (
    <div className="contact-list">
      {combinedContacts && combinedContacts.length > 0 ? (
        combinedContacts.map((contact) => (
          <div
            key={contact.id}
            className="contact-item"
            onClick={() => onSelectContact(contact.id)} 
          >
            {contact.name}
          </div>
        ))
      ) : (
        <div>No contacts available</div>
      )}
      <AddContact /> 
    </div>
  );
};

export default ContactList;
