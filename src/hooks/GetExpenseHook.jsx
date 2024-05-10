import { useContext, useEffect } from 'react';
import { UserContext } from '../context/UserContext';
import { fetchData } from '../helper';
const GetExpenseHook = ()=>{
    const { user,budgets, budgetsLength,updateBudgets , updateBudgetsLength, expenses, updateExpenses} = useContext(UserContext);
    useEffect(() => {
        const fetchUserExpenses = async () => {
          try {
            const userExpenses = await fetchData("getexpenses", user.email);
            // console.log("budget lengths -->",userBudgets.length)
            // console.log("budgets -->",userBudgets)
            
            updateExpenses([userExpenses]);
    
          } catch (error) {
            console.error("Error fetching user budgets:", error);
          }
        };
     
        fetchUserExpenses();
    }, [expenses.length]);
    return
}
export default GetExpenseHook;