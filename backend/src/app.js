const express = require('express');
const bodyparser = require('body-parser');
const app = express();
const PORT = 5000;
app.listen(PORT, (error)=>{
  if(!error){
    console.log("Server is running");
  }else{
    console.log("Error ocurred");
  }
})