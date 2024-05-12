import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/UserContext";
import { fetchData, getAllMatchingItems } from "../helper";
import BudgetItem from "../components/BudgetItem";
import AddExpenseForm from "../components/AddExpenseForm";
import Table from "../components/Table";
import { useParams } from "react-router-dom";
import {toast} from "react-toastify"
import GetBudgetHook from "../hooks/GetBudgetHook";
import GetUserHook from "../hooks/GetUserHook";
import GetExpenseHook from "../hooks/GetExpenseHook";
const BudgetPage = () => {
    GetUserHook()
    GetBudgetHook()
    GetExpenseHook()
    const { expenses, user, updateExpenses , budgets} = useContext(UserContext);
    const [matchingBudget, setMatchingBudget] = useState({});
    const [budgetData, setBudgetData] = useState({});
    const { id } = useParams(); 
    const [userExpense, setUserExpense] = useState([])

    // console.log("Budgets:",budgets)
    // console.log("expensess",expenses)
    useEffect(()=>{
        const fetchMatchingBudget = async()=>{
            try {
                const budget = await getAllMatchingItems({
                    category: "getbudgets",
                    key: "_id",
                    value : id,
                    email:user.email
                })
                
                setMatchingBudget(budget)
            } catch (error) {
                toast.error("Error fetching matching budget");
            }

        }

        fetchMatchingBudget();
        
        
        // console.log("Budget",matchingBudget)
    },[id,matchingBudget.length])
    return (
        <div className="grid-lg" style={{ "--accent": budgetData.color }}>
            <h1 className="h2">
                {matchingBudget.length>0 && (
                    <span className="accent">{matchingBudget[0].name}</span> 
                )}
                
                {' '}Overview
            </h1>
            <div className="flex-lg">
                {   matchingBudget.length>0 && (    
                    <>
                        <BudgetItem budget={matchingBudget[0]} showDelete={true}/>
                        <AddExpenseForm budgetss={[matchingBudget]}/>
                    </>      

                )
                }
            </div>
            {expenses && expenses[0] && expenses[0].length > 0 && matchingBudget.length > 0  && (
                <div className="grid-md">
                    <h2>
                        {   
                            matchingBudget.length>0 && (
                                <span className="accent">{`${matchingBudget[0].name} `}</span>
                            )
                            
                        }
                        Expenses
                    </h2>
                    {

                        <Table expenses={expenses[0].sort((a,b)=> new Date(a.createdAt)- new Date(b.createdAt)).filter((expense)=>expense.budgetid===id)} showBudget={false}/>
                    }
                    
                </div>
            )}
        </div>
    );
};

export default BudgetPage;
