import axios from "axios"
import { LOGIN_URL, SIGNUP_URL, USERDETAILS_URL } from "../../urls"
axios.defaults.withCredentials=true;

const instance = axios.create({withCredentials:true});
export const login = async (user) => {
  try{
    const res = await axios.post(`${LOGIN_URL}`,{user});
    return {error:false, data:res.data};
  }catch(e){
    return {error:true,data:e.response.data};
  }
}
export const signup = async (user) => {
  try{
    const res = await axios.post(`${SIGNUP_URL}`,{user});
    return {error:false, data:res.data};
  }catch(e){
    return {error:true,data:e.response.data};
  }
}
 
export const getUserDetails = async(email)=>{
  try{
    const res = await instance.get(`${USERDETAILS_URL}?email=${email}`);
    console.log("res",res);
    return {error:false, data:res.data};
  }catch(e){
    console.log(e.response);
    return {error:true,data:e.response.data};
  }
}