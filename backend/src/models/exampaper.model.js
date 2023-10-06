const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const exampaperSchema = new Schema({
  email:{
    type:String,
    required:true,
  },
  year:{
    type:Number,
    required: true
  },
  sem:{
    type:String,
    required: true,
  },
  paper:{
    type:String,
    required: true,
    enum:["MT1","MT2","MT3","sem"]
  }, 
  subject:{
    type:String,
    required: true,
  }, 
  branch:{
    type:String,
    required: true,
  },
  image:{
    type:String,
    required: true,
  }
}
)
const ExamPaper = mongoose.model('exampaper', exampaperSchema);

module.exports = ExamPaper;
