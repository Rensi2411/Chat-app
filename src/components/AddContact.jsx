import React, { useState } from "react";
import { useIndexedDB } from "../hooks/useIndexedDB";
import '../styles/AddContact.css'

const AddContact = () => {
  const [contactName, setContactName] = useState("");
  const { addContact } = useIndexedDB();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (contactName.trim()) {
      const newContact = {
        id: Date.now(), 
        name: contactName.trim(),
      };

     
      addContact(newContact)
        .then(() => {
          console.log("Contact added successfully.");
          setContactName(""); 
        })
        .catch((error) => {
          console.error("Error adding contact:", error);
        });
    }
  };

  return (
    <div className="add-contact-form">
      <h2>Add a New Contact</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={contactName}
          onChange={(e) => setContactName(e.target.value)}
          placeholder="Enter contact name"
        />
        <button type="submit">Add Contact</button>
      </form>
    </div>
  );
};

export default AddContact;
