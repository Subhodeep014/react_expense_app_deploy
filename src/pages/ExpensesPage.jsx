import { useLoaderData } from "react-router-dom";
import Table from "../components/Table";

// library import
import { toast } from "react-toastify";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/UserContext";
import GetExpenseHook from "../hooks/GetExpenseHook";
import { fetchData } from "../helper";
import GetUserHook from "../hooks/GetUserHook";





const ExpensesPage = ()=>{
    GetUserHook();
    const {user, expenses} = useContext(UserContext);
    const [expenses_local, setExpenses] = useState([])
    useEffect(() => {
        const getExpenseData = async () => {
          try {
            const data = await fetchData("getexpenses", user.email);
            console.log(data);
            setExpenses(data);
          } catch (error) {
            console.log(error);
          }
        };
    
        if (user.email) {
          getExpenseData();
        }
      }, [user.email, expenses]);
    
      console.log(expenses_local);

    
    return(
        <div className="grid-lg">
            <h1>All expenses</h1>
            {
               expenses_local && expenses_local.length>0 ?(
                    <div className="grid-md">
                        <h2>Recent Expenses <small>({expenses_local.length} total)</small> </h2>
                        <Table expenses={expenses_local}/>
                    </div>
                    
                ):(
                    <p> No expenses to show</p>
                )
            }
        </div>
    )
}
export default ExpensesPage