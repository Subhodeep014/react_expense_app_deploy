import axios from "axios";

export async function fetchData(dataName, email) {
  try {
    const response = await axios.get(`/${dataName}?email=${email}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching ${dataName}:`, error);
    return { error: error.message || "An error occurred while fetching data" };
  }
}


export const calculateSpentByBudget = async (budgetId, email) => {
  const expenses = await fetchData("getexpenses", email) ?? [];
  // console.log("expenses-->", expenses)
  const budgetSpent = expenses.reduce((acc, expense) => {
    // check if the expense.id==budget.Id  I have passed in
    if ((expense.budgetid !== budgetId)) return acc;

    // add current amount to my total
    return acc + expense.expenseamount
  }, 0)
  return budgetSpent
}
export const getAllMatchingItems = async({category, key, value, email})=>{
  const data = await fetchData(category, email)

  return data.filter((item)=> item[key]===value)

}
export const formatDateToLocaleString = (epoch) =>{
  return new Date(epoch).toLocaleDateString();
}

export const formatPercentage = (amt) => {
  return amt.toLocaleString(undefined, {
    style: "percent",
    minimumFractionDigits: 0,
  });
}


// format currency
export const formatCurrency = (amt) => {
  return amt.toLocaleString(undefined, {
    style: "currency",
    currency: "INR"
  })
}
