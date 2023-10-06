const express = require('express');
const router = express.Router();
const ExamPaper = require('../models/exampaper.model');
const { examController, imageController } = require('../controllers');
const authenticate = require('../middlewares/authenticate');

router 
  .route('/upload')
  .post(authenticate, imageController.upload.single('image'),examController.createExamPaper)
  .get(async (req,res)=>{
      const allPapers = await ExamPaper.find();
      res.json(allPapers);
  })

router
  .route('/search')
  .get(async (req,res)=>{
    const {year,sem,paper,subject,branch} = req.query;
    const searchPaper = await ExamPaper.findOne({year,sem,paper,subject,branch});
    res.json(searchPaper);
  })  

router
  .route('/searchbyuser')
  .get(async (req,res)=>{
    const {email} = req.query;
    const searchPapers = await ExamPaper.find({email});
    res.json(searchPapers);
  })

router
  .route('/subjects')
  .get(async (req,res)=>{
    const subjects = await ExamPaper.distinct('subject');
    res.json(subjects);
  })
module.exports = router;  