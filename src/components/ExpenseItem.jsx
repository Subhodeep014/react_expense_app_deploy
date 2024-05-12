import { Link, useFetcher, useNavigate } from "react-router-dom"
import { fetchData, formatDateToLocaleString, getAllMatchingItems } from "../helper"
import { useContext, useEffect, useState } from "react"
import { UserContext } from "../context/UserContext"
import {toast} from 'react-toastify'
import { formatCurrency } from "../helper"

// LIBRARY IMPORT
import { TrashIcon } from "@heroicons/react/24/solid";
import axios from "axios"
import GetExpenseHook from "../hooks/GetExpenseHook"


const ExpenseItem = ({expense, showBudget})=>{
    const [matchingBudget, setMatchingBudget] = useState({});
    const fetcher = useFetcher()
    const {user, updateExpenses,expenses:globalExpenses} = useContext(UserContext);

 
    useEffect(()=>{
        const fetchMatchingBudget = async()=>{
            try {
                
                
                const budget = await getAllMatchingItems({
                    category: "getbudgets",
                    key: "_id",
                    value : expense.budgetid,
                    email:user.email
                })
                setMatchingBudget(budget)
            } catch (error) {
                toast.error("Error fetching matching budget");
            }
        }
        fetchMatchingBudget();
    },[matchingBudget.length, expense.budgetid])

    const deleteExpenseFromTable = async(e)=>{
        e.preventDefault(); 
        try {
            // console.log("deleting expense id: ",expense._id)
            const resp = await axios.delete( `/expensedelete/${expense._id}`, {
               data:{
                email:user.email
               }
            } )
            // console.log(`Fetched Expense -->`, resp.data)
            updateExpenses(resp.data);
            toast.success("Expense deleted successfully!")

            // const fetchExpenses = await fetchData("getexpenses", user.email)
            // await updateExpenses(fetchExpenses)
            // console.log(fetchExpenses)
        } catch (error) {
            toast.success("Error in deleting expense")
            console.log(error);
        }
    }
    return (
        <>
                    <td>{expense.expensename}</td>
                    <td>{formatCurrency(expense.expenseamount)}</td>
                    <td>{formatDateToLocaleString(expense.createdAt)}</td>
                    <td>
                        {showBudget &&  matchingBudget.length > 0 && (
                            <Link to={`/budget/${matchingBudget[0]._id}`} style={{ "--accent": matchingBudget[0].color }}>
                                {matchingBudget[0].name}
                            </Link>
                        )}
                    </td>
                    <td>
                        <fetcher.Form onSubmit={deleteExpenseFromTable}>
                            <input type="hidden" name="expenseId" value={expense._id} />
                            <button type="submit" className="btn btn--warning" aria-label={`Delete ${expense.name} expense`}>
                                <TrashIcon width={20} />
                            </button>
                        </fetcher.Form>
                    </td>
        </>
    );
}
export default ExpenseItem