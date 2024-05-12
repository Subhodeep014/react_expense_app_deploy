// helper function
import { Form, Link, useNavigate } from "react-router-dom";
import { calculateSpentByBudget, formatCurrency, formatPercentage } from "../helper";

// Library Imports
import { BanknotesIcon, TrashIcon } from "@heroicons/react/24/solid";
import { UserContext } from "../context/UserContext";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import GetExpenseHook from "../hooks/GetExpenseHook";
import GetBudgetHook from "../hooks/GetBudgetHook";
import { toast } from "react-toastify";



const BudgetItem = ({budget, showDelete = false})=>{ 
    const navigate = useNavigate()
    const [spent, setSpent] = useState(0);
    const { user, expenses} = useContext(UserContext);
    const {_id,name,amount, color} = budget;
    useEffect(()=>{
        // console.log('expense added, recalculating spent amt')
        const fetchSpent = async()=>{
            const spentAmount = await calculateSpentByBudget(_id, user.email);
            // console.log('spent amount calc-->',spentAmount)
            setSpent(spentAmount)
        }
        fetchSpent();
    },[expenses])

    const handleDelete = async(e)=>{
        e.preventDefault();  
        if(confirm("Are you  sure want to premanently delete this budget?")){
            try {
                const response = await axios.delete(`/deletebudget/${budget._id}`)
                

                    // console.log(response)
                    toast.success("Succesfully deleted budget")
                    navigate('/react_expense_app_deploy')
                } catch (error) {
                toast.error("Budget deletion failed!")
            }
        }

    }
    return(
    <div className="budget" style={{"--accent": color}} >
        <div className="progress-text">
            <h3>{name}</h3>
            <p>{formatCurrency(amount)} Budgeted</p>
        </div>
        <progress max={amount} value={spent}>
            {formatPercentage(spent/amount)}
        </progress>
        <div className="progress-text">
            <small>{ formatCurrency(spent)}</small>
            <small>{formatCurrency(amount-spent)}</small>
        </div>
        {
            showDelete ? (
                <div className="flex-sm">
                    <Form  onSubmit={handleDelete}>
                        {/* <input type="hidden" name="budgetId" value={}/> */}
                        <button type="submit" className="btn">
                            <span>Delete Budget</span>
                            <TrashIcon width={20}/>                            
                        </button>    
                    </Form>
                </div>

            ): (
                <div className="flex-sm">
                    <Link to={`budget/${_id}`} className="btn">
                        <span>View Details</span>
                        <BanknotesIcon width={20}/>
                    </Link>
                </div>

            )
        }
    </div>
    )
}
export default BudgetItem;