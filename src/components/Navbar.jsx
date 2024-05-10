import React, { useContext } from "react";
import { Outlet, redirect} from 'react-router-dom'
import {Form, NavLink} from "react-router-dom"
// library imports
import {TrashIcon, ArrowLeftStartOnRectangleIcon} from '@heroicons/react/24/solid'
// assets
import logomark from "../assets/logomark.svg"
import { UserContext } from "../context/UserContext";
import axios from "axios";
import GetUserHook from "../hooks/GetUserHook";

const handleLogout = async (event) => {
    event.preventDefault();
    
    if (confirm("Delete user and all data?")) {
        try {
            const response = await axios.get('/logout');
            window.location.href = '/';
        } catch (error) {
            console.error('Logout error:', error);
        }
    }
};
const Navbar = ()=>{
    const { user} = useContext(UserContext);
    return (
        <nav>
            <NavLink to="/" aria-label="Go to Home">
                <img src={logomark} height={30} alt="" />
                <span>HomeBudget</span>
            </NavLink>
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