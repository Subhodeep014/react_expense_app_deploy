// UserContextProvider.jsx
import React, { createContext, useState, useEffect } from 'react';

import { fetchData } from "../helper";
export const UserContext = createContext({});

export function UserContextProvider({ children }) {
  const [user, setUser] = useState({});
  const [budgetsLength, setBudgetsLength] = useState(0);
  const [budgets, setBudgets] = useState([]);

  const [expenses, setExpenses] = useState([]);
  // Function to update the user data
  const updateUser = (userData) => {
    // console.log('Updating user:', userData);
    setUser(userData);
  };


  const updateBudgetsLength = (length) => {
    setBudgetsLength(length);
  };
  const updateBudgets = (allBudgets)=>{
    setBudgets(allBudgets);
  }

  const updateExpenses = (allExpenses)=>{
    setExpenses(allExpenses);
  }
 const fetchUserBudgets = async () => {
        try {
          const userBudgets = await fetchData("getbudgets", user.email);
          updateBudgetsLength(userBudgets.length);
          updateBudgets([userBudgets]); // Update budgets state with the fetched budgets
        } catch (error) {
          console.error("Error fetching user budgets:", error);
        }
      };

  return (
    <UserContext.Provider value={{ user,updateUser, budgetsLength,updateBudgetsLength, budgets, updateBudgets, expenses, updateExpenses, fetchUserBudgets}}> {/* Provide updateUser function */}
      {children}
    </UserContext.Provider>
  );
}
