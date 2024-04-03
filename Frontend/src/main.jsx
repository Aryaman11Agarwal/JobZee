import React, { createContext, useState } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export const Context=createContext();

const AppWrapper=()=>{
  const [isAuthorised,setIsAuthorised]=useState(false);
  const [user,setUser]=useState({});

  return (
    <Context.Provider value={{isAuthorised,setIsAuthorised,user,setUser}}>
       <App></App>
       
    </Context.Provider>
  )
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AppWrapper />
    <ToastContainer />
  </React.StrictMode>
)
