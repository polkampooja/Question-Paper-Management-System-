import React from 'react';
import { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import './App.css';
import Register from './pages/Register';
import Profile from './pages/Profile';
import NavBar from './pages/NavBar/NavBar';
import Login from './pages/Login/Login';
import Home from './pages/Home/Home';
import SignUp from './pages/SignUp/SignUp';
import Upload from './pages/Upload/Upload';
import { Auth } from './Auth';
import {Logout} from './pages/Logout/Logout';
import HomePage from './pages/HomePage/HomePage';
function App() {
  const [profile,setProfile] = useState(false);
  const [email, setEmail] = useState("");
  const updateEmail = (value)=>{
    setEmail(value);
  }
  const updateProfile = (value)=>{
    setProfile(value);
  }
  return (
    <Auth>

    <div className="App">
      
      <Router>
        <NavBar/>
        
        <Routes>
          <Route path='/register' element={<Register/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/logout' element={<Logout/>}/>
          <Route path='/signup' element={<SignUp/>}/>
          <Route path='/home' element={<Home/>}/>
          <Route path='/homepage' element={<HomePage/>}/>
          <Route path='/profile' element={<Profile/>}/>
          <Route path='/upload' element={<Upload/>}/>
        </Routes>
      </Router>
      

      
     
      {/* {profile ? <Profile email ={email} updateProfile={updateProfile}/>:<Register updateEmail={updateEmail} updateProfile={updateProfile}/>} */}
    </div>
    </Auth>
  );
}

export default App;
