import React, { useContext } from 'react'
import { Context } from '../../main'
import { Link } from 'react-router-dom'
import {FaFacebookF,FaLinkedin} from "react-icons/fa"
import {RiInstagramFill} from "react-icons/ri"

const Footer = () => {
  const {isAuthorised}=useContext(Context)
  return (
    <footer className={isAuthorised?"footerShow":"footerHide"}>
      <div>&copy; All Rights Reserved</div>
      <Link to={'/'} target='_blank'><FaFacebookF/></Link>
      <Link to={'/'} target='_blank'><FaLinkedin/></Link>
      <Link to={'/'} target='_blank'><RiInstagramFill/></Link>
    </footer>
    
  )
}

export default Footer
