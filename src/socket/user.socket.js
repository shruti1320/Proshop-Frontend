import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

const SOCKET_SERVER_URL = 'http://localhost:3001'; // Change this to your backend URL

const AppComponent = () => {
  const [socket, setSocket] = useState(null);
  const [loggedInUser, setLoggedInUser] = useState(null);
//   const [userData, setUserData] = useState(null);

  useEffect(() => {
    // Connect to the socket server
    const newSocket = io(SOCKET_SERVER_URL);
    setSocket(newSocket);

    // Clean up on unmount
    return () => {
      newSocket.disconnect();
    };
  }, []);

  useEffect(() => {
    if (socket) {
      // Listen for "updateToken" event
      socket.on('updateToken', (data) => {
        console.log('Token updated:', data);
        // Handle token update
      });

      // Listen for "addUser" event
      socket.on('addUser', (data) => {
        console.log('User added:', data);
        // Handle user addition
      });

      // Listen for "updateUser" event
      socket.on('updateUser', (data) => {
        console.log('User updated:', data);
        // Handle user update
      });

      // Listen for "deleteUser" event
      socket.on('deleteUser', (data) => {
        console.log('User deleted:', data);
        // Handle user deletion
      });
    }
  }, [socket]);

  const handleLogin = () => {
    // Simulate user login
    const userData = { _id: 'user123', name: 'John Doe' }; // Replace with actual user data
    setLoggedInUser(userData);
    
    // Emit "login" event to the server
    if (socket) {
      socket.emit('login', userData);
    }
  };

  const handleLogout = () => {
    // Simulate user logout
    setLoggedInUser(null);
    
    // Emit "logout" event to the server
    if (socket) {
      socket.emit('logout');
    }
  };

  const handleUpdateUser = () => {
    // Simulate user update
    const updatedUserData = { _id: 'user123', name: 'Updated Name' }; // Replace with updated user data
    
    // Emit "broadcastUserUpdate" event to the server
    if (socket) {
      socket.emit('broadcastUserUpdate', { user: updatedUserData });
    }
  };

  return (
    <></>
  );
};

export default AppComponent;
