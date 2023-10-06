const { examService } = require("../services");

const createExamPaper = async(req,res)=>{
  const paperData =  JSON.parse(req.body.paper);
  paperData.image = (req.file?'./uploads/'+req.file.filename:'');
  const { code, info }=  await examService.createExamPaper(paperData);
  res.status(code).json(info);
}

module.exports = {createExamPaper};