const express = require('express');
const cors = require('cors');
require('dotenv').config()
const app = express();
const mongoose = require('mongoose')
const registration = require('./src/routes/registration');
const exam = require('./src/routes/examPaper')
const bodyparser = require('body-parser');
const cookieparser = require('cookie-parser');
const routes = require('./src/routes');

mongoose.connect('mongodb://127.0.0.1:27017/exam').then(() => {
  console.log('Connected to MongoDB');
  let server = app.listen(3000, () => {
    console.log(`Listening to port 3000`);
  });
});

app.use(express.json());
const corsOptions ={
  origin:'http://localhost:3001', 
  credentials:true,            
  optionSuccessStatus:200,
  allowedHeaders: ['Content-Type','Authorization','x-csrf-token'],
}
app.use(cors(corsOptions));
app.use(cookieparser());

app.use(express.urlencoded({ extended: true }));


app.use(bodyparser.urlencoded({extended: false}));
app.use(bodyparser.json());

app.use(express.urlencoded({ extended: true }));

// app.use('/reg',registration);
app.use('/api',routes);
// app.use('/',(req,res)=>{
//   res.send("home page");
// })

