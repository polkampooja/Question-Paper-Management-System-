const jwt = require("jsonwebtoken");
const { logout } = require("../controllers/user.controller");
const { Profile } = require("../models");


const authenticate = async(req, res, next) => {
  console.log("my cookies",req.cookies);
  const {token, email, username } = req.cookies;
  console.log(req.query.email);
  if(!token){
    res.status(401).send({status:false,message:"token is expired"});
  }
  await jwt.verify(token, "mykey",async(error, decryptedToken)=>{
    if(error) res.status(401).send({status:false,message:"Invalid token"});
    const status = await Profile.isEmailExists(email);
    if(!status) res.status(400).send({status:false,message:"User does not exists"});
    if(email != decryptedToken.email){
      res.status(400).send({status:false,message:"Unauthorized user"});
    }
    next();
  })

}
module.exports = authenticate;