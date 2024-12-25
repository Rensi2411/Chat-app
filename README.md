# Chat Application

A real-time chat application built using React.js, with IndexedDB for local storage and InstantDB for cloud storage. This app allows users to send and receive messages, manage contacts, and interact with a responsive chat interface.

## Features

- **Add Contacts**: Users can add contacts to the list.
- **Chat Window**: Users can select contacts to start a conversation.
- **Message Input**: Users can type and send messages.
- **Message History**: Messages are saved locally using IndexedDB and can be retrieved or synced with InstantDB.
- **Responsive Interface**: The app is responsive and works well on mobile and desktop devices.

## Technologies Used

- **React.js**: Frontend framework for building the user interface.
- **IndexedDB**: Used for local storage of contacts and messages.
- **InstantDB**: Cloud storage for syncing messages.
- **Axios**: For making API requests to InstantDB.
- **CSS**: For styling the components.

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/chat-app.git
2. Navigate to the project directory:
   ```bash
   cd whatsapp-web-clone

3. Install the required dependencies:
   ```bash
   npm install

4. Create a .env file in the root directory with the following content:
     ```bash
     REACT_APP_INSTANTDB_API_KEY=your-instantdb-api-key
     REACT_APP_INSTANTDB_URL=https://api.instantdb.com/v1/
Replace your-instantdb-api-key with your InstantDB API key.

5. Run the app:
   ```bash
   npm start

**Netlify Link :**
https://illustrious-bavarois-7efadc.netlify.app/
