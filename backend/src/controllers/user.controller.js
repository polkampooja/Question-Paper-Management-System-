const { userService } = require("../services");


const signup = async(req, res)=>{
  const {code,info} = await userService.signup(req.body.user);
  res.status(code).json(info);
}
const login = async(req, res)=>{
  const {code, info} = await userService.login(req.body.user);
  const {token, username, email} = info;
  res
    .cookie('username',username,{httpOnly:true})
    .cookie('email',email,{httpOnly:true})
    .cookie('token',token,{httpOnly:false});
  res.status(code).json(info);
}
const logout = async(req, res)=>{
  const {username,email,token} = req.cookies;
  username && res.clearCookie('username');
  email && res.clearCookie('email');
  token && res.clearCookie('token');
}
const getUserDetails = async(req,res)=>{
  console.log(req.cookies);
  const {email} = req.query;
  const {code,info} = await userService.getUserDetails(email);
  res.status(code).json(info);
}
module.exports = {signup, login, logout, getUserDetails}