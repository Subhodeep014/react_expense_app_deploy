import { useEffect, useRef, useState } from "react";
import { useFetcher } from "react-router-dom"
import { PlusCircleIcon } from "@heroicons/react/24/solid";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import axios from "axios";
import { toast } from "react-toastify";

const AddExpenseForm = ({budgetss})=>{
  console.log("budgetss",budgetss)
    const fetcher = useFetcher();
    const isSubmitting = fetcher.state==="submitting";
    const formRef = useRef()
    const focusRef = useRef()
 
    const { user,budgets, budgetsLength,updateExpenses,expenses} = useContext(UserContext);
    const [expense, setExpense] = useState({
        expenseName : "",
        expenseAmount:"",
        budgetId: budgetss[0][0]._id,
        
    });

    useEffect(()=>{
        console.log(expense.budgetId)
    },[expense.budgetId])

    const hasBudgets = budgetss.length > 0 && budgetss[0].length > 0;

    const handleExpenseSubmit = async(e)=>{
        e.preventDefault()
        const {expenseName, expenseAmount, budgetId} = expense;
        console.log(expenseName, expenseAmount, budgetId)
        try {
            const {data} = await axios.post("/addexpense",{
                expenseName,
                expenseAmount,
                budgetId,
                email: user.email,
            })
            console.log(data)
            if(data.error){
                toast.error(data.error);
            }else{
              toast.success("Expense successfully created") 
              updateExpenses([...expenses,expense])
              setExpense({
                expenseName: "",
                expenseAmount: "",
                budgetId:budgetss[0][0]._id
              });           
              
              formRef.current.reset();
              focusRef.current.focus();
              console.log("expense submitting")
            }
        } catch (error) {
            console.error(error);
        }

    }
    return (
      <div className="form-wrapper">
        <h2 className="h3">
          Add New{" "}
          <span className="accent">{budgetsLength===1 && `${budgetss[0][0].name}`}</span>
          {" "}Expense
        </h2>
        <fetcher.Form onSubmit={handleExpenseSubmit} className="grid-sm" ref={formRef}>
          <div className="expense-inputs">
            <div className="grid-xs">
              <label htmlFor="newExpense" >Expense Name</label>
              <input
              onChange={(e)=>setExpense({...expense, expenseName: e.target.value})}
                type="text"
                name="newExpense"
                id="newExpense"
                placeholder="e.g., coffee"
                ref={focusRef}
                required
              />
            </div>
            <div className="grid-xs">
              <label htmlFor="newExpenseAmount">Amount</label>
              <input
                onChange={(e)=>setExpense({...expense, expenseAmount: e.target.value})}
                type="number"
                step="0.01"
                inputMode="decimal"
                name="newExpenseAmount"
                id="newExpenseAmount"
                placeholder="e.g., 3.50"
                required
              />
            </div>
          </div>
          <div className="grid-xs" hidden={budgetsLength===1}>
            <label htmlFor="newExpenseBudget">Budget Category</label>
            <select name="newExpenseBudget" id="newExpenseBudget"  
                onChange={(e)=>setExpense({...expense, budgetId : e.target.value})} required>
              {hasBudgets &&
                budgetss[0]
                  .sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
                  .map((budget) => (
                    <option key={budget._id} value={budget._id}>
                      {budget.name}
                    </option>
                  ))}
            </select>
          </div>
          <input type="hidden" name="_action" value="createExpense" />
          <button type="submit" className="btn btn--dark" disabled={isSubmitting}>
            {isSubmitting ? (
              <span>Submitting</span>
            ) : (
              <>
                <span>Add Expense</span>
                <PlusCircleIcon width={20} />
              </>
            )}
          </button>
        </fetcher.Form>
      </div>
    );
};

export default AddExpenseForm