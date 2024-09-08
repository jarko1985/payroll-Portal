import React, { createContext, useState, useEffect } from "react";
import {
  getFromLocalStorage,
  saveToLocalStorage,
} from "../../utils/local-storage";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(() => getFromLocalStorage("user", null));

  useEffect(() => {
    saveToLocalStorage("user", user);
  }, [user]);

  const login = (userData) => {
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
    saveToLocalStorage("user", null);
  };

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};
