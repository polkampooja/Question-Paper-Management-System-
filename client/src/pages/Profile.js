import React, { useState } from "react";
import axios from 'axios';
import { FontAwesomeIcon as FA} from '@fortawesome/react-fontawesome';
import {faArrowLeft, faBell } from '@fortawesome/free-solid-svg-icons';
import suchi from "../images/suchi.jpg";
export default function Profile(props){
  const {email,updateProfile} = props;
  const [error, setError] = useState("");
  const [ profile, setProfile ] = useState(null);
  const getDetails = async (email)=>{
    try{
      const res = await axios.get(`http://localhost:3000/reg?email=${email}`);
      if(!res.data){
        setError(res.data.message);
        return;
      }
      setProfile(res.data.profile);
    }catch(err){
      setError(err.response.data.message);
    }
  }
  React.useEffect(()=>{
    const res = getDetails(email);
  },[email])
  
  const goBack=()=>{
    updateProfile(false);
  }
  return(
    <div className="profile">
      <div className="circle-left"></div>
      <div className="circle-right"></div>
      <div className="top">
        <div className="left">
          <div className="backbtn" onClick={goBack}>
            <span><FA icon={faArrowLeft}/></span>
          </div>
          <div className="companyLogo">
            <span>FYNDNX VENTURES</span>
          </div>
        </div>
        <div className="notification">
          <span><FA icon={faBell}/></span>
        </div>
      </div>
      <div className="bottom"> 
        <div className="left">
          <img src={suchi}/>
          <h2>{profile?profile.name:"none"}</h2>
          <ul>
            <li className="active">DashBoard</li>
            <li>Profile</li>
            <li>Edit Profile</li>
            <li>My Network</li>
            <li>Need help?</li>
            <li>Logout</li>
          </ul>
        </div>
        <div className="right">
          <ul>
            <li className="active">Live Deals</li>
            <li>Most Funded</li>
          </ul>
        </div>
      </div>
    </div>
  )
}