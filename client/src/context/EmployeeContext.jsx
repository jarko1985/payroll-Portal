import { createContext, useState, useEffect } from "react";
import {
  getFromLocalStorage,
  saveToLocalStorage,
} from "../utils/local-storage";
import { initialEmployees } from "../data";

export const EmployeeContext = createContext();

export const EmployeeProvider = ({ children }) => {
  const [employees, setEmployees] = useState(() =>
    getFromLocalStorage("employees", initialEmployees)
  );

  useEffect(() => {
    saveToLocalStorage("employees", employees);
  }, [employees]);

  return (
    <EmployeeContext.Provider value={{ employees, setEmployees }}>
      {children}
    </EmployeeContext.Provider>
  );
};
