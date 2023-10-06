import React from 'react';
import './HomePage.css';
import examBro from "../../assets/exambro.png";
import { useNavigate } from 'react-router';
export default function HomePage(){
  const navigate = useNavigate();
  const goto=()=>{
    navigate('/home');
    return;
  }
  return(
    <div className="banner">
      <div className="container">
        <div className="left">
          <h1>It's Exams Time !!</h1>
          <p>We are here to FIND your exam papers </p>
          <button className='btn' onClick={goto}>Get Started</button>
        </div> 
        <div className="right">
          <img src={examBro} alt="" />
        </div>
      </div>
    </div>
  )
}