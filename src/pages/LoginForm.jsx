import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../context/UserContext';
import {toast} from "react-toastify"
import { useNavigate } from "react-router-dom";
import GetExpenseHook from '../hooks/GetExpenseHook';

const LoginForm = () => {
  const navigate = useNavigate();
  const [loginData, setLoginData] = useState({
    email: "",
    password : "",
  })


  const signinUser = async(e)=> {
    e.preventDefault()
    const {email, password} = loginData;

    try {
      const {data} = await axios.post('/signin',{
        email,
        password,
      })
      if(data.error){
        toast.error(data.error);
      }
      else{
        updateUser(data.user);
        setLoginData({});
        toast.success("Successfully logged in")
        navigate('/')
        GetExpenseHook()

      }

        
    } catch (error) {
      console.log(error)
    }

  }

  return (
    <div className="form-box">
      <h4>Sign in to your account</h4>
      <form onSubmit={signinUser}>
        <input
          type="text"
          name="email"
          placeholder="Email"
          value={loginData.email}
          onChange={(e)=>setLoginData({...loginData, email: e.target.value})}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={loginData.password}
          onChange={(e)=>setLoginData({...loginData, password: e.target.value})}
        />
        <button type="submit" className="btn">
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
