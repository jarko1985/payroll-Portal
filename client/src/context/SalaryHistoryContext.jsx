import { createContext, useState, useEffect } from "react";
import {
  getFromLocalStorage,
  saveToLocalStorage,
} from "../utils/local-storage";
import { initialSalaryHistory } from "../data";

export const SalaryHistoryContext = createContext();

export const SalaryHistoryProvider = ({ children }) => {
  const [salaryHistory, setSalaryHistory] = useState(() =>
    getFromLocalStorage("salaryHistory", initialSalaryHistory)
  );

  useEffect(() => {
    saveToLocalStorage("salaryHistory", salaryHistory);
  }, [salaryHistory]);

  const addSalaryHistory = (processedSalaries, salaryMonth, salaryYear) => {
    const newHistory = processedSalaries.map((salary) => ({
      ...salary,
      month: salaryMonth,
      year: salaryYear,
    }));

    setSalaryHistory((prevHistory) => [...prevHistory, ...newHistory]);
  };

  return (
    <SalaryHistoryContext.Provider value={{ salaryHistory, addSalaryHistory }}>
      {children}
    </SalaryHistoryContext.Provider>
  );
};
