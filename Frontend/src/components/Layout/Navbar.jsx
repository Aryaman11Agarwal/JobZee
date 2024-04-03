import React, { useContext, useState } from "react";
import { Context } from "../../main";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import { Link, useNavigate } from "react-router-dom";
import {GiHamburgerMenu} from 'react-icons/gi'

const Navbar = () => {
  const [show, setShow] = useState(false);
  const { isAuthorised, setIsAuthorised, user } = useContext(Context);
  const navigateTo = useNavigate();

  const handleLogout =  () => {
 


    fetch("http://localhost:8000/api/v1/user/logout",{
      method:"GET",
      credentials:"include"
     


    })
    .then((res)=>res.json())
    .then((data)=>{
      if(data.success===true){
        setIsAuthorised(false);
        toast("Logged Out Successfully")
        navigateTo("/login");
      }
      else{
        toast.error("Loging out failed")
        setIsAuthorised(true);
      }
      
    })
    .catch((e)=>{

      
      console.log(e);
     
    });

    
  };
  return (
    <>
      <nav className={isAuthorised ? "navbarShow" : "navbarHide"}>
        <div className="container">
          <div className="logo">
            <img src="/JobZee-logos__white.png" alt="logo" />
          </div>
          <ul className={!show ? "menu" : "show-menu menu"}>
            <li>
              <Link to={"/"} onClick={() => setShow(false)}>
                HOME
              </Link>
            </li>
            <li>
              <Link to={"/job/getall"} onClick={() => setShow(false)}>
                ALL JOBS
              </Link>
            </li>
            <li>
              <Link to={"/application/me"} onClick={() => setShow(false)}>
                {user && user.role === "Employer"
                  ? "APPLICANT'S APPLICATIONS"
                  : "MY APPLICATIONS"}
              </Link>
            </li>

            {
              user && user.role==='Employer'?(
                <>
                <li>
                  <Link to={'/job/post'}>
                    POST NEW JOB
                  </Link>
                </li>

                <li>
                  <Link to={'/job/me'}>
                    VIEW YOUR JOBS
                  </Link>
                </li>
                </>
              ):(<></>)
            }

            <button onClick={handleLogout}>LOGOUT</button>
          </ul>

          <div className="hamburger">
            <GiHamburgerMenu onClick={()=>setShow(!show)}/>
          </div>
        </div>
      </nav>
     
    </>
  );
};

export default Navbar;
