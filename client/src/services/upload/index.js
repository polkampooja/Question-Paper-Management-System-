
import axios from 'axios';
axios.defaults.withCredentials=true;


export const uploadExamPaper = async (paperData, imgFile)=>{
  try{
    let formData =  new FormData();
    formData.append('image',imgFile);
    formData.append('paper',JSON.stringify(paperData));
    const res = await axios.post(`http://localhost:3000/api/exampaper/upload`,formData,{
      headers:{
        'Content-Type':'multipart/form-data'
      }
    });console.log(res);
    return {
      data:res.data
    }
  }catch(err){
    return {
      error:true,
      data: err.response.data
    }
  }
}
export const getSubjects = async () =>{
  try{
    const sub = await axios.get(`http://localhost:3000/api/exampaper/subjects`);
    return {
      data:sub
    }
  }catch(err){
    return {
      error:true,
      data: []
    }
  }
}