// reacts
import { useContext, useEffect, useRef, useState } from "react";
// rrd imports
import { CurrencyDollarIcon } from "@heroicons/react/24/solid";

// library imports
import { Form, useFetcher } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { UserContext } from "../context/UserContext";
import GetBudgetHook from "../hooks/GetBudgetHook";
import { fetchData } from "../helper";

const AddBudgetForm = ()=>{
    
    const {user, updateBudgetsLength, budgets,budgetsLength, updateBudgets, fetchUserBudgets} = useContext(UserContext);
    const fetcher =  useFetcher()
    const isSubmitting = fetcher.state === "submitting"
    const [budget, setBudget] = useState({
        budgetName: "",
        budgetAmount : "",
    })
    const formRef = useRef();
    const focusRef = useRef();
  
    useEffect(() => {
      if (!isSubmitting) {
        // clear form
        formRef.current.reset();
        // reset focus
        focusRef.current.focus();
      }

  
      fetchUserBudgets();
    }, [budgetsLength]);
    const generateBudgetColor = ()=>{
      const existingBudgetLength = budgetsLength
      return `${existingBudgetLength * 34} 65% 50%`
    }
  
    const handleBudgetSubmit = async (e) => {
      console.log("submitting budget..");
      e.preventDefault();
      const { budgetName, budgetAmount } = budget;
        // Generate the color
      const budgetColor = generateBudgetColor();
      console.log("Generated color:", budgetColor);
      try {
        const { data } = await axios.post("/addbudget", {
          budgetName,
          budgetAmount,
          email: user.email,
          color: budgetColor,
        });
        if (data.error) {
          toast.error(data.error);
        } else {
          const newBudgets = [...budgets[0], data]; // Create a new array with the existing budgets and the new budget
          updateBudgets([newBudgets]); // Update budgets state with the new array
          setBudget({});
          toast.success("Budget Created");
          formRef.current.reset();
          focusRef.current.focus();
          focusRef.current.value = "";
          updateBudgetsLength(budgetsLength + 1);
        }
      } catch (error) {
        console.error("error during submitting budget", error);
      }
    };
    // GetBudgetHook()

    return(
        <div className="form-wrapper">
            <h2 className="h3">
                Create Budget
            </h2>
            <fetcher.Form onSubmit={handleBudgetSubmit} className="grid-sm" ref={formRef}>
                <div className="grid-xs">
                    <label htmlFor="newBudget">Budget Name</label>
                    <input type="text" name="newBudget" onChange={(e)=>setBudget({...budget, budgetName: e.target.value})} id="newBudget" placeholder="e.g., Groceries " required ref={focusRef}/>
                </div>
                <div className="grid-xs">
                    <label htmlFor="newBudgetAmount">Amount</label>
                    <input type="number" onChange={(e)=>setBudget({...budget, budgetAmount: e.target.value})}  step="0.01" name="newBudgetAmount" 
                    id="newBudgetAmount" 
                    placeholder="e.g.  $350" required
                    inputMode="decimal"/>
                </div>
                <input type="hidden" name = "_action" value="createBudget"/>
                <button type="submit" className="btn btn--dark" disabled={isSubmitting}>
                    {
                        isSubmitting? (<span>Submitting</span>)
                        :(<>
                            <span>Create Budget</span>
                            <CurrencyDollarIcon width={20}/>
                        </>)
                    }
                </button>
            </fetcher.Form>
        </div>
    )
}
export default AddBudgetForm;