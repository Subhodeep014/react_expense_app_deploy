
import './App.css'
import "react-toastify/dist/ReactToastify.css";
// import SignUpSignIn from './pages/LoginForm'
import LoginForm from './pages/LoginForm'
import SignUpForm from './pages/SignUpForm'
import {createBrowserRouter, RouterProvider} from "react-router-dom"
import {UserContextProvider } from './context/UserContext'
import axios from 'axios'
import { ToastContainer } from "react-toastify";
import Main from './layouts/Main';
import Dashboard from './pages/Dashboard';
import ProtectedRoute from './privateRoutes/ProtectedRoute';
import Error from './pages/Error';
import BudgetPage from './pages/BudgetPage';
import ExpensesPage from './pages/ExpensesPage';



// console.log(user)



axios.defaults.baseURL = 'https://expenseapi.netlify.app/api'
axios.defaults.withCredentials = true;

function App() {


  const router = createBrowserRouter([
    {
      path : "/react_expense_app_deploy/",
      element: <Main/>,
      errorElement: <Error/>,
      children: [
        {
          index: true,
          element:  <Dashboard/>,
          errorElement: <Error/>,
        },
        {
          path:"/signup",
          element: <SignUpForm/>,
          errorElement: <Error/>,
        },
        {
          path: "budget/:id",
          element: <BudgetPage/>,
          errorElement: <Error/>,
        },
        {
          path: "expenses",
          element: <ExpensesPage />,
          errorElement: <Error/>,
        },

      ]
    },
    
  ])
  return (
    <UserContextProvider>
      <div className="App">
        <RouterProvider router={router}/>
        {/* <SignUpForm/> */}
        <ToastContainer/>
      </div>

    </UserContextProvider>
  )
}

export default App
