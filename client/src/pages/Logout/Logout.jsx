import React , { useContext, useEffect } from "react"
import { UserContext } from "../../Auth"
import { useNavigate } from "react-router";
import "../Login/Login.css";
export const Logout = ()=>{

  const { state , loggedOut }= useContext(UserContext);
  const navigate = useNavigate();
  useEffect(()=>{
    if(!state.email){
      navigate('/login');
      return;
    }
  },[state])
  const logout = ()=>{
    loggedOut();
    navigate('/login');
    return;
  }
  const goBack = ()=>{
    navigate(-1);
    return;
  }
  return (
    <div className="login">
      <form className="loginCont">
        <h2>Logout</h2>
        
        <span>Are you sure you want to logout?</span>
        <div className="btncontain">
          <button className="buttn" onClick={goBack}>Cancel</button>
          <button className="buttn" onClick={logout}>Logout</button>
        </div>
        
      </form>
    </div>
    
  )
}
