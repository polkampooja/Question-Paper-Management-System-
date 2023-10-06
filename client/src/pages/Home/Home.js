import React, { useState, useEffect } from "react";
import "./Home.css";
import { getUserDetails } from "../../services/authentication";
import axios from "axios";
import { getSubjects } from "../../services/upload";

const defaultsearch = {
  year:'',
  sem:'',
  paper:'',
  subject:'',
  branch:''
}
export default function Home() {
  const [ data, setData ]= useState();
  const [ search , setSearch ]= useState(defaultsearch);
  const [ searchedImg, setSearchedImg]= useState(null);
  const [ subjects, setSubjects] =useState([]);
  const [subError, setSubError] = useState("");
  const updateSearch = (field, value)=>{
    setSearch((prevSearch)=>{
      return {
        ...prevSearch,
        [field]:value
      }
    })
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
  // const fetchUser = async() => {
  //   const {error, data} = await getUserDetails("chary@gmail.com");
  //   if(error){
  //     window.alert("error");
  //     return;
  //   }
  //   window.alert(data.user.username);
  // }
  // useEffect(()=>{
  //   fetchUser();
  // },[])

  const handleSubmit = async(e)=>{
    e.preventDefault();
    const { year, sem, paper, subject, branch} = search;
    const data = await axios.get(`http://localhost:3000/api/examPaper/search?year=${year}&sem=${sem}&paper=${paper}&subject=${subject}&branch=${branch}`);
    console.log(data);
    setSearchedImg(data.data.image); 
  }
  return (
    <form className="home" onSubmit={handleSubmit}>
      <div className="top">
      <div className="select">
        <select onChange={(e)=>updateSearch('year',e.target.value)}>
          <option >Year</option>
          <option> 2022</option>
          <option> 2023</option>
          <option> 2024</option>
          <option> 2025</option>
        </select>
      </div>
      <div className="select">
        <select  onChange={(e)=>updateSearch('sem',e.target.value)}>
          <option >Sem</option>
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
      <div className="select">
        <select  onChange={(e)=>updateSearch('branch',e.target.value)} >
          <option >Branch</option>
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
        <select  onChange={(e)=>updateSearch('paper',e.target.value)} >
          <option >Paper</option>
          <option> sem</option>
          <option> MT1</option>
          <option> MT2</option>
          <option> MT3</option>
        </select>
      </div>
      <div className="select">
        <select  onChange={(e)=>updateSearch('subject',e.target.value)} >
        <option >Subject</option>
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
          
        </select>
      </div>
      <div className="bottom">
        <input type="submit" value="Search..."/>
      </div>
      </div>
      {
        searchedImg && <img  className="image" src={searchedImg}/>
      }
      {
        searchedImg && <a  href={searchedImg} download> Click to Download</a>
      }
    </form>
  );
}
