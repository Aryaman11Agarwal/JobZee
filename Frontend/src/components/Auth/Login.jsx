import React, { useContext, useState } from "react";
import { FaRegUser } from "react-icons/fa";
import { MdOutlineMailOutline } from "react-icons/md";
import { RiLock2Fill } from "react-icons/ri";
import { FaPencilAlt } from "react-icons/fa";
import { FaPhoneFlip } from "react-icons/fa6";
import { Link, Navigate } from "react-router-dom";

import { Context } from "../../main";
import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


 


 

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");

  const { isAuthorised, setIsAuthorised, user, setUser } = useContext(Context);

  const handleLogin =  (e) => {

     e.preventDefault();

     fetch("http://localhost:8000/api/v1/user/login",{
      method:"POST",
      body:JSON.stringify({email, role, password }),
      headers:{
        "Content-type":"application/json"
      },
      credentials:"include"
     })
     .then(response=>response.json())
     .then((data)=>{
      if(data.success===true){
      
     
      setEmail("");
      setPassword("");
      setRole("");
      setIsAuthorised(true);
      toast("You have Logged in  Successfully");
    }

      else{
        setIsAuthorised(false);
        toast.error(data.message);
      
      }
     })
     .catch((e)=>{
     
      console.log(e)});
};

  if(isAuthorised){
    return <Navigate to={'/'}/>
  }


  return (
    <>
      <section className="authPage">
        <div className="container">
          <div className="header">
            <img src="/JobZeelogo.png" alt="logo" />
            <h3>Login to your account</h3>
          </div>
          <form>
            <div className="inputTag">
              <label>Login As</label>
              <div>
                <select value={role} onChange={(e) => setRole(e.target.value)}>
                  <option value="">Select Role</option>
                  <option value="Employer">Employer</option>
                  <option value="Job Seeker">Job Seeker</option>
                </select>
                <FaRegUser />
              </div>
            </div>
        
            <div className="inputTag">
              <label>Email Address</label>
              <div>
                <input
                  type="email"
                  placeholder="aryaman@gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <MdOutlineMailOutline />
              </div>
            </div>
         
            <div className="inputTag">
              <label>Password</label>
              <div>
                <input
                  type="password"
                  placeholder="Your Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <RiLock2Fill />
              </div>
            </div>
            <button type="submit" onClick={handleLogin}>

              Login
            </button>
           
            <Link to={"/register"}>Register</Link>
          </form>
        </div>
        <div className="banner">
          <img src="/login.png" alt="login" />
        </div>
      </section>
     
      
    </>
  );
};

export default Login;