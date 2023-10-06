const express = require('express');
const router = express.Router();
const Profile = require('../models/profile.model');

router 
  .route('/')
  .get(async (req,res)=>{
    const { email} = req.query;
    console.log("email",email);
    const user = await Profile.findOne({email:email});

    let result;
    if(!user){
      result={"message":"user not found"};
    }else{
      result={
        "profile":user,
      }
    }res.json(result);
    
    
  })
  .post(async (req,res)=>{
     const body = req.body;
     console.log(body);
    let result ;
    try{
      const user = await Profile.create(body);
      if(!user){
        result= {
          "status":false,
        "message":"failed try again later",
        }
      }else{
        result={
          "status":true,
        "message":"profile updated successfully",
        }
      }
      res.json(result);
    }catch(error){

      res.json({
        "status":false,
        "message":"iNternal server error",
      })
    }
     
  })

  module.exports = router;