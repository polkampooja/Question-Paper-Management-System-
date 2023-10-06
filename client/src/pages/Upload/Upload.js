import React, { useState, useEffect, useContext } from "react";
import "../Home/Home.css";
import axios from 'axios';
import { getUserDetails } from "../../services/authentication";
import { getSubjects, uploadExamPaper } from "../../services/upload";
import { UserContext } from "../../Auth";
import { useNavigate } from "react-router";

export default function Upload() {

  const { state }= useContext(UserContext);
  const navigate = useNavigate();
  useEffect(()=>{
    if(!state.email){
      navigate('/login');
      return;
    }
  },[state]) 
  const [ imgFile, setImgFile ]= useState();
  const [ subjects, setSubjects] =useState([]);
  const [subError, setSubError] = useState("");
  const [tab,setTab] = useState("select");
  const [paperData, setPaperData] = useState({
    email:"such@gmail.com",
    year:"",
    sem:"",
    paper:"",
    subject:"",
    branch:"",
    image:''
  })
  const updatePaperDetails=((field,val)=>{
    if(field==="subject" && val==="Other"){
      setTab("others");
      return;
    }
    setPaperData((prevPaperData)=>{
      return{
        ...prevPaperData,
        [field]:val
      }
      
    })
  })
  const uploadImage = (file)=>{
    const url = URL.createObjectURL(file);
    updatePaperDetails('image',url);
    setImgFile(file);
  }

  const handleSubmit = async(e)=>{
    e.preventDefault();
    const { error, data }= await uploadExamPaper(paperData,imgFile);
    if(error){
      window.alert("error"+data.message);
      return ;
    }
    window.alert("success"+data.message);
  }
  const fetchSubjects=async()=>{
    const {error, data} = await getSubjects();
    if(error){
      setSubError("can't load");
    }
    console.log(data);
    setSubjects(data.data);
  }
  useEffect(()=>{
    fetchSubjects();
  },[])

  return (
    <form className="home" onSubmit={handleSubmit}>
      <div className="top">
      <div className="select" >
        <select onChange={(e)=>updatePaperDetails('year',e.target.value)}>
          <option> Year</option>
          <option> 2022</option>
          <option> 2023</option>
          <option> 2024</option>
          <option> 2025</option>
        </select>
      </div>
      <div className="select">
        <select onChange={(e)=>updatePaperDetails('sem',e.target.value)}>
          <option> Sem</option>
          <option> Eng1-sem1</option>
          <option> Eng2-sem1</option>
          <option> Eng3-sem1</option>
          <option> Eng4-sem1</option>
          <option> Eng1-sem2</option>
          <option> Eng2-sem2</option>
          <option> Eng3-sem2</option>
          <option> Eng4-sem2</option>
        </select>
      </div>
      <div className="select" onChange={(e)=>updatePaperDetails('branch',e.target.value)}>
        <select>
          <option> Branch</option>
          <option> CSE</option>
          <option> ECE</option>
          <option> EEE</option>
          <option> MECH</option>
          <option> CIVIL</option>
          <option> CHEM</option>
          <option> Metallurgy</option>
        </select>
      </div>
      <div className="select">
        <select onChange={(e)=>updatePaperDetails('paper',e.target.value)}>
          <option> Paper</option>
          <option> sem</option>
          <option> MT1</option>
          <option> MT2</option>
          <option> MT3</option>
        </select>
      </div>
      <div className="select" onChange={(e)=>updatePaperDetails('subject',e.target.value)}>
        {tab==="select"?<select>
          <option> subject</option>
          {
            subError && <option >{subError}</option>
          }
          {
            subjects && subjects.length==0 && !subError && <option >loading...</option>
          }
          {
            subjects.map((subject,index)=>(
              <option key={index}> {subject}</option>
            ))
          }
          <option> Other</option>
        </select>:
        <input type="text" value={paperData.subject} onChange={(e)=>updatePaperDetails('subject',e.target.value)}/>}
      </div>
      <div>
        <input type="file" onChange={(e)=>uploadImage(e.target.files[0])}/>
      </div>
      </div>
      <div className="bottom">
        <input type="submit" value="Upload"/>
      </div>
      <img className="image" src={paperData.image} />
      
    </form>
  );
}
