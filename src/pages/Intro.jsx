import { Form, Link, useNavigate } from "react-router-dom";
import { useFetcher } from "react-router-dom"
// library imports
import { UserPlusIcon } from "@heroicons/react/24/solid";
// assets
import illustration from "../assets/illustration.png"
import { UserContext } from '../context/UserContext';
import {toast} from "react-toastify"
import { useContext, useRef, useState } from "react";
import axios from "axios";
import GetUserHook from "../hooks/GetUserHook";


const Intro = () =>{
    const navigate = useNavigate();
    const [loginData, setLoginData] = useState({
      email: "",
      password : "",
    })
    // CLEARING OUT THE FORM AFTER SUBMIT

    const emailRef = useRef();
    const passwordRef = useRef();

    const fetcher = useFetcher();
    const isSubmitting = fetcher.state ==="submitting";
    const {user,updateUser} = useContext(UserContext)
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
          updateUser(data);
          setLoginData({});
          toast.success("Successfully logged in")
          // window.location.href = '/';
          
          emailRef.current.value = '';
          passwordRef.current.value = '';
          emailRef.current.focus();
        }

  
          
      } catch (error) {
        console.log(error)
      }
  
    }
    return (
        <div className="intro">
            <div>
              <h1>
                Take Control Of <span className="accent">Your Money</span>
              </h1>
              <p>
              Personal budgeting is a secret to financial freedom. Start your Journey
              today
              </p>
              <form onSubmit={signinUser}>
              <input
                  type="text"
                  name="email"
                  required
                  placeholder="Enter you email"
                  aria-label="Your Name"
                  autoComplete="given-name"
                  onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                  ref={emailRef}
              />
              <input
                  type="password"
                  name="password"
                  required
                  placeholder="Enter you password"
                  aria-label="Your Password"
                  onChange={(e) =>
                  setLoginData({ ...loginData, password: e.target.value })
                  }
                  ref={passwordRef}
              />
              <input type="hidden" name="_action" value="newUser" />
              <div>
                  <button type="submit" disabled={isSubmitting} className="btn btn--dark">
                  {isSubmitting ? (
                      <span>Submitting</span>
                  ) : (
                      <>
                      <span>Sign In</span>
                      </>
                  )}
                  </button>
              </div>
              </form>
              {/* Move the Link outside the form */}
              {/* /react_expense_app_deploy/signup */}
              <Link to="/signup" className="btn btn--dark">
                  <span>Create Account</span>
                  <UserPlusIcon width={20} />
              </Link>
            </div>
            <img src={illustration} alt="Person with money" width={600} />
        </div>
    )
}
export default Intro;