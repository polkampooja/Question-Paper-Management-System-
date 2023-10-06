import React, { useState } from "react";

export default function SearchFilter() {
  const branch = [
    "CSE",
    "CSU",
    "ECE",
    "CHEM",
    "MECH",
    "CIVIL",
    "EEE"
  ]
  const [filterList,setFilterList] = useState(branch);
  const changeBranch=(event)=>{
    if(event.target.value===""){
      setFilterList(branch);
      return;
    }
    const filteredValues = branch.filter(
      (item)=>{
      if(item.toLowerCase().includes(event.target.value.toLowerCase())){
        return event.target.value;
      }}
    );
    setFilterList(filteredValues);  
  }
 
  return (
    <div className="login">
      <div>Search: <input type="text" onChange={changeBranch}></input></div>
      {filterList && filterList.map((item,index)=>(
        <div key={index}>{item}</div>
      )) }
    </div>
  );
}
