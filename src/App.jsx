import React, { useEffect } from 'react'
import Home from './pages/Home/Home'
import { Routes,Route, useNavigate } from 'react-router-dom'
import Login from './pages/Login/Login'
import Player from './pages/Player/Player'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from './firebase'
import { ToastContainer, toast } from 'react-toastify';


const App = () => {
  const navigate = useNavigate();
 useEffect(()=>{
  onAuthStateChanged(auth, async (user)=>{
    if (user) {
      console.log("logged in");
       if (window.location.pathname === "/login") {
        navigate("/");  // only redirect if user is stuck on login page
      }
    }
    else{
      console.log("logged out");
      navigate('/login');
    }
  })
 },[navigate])

  return (
    <div>
      <ToastContainer theme='dark' />
      <Routes>
        <Route path="/" /* /=homepage */ element={ <Home/>} /* whenever we type '/' in broweser it will display home page */ />
        <Route path="/login"  element={ <Login/>}  />
        <Route path="/player/:id"  element={ <Player/>}  />
      </Routes>
     
    </div>
  )
}

export default App