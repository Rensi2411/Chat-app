import { useEffect, useState } from "react";

const DB_NAME = "ChatApp";
const DB_VERSION = 1;

export const useIndexedDB = () => {
  const [db, setDb] = useState(null);
  const [isDbInitialized, setIsDbInitialized] = useState(false); 

  const openDB = () => {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(DB_NAME, DB_VERSION);

      request.onupgradeneeded = (event) => {
        const db = event.target.result;
        if (!db.objectStoreNames.contains("contacts")) {
          db.createObjectStore("contacts", { keyPath: "id" });
        }
        if (!db.objectStoreNames.contains("messages")) {
          db.createObjectStore("messages", { keyPath: "id", autoIncrement: true });
        }
      };

      request.onsuccess = (event) => {
        const db = event.target.result;
        setDb(db); 
        setIsDbInitialized(true); 
        resolve(db);
      };

      request.onerror = (event) => {
        console.error("Error opening IndexedDB:", event.target.error);
        reject(event.target.error);
      };
    });
  };

  const ensureDbInitialized = async () => {
    if (!isDbInitialized) {
      await openDB(); 
    }
  };

  const addMessage = async (message) => {
    try {
      await ensureDbInitialized();

      if (db === null) {
        throw new Error("Database not initialized");
      }

      return new Promise((resolve, reject) => {
        const transaction = db.transaction("messages", "readwrite");
        const store = transaction.objectStore("messages");
        const request = store.add(message);

        request.onsuccess = () => {
          console.log("Message added to IndexedDB:", message);
          resolve(true);
        };

        request.onerror = (event) => {
          console.error("Error adding message to IndexedDB:", event.target.error);
          reject(event.target.error);
        };
      });
    } catch (error) {
      console.error("Error adding message:", error);
    }
  };

  const getMessages = async () => {
    try {
      await ensureDbInitialized();

      if (db === null) {
        throw new Error("Database not initialized");
      }

      return new Promise((resolve, reject) => {
        const transaction = db.transaction("messages", "readonly");
        const store = transaction.objectStore("messages");
        const request = store.getAll();

        request.onsuccess = () => {
          console.log("Messages retrieved from IndexedDB:", request.result);
          resolve(request.result);
        };

        request.onerror = (event) => {
          console.error("Error retrieving messages from IndexedDB:", event.target.error);
          reject(event.target.error);
        };
      });
    } catch (error) {
      console.error("Error getting messages:", error);
    }
  };

  const addContact = async (contact) => {
    try {
      await ensureDbInitialized(); 
      if (db === null) {
        throw new Error("Database not initialized");
      }

      return new Promise((resolve, reject) => {
        const transaction = db.transaction("contacts", "readwrite");
        const store = transaction.objectStore("contacts");
        const request = store.add(contact);

        request.onsuccess = () => {
          console.log("Contact added to IndexedDB:", contact);
          resolve(true);
        };

        request.onerror = (event) => {
          console.error("Error adding contact to IndexedDB:", event.target.error);
          reject(event.target.error);
        };
      });
    } catch (error) {
      console.error("Error adding contact:", error);
    }
  };

  const getContacts = async () => {
    try {
      await ensureDbInitialized();
      if (db === null) {
        throw new Error("Database not initialized");
      }

      return new Promise((resolve, reject) => {
        const transaction = db.transaction("contacts", "readonly");
        const store = transaction.objectStore("contacts");
        const request = store.getAll();

        request.onsuccess = () => {
          console.log("Contacts retrieved from IndexedDB:", request.result);
          resolve(request.result);
        };

        request.onerror = (event) => {
          console.error("Error retrieving contacts from IndexedDB:", event.target.error);
          reject(event.target.error);
        };
      });
    } catch (error) {
      console.error("Error getting contacts:", error);
    }
  };

  useEffect(() => {
    if (!isDbInitialized) {
      openDB(); 
    }
  }, [isDbInitialized]);

  return { addMessage, getMessages, addContact, getContacts };
};
