import React, { createContext, useState } from 'react'

// src/context/UserContext.jsx

export const UserContext = createContext();  // This is the context object


const UserContextProvider = ({ children }) => {  // Renamed to avoid conflict
  const [user, setUser] = useState({
    email: '',
    fullname: {
      firstname: '',
      lastname: ''
    }
  });

  return (
    <UserContext.Provider value={{ user, setUser }}> {/* Providing UserContext value */}
      {children}
    </UserContext.Provider>
  );
}

export default UserContextProvider;  // Export the context provider as default
