import React, { useContext, useState } from "react";
import { Link } from 'react-router-dom';
import "./NavBar.css";
import { UserContext } from "../../Auth";

export default function NavBar() {

  const { state } = useContext(UserContext);

  return (
    <div className="nav">
      <ul className="navCont">
      <li>
          <Link to="/homepage" ><span>Home</span></Link>
        </li>
        <li>
          <Link to="/home" ><span>Search</span></Link>
        </li>
        <li>
        <Link to="/upload" ><span>Upload</span></Link>
          
        </li>
        { state.email?
        <li> <Link to='/logout'>Logout</Link> </li>:
        (<li>
        <Link to="/login" ><span>Login</span></Link>
          
        </li>
        )}
        
      </ul>
    </div>
  );
}
