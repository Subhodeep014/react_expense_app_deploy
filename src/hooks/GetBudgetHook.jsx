import { useContext, useEffect } from 'react';
import { UserContext } from '../context/UserContext';
import { fetchData } from '../helper';

const GetBudgetHook = ()=>{
    const { user,budgets, budgetsLength,updateBudgets , updateBudgetsLength} = useContext(UserContext);
    useEffect(() => {
        const fetchUserBudgets = async () => {
          try {
            const userBudgets = await fetchData("getbudgets", user.email);
            // console.log("budget lengths -->",userBudgets.length)
            // console.log("budgets -->",userBudgets)
            
            updateBudgetsLength(userBudgets.length);
            updateBudgets([userBudgets])
    
          } catch (error) {
            console.error("Error fetching user budgets:", error);
          }
        };
     
        fetchUserBudgets();
    }, [budgets.length]);
    return
    

}
export default GetBudgetHook