// import React, { useState } from "react";
// import ContactList from "./components/ContactList";
// import ChatWindow from "./components/ChatWindow";
// import { ChatProvider } from "./context/ChatContext";
// import "./App.css";

// const App = () => {
//   const [selectedContact, setSelectedContact] = useState(null);

//   return (
//     <ChatProvider>
//       <div className="app">
//         <ContactList onSelectContact={setSelectedContact} />
//         {selectedContact ? (
//           <ChatWindow contactId={selectedContact} />
//         ) : (
//           <div className="welcome-message">Select a contact to start chatting!</div>
//         )}
//       </div>
//     </ChatProvider>
//   );
// };

// export default App;
import React, { useState } from "react";
import ContactList from "./components/ContactList";
import ChatWindow from "./components/ChatWindow";
import { ChatProvider } from "./context/ChatContext";
import "./App.css";

const App = () => {
  const [selectedContact, setSelectedContact] = useState(null);

  return (
    <ChatProvider>
      <div className="app">
        <ContactList onSelectContact={setSelectedContact} />
        {selectedContact ? (
          <ChatWindow contactId={selectedContact} />
        ) : (
          <div className="welcome-message">Select a contact to start chatting!</div>
        )}
      </div>
    </ChatProvider>
  );
};

export default App;
