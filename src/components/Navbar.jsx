import React, { useContext } from "react";
import { Link, Outlet, redirect, useNavigate} from 'react-router-dom'
import {Form, NavLink} from "react-router-dom"
// library imports
import {TrashIcon, ArrowLeftStartOnRectangleIcon} from '@heroicons/react/24/solid'
// assets
import logomark from "../assets/logomark.svg"
import { UserContext } from "../context/UserContext";
import axios from "axios";
import GetUserHook from "../hooks/GetUserHook";
import { toast } from "react-toastify";


const Navbar = ()=>{
    const { user} = useContext(UserContext);
    const navigate  = useNavigate();
    const handleLogout = async (event) => {
        event.preventDefault();
        
        if (confirm("Delete user and all data?")) {
            try {
                const {response} = await axios.get('/logout');
                navigate("/");
                toast.success("Signed out!")
                window.location.reload(true);
            } catch (error) {
                toast.error(response.error)
                console.error('Logout error:', error);
            }
        }
    };
    return (
        <nav>
            <Link to="/react_expense_app_deploy" aria-label="Go to Home">
                <img src={logomark} height={30} alt="" />
                <span>HomeBudget</span>
            </Link>
            {
                user.name && (
                    <Form
                    onSubmit={handleLogout}
                    
                    >
                        <button type="submit" className="btn btn--warning">
                            <span>Signout</span>
                            <ArrowLeftStartOnRectangleIcon width={20}/>
                            
                        </button>
                    </Form>

                    
                )
            }

        </nav>
    )
}  

export default Navbar;