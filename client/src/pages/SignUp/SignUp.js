import React, { useState } from "react";
import axios from 'axios';
import "../Login/Login.css";
import { signup } from "../../services/authentication";
const defaultUser = {
  email: "",
  username:"",
  password: "",
};
export default function SignUp() {
  const [user, setUser] = useState(defaultUser);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const updateUser=(field,value)=>{
    setUser((prevUser)=>{
      return {
        ...prevUser,[field]:value
      }
    })
  }
  const handleSubmit=async(e)=>{
    e.preventDefault();
    if(loading){
      return;
    }
    setLoading(true);
    const {error, data} = await signup(user);
    if(error){
      setLoading(false);
      setError(data.message);
      return;
    }
    setLoading(false);
    setSuccess("Successfully Signed in");
  }
  return (
    <div className="login">
      <form className="loginCont" onSubmit={handleSubmit}>
        <h2>Sign Up</h2>
        <div className="minilog">
          <label className="label">Email</label>
          <input className="input" required type="email" value={user.email} onChange={(e)=>updateUser("email",e.target.value)}/>
        </div>
        <div className="minilog">
          <label className="label">Username</label>
          <input className="input" required type="text" value={user.username} onChange={(e)=>updateUser("username",e.target.value)}/>
        </div>
        <div className="minilog">
          <label className="label">Password</label>
          <input className="input" required type="password" value={user.password} onChange={(e)=>updateUser("password",e.target.value)}/>
        </div>
        <div className="">
          <button className="btn" type="submit">
            SignUp
          </button>
        </div>
        <div>
          {
            error && 
            <div className="error">{error}</div>
          }
        </div>
        <div>
          {
            error && 
            <div className="success">{success}</div>
          }
        </div>
      </form>
    </div>
  );
}
