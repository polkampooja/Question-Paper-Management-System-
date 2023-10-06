const ExamPaper = require("../models/exampaper.model")

const createExamPaper=async(paperData)=>{
  const newExamPaper = await ExamPaper.create(paperData);
  return {code:200,info:{status:true,message:"success",data:newExamPaper}}
}

module.exports = { createExamPaper };