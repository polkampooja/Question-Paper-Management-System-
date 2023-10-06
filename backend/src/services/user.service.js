const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { Profile } = require('../models');


const signup = async(userBody)=>{
  console.log(userBody);
  const {email,username, password} = userBody;
  const user = await Profile.isEmailExists(email);
  if(user){
    return {code:400, info:{message: "Email already exists"}};
  }
  console.log(password);
  const hashedpwd = await bcrypt.hash(password, 10);
  const newUser = await Profile.create({
    email:email,
    username:username,
    password:hashedpwd
  })
  if(!newUser){
    return {code:500, info:{message: "Unable to signup due to DB"}};
  }
  const token = jwt.sign({
    email,username
  },"mykey");

  return {code:200,info:{token}};

}
const login = async(userBody)=>{
  const {email, password} = userBody;
  const status = await Profile.isEmailExists(email);
  if(!status){
    return {code:400, info:{message: "Email does not exists"}};
  }
  const user = await Profile.getUser(email);
  const match = await bcrypt.compare(password, user.password);
  if(!match){
    return {code:400, info:{message: "Invalid Password"}};
  }
  const token = jwt.sign({
    email,username:user.username
  },"mykey");
  return {code:200,info:{token, username: user.username, email}};
}
const getUserDetails = async(email)=>{
  const user = await Profile.getUser(email);
  if(!user) return {code:400, info:{message: "User does not exists"}};
  return {code:200, info:{user}};
}
module.exports = {signup, login,getUserDetails}