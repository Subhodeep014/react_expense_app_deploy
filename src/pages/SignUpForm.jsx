import React, { useState } from 'react';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import illustration from "../assets/illustration.jpg"

const SignUpForm = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({
    name: '',
    email: '',
    password: '',
  })
  const signupUser = async(e) => {
    e.preventDefault();
    const {name, email, password} = data;
    // You can handle form submission here
    try {
    const {data} = await axios.post('/signup',{
      name, email, password
    })

    if(data.error){
      toast.error(data.error)
    }else{
      setData({})
      toast.success("Sign up Succesful")
      navigate('/')
    }
      
    }catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="intro">
      <div>
      <h1  style={{marginBottom: 20}} >Signup to Takeover your Budget</h1>
        <form onSubmit={signupUser}>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={data.name}
            onChange={(e)=>setData({...data, name: e.target.value})}
          />
          <input
            type="text"
            name="email"
            placeholder="Email"
            value={data.email}
            onChange={(e)=>setData({...data, email: e.target.value})}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={data.password}
            onChange={(e)=>setData({...data, password: e.target.value})}
          />
          <button type="text" className="btn">
            Signup
          </button>
        </form>
      </div>
      <img src={illustration} alt="Person with money" width={600} />

    </div>
  );
};

export default SignUpForm;
