import React, { useContext, useState } from "react";
import { Context } from "../../main";
import axios from "axios";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import {GiHamburgerMenu} from 'react-icons/gi'

const Navbar = () => {
  const [show, setShow] = useState(false);
  const { isAuthorised, setIsAuthorised, user } = useContext(Context);
  const navigateTo = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await axios.get("localhost:8000/api/v1/user/logout", {
        withCredentials: true,
      });
      toast.success(response.data.message);
      setIsAuthorised(false);
      navigateTo("/login");
    } catch (error) {
      toast.error(error.response.data.message);
      setIsAuthorised(true);
    }
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
