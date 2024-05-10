import { useContext, useEffect, useState } from "react";
import Intro from "./Intro";
import { UserContext } from "../context/UserContext";
import axios, { all } from "axios";
import { Link, Navigate, useLoaderData } from "react-router-dom";
import GetUserHook from "../hooks/GetUserHook";
import AddBudgetForm from "../components/AddBudgetForm";
import { fetchData } from "../helper";
import AddExpenseForm from "../components/AddExpenseForm";
import GetBudgetHook from "../hooks/GetBudgetHook";
import BudgetItem from "../components/BudgetItem";
import Table from "../components/Table";
const Dashboard = () => {
  const { user, budgetsLength, updateBudgetsLength , budgets, updateBudgets, expenses, updateExpenses} = useContext(UserContext);

  GetUserHook();
  GetBudgetHook()
  
  useEffect(() => {
    const fetchUserExpenses = async () => {
      try {
        const userExpenses = await fetchData("getexpenses", user.email)?? [];
        // console.log("budget lengths -->",userBudgets.length)
        // console.log("budgets -->",userBudgets)
        
        updateExpenses([userExpenses])
        console.log("sfdsfd",userExpenses)

      } catch (error) {
        console.error("Error fetching user budgets:", error);
      }
    };
 
    fetchUserExpenses();
    console.log("expenses on load",expenses)
}, [expenses.length, user.email]);
console.log(budgets)
  return (
    <div>
      {user.name ? (
        <div className="dashboard">
          <h1>
            Welcome back, <span className="accent">{user.name}</span>
          </h1>
          <div className="grid-sm">
            {
              budgetsLength > 0 ? (
                <div className="grid-lg">
                    <div className="flex-lg">
                    <AddBudgetForm/>
                    <AddExpenseForm budgetss = {budgets}/>
                  </div>
                  <h2>Existing Budgets</h2>
                  <div className="budgets">
                    {
                      budgets[0].map((budget)=>(
                        <BudgetItem key={budget._id} budget = {budget}/>
                      ))
                    }
                    
                  </div>
                  {
                    expenses.length>0  && expenses[0].length>0 && (
                      <div className="grid-md">
                        <h2>Recent Expenses</h2>
                        <Table expenses ={
                          expenses[0].sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt)).slice(0,8)
                        }/>
                        {
                          expenses[0].length>8 && (
                            <Link to="expenses" className="btn btn--dark">
                            View all expenses
                            </Link>
                          )
                        }

                      </div>

                      
                    )
                  }
                </div>

              ) : (
                <div className="grid-sm">
                  <p>Personal budgeting is the secret to financial freedom</p>
                  <p>Create a budget to get started!</p>
                  <AddBudgetForm/>
                </div>
              )
            }
          </div>
        </div>
      ) : <Intro />
      }
    </div>
  );
};

export default Dashboard;
