import React,{useEffect,useContext} from 'react'
import './App.css'
import {Context} from './main.jsx'
import {BrowserRouter as Router,Routes,Route, Navigate} from 'react-router-dom'
import Login from './components/Auth/Login.jsx'
import Register from './components/Auth/Register.jsx'
import Navbar from './components/Layout/Navbar.jsx'
import Footer from './components/Layout/Footer.jsx'
import Home from './components/Home/Home.jsx'
import Jobs from './components/Job/Jobs.jsx'
import JobDetails from './components/Job/JobDetails.jsx'
import MyJobs from './components/Job/MyJobs.jsx'
import PostJob from './components/Job/PostJob.jsx'
import NotFound from './components/NotFound/NotFound.jsx'
import Application from './components/Applications/Application.jsx'
import MyApplications from './components/Applications/MyApplications.jsx'
import ResumeModal from './components/Applications/ResumeModal.jsx'

import {Toaster} from 'react-hot-toast'


function App() {
    const {isAuthorised,setIsAuthorised,setUser}=useContext(Context);

    useEffect(()=>{
     const fetchUser=()=>{

      fetch("https://jobzee-to3i.onrender.com/api/v1/user/getUser",{
        method:"GET",
        credentials:"include"

       })
       .then((res)=>res.json())
       .then((data)=>{
        if(data.success===true){
          setUser( data.user)
       setIsAuthorised(true);
        }
        else{
          setIsAuthorised(false);
        }
        
       })
       .catch((e)=>{
        console.log(e);
        
       
       })
 }

     fetchUser()
    },[isAuthorised])

    

  return (
    <>
     <Router>
        
       <Navbar></Navbar>
       <Routes>
         <Route path='/login' element={<Login></Login>}/>
         <Route path='/register' element={<Register></Register>}/>
         <Route path='/' element={<Home></Home>}/>
         <Route path='/job/getall' element={<Jobs></Jobs>}/>
         <Route path='/job/post' element={<PostJob></PostJob>}/>
         <Route path='/job/me' element={<MyJobs></MyJobs>}/>
         <Route path='/job/:id' element={<JobDetails></JobDetails>}/>
         <Route path='/application/:id' element={<Application></Application>}/>
         <Route path='/application/me' element={<MyApplications></MyApplications>}/>
         <Route path='*' element={<NotFound></NotFound>}/>

        
       </Routes>
       <Footer/>
     </Router>

    
    </>
  )
}

export default App
