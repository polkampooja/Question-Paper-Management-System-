import React, { useContext, useState } from "react";
import axios from 'axios';
import "./Login.css";
import { login } from "../../services/authentication";
import { UserContext } from "../../Auth";
import { useNavigate } from "react-router";
const defaultUser = {
  email: "",
  password: "",
};
export default function Login() {

  const { state, loggedin }= useContext(UserContext);
  const navigate = useNavigate();
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
    const {error, data} = await login(user);
    if(error){
      setLoading(false);
      setError(data.message);
      return;
    }
    setLoading(false);
    setSuccess("Successfully Logged in");
    loggedin(user.email);
    navigate('/upload');
  }
  return (
    <div className="login">
      <form className="loginCont" onSubmit={handleSubmit}>
        <h2>Login</h2>
        <div className="minilog">
          <label className="label">Email</label>
          <input className="input" required type="email" value={user.email} onChange={(e)=>updateUser("email",e.target.value)}/>
        </div>
        <div className="minilog">
          <label className="label">Password</label>
          <input className="input" required type="password" value={user.password} onChange={(e)=>updateUser("password",e.target.value)}/>
        </div>
        <div className="">
          <button className="btn" type="submit">
            Login
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
            success && 
            <div className="success">{success}</div>
          }
        </div>
        
      </form>
    </div>
  );
}
