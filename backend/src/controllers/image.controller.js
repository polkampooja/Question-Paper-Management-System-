const multer = require('multer');

const storage =  multer.diskStorage({
  destination:(req,file,cb)=>{
    cb(null,'../client/public/uploads/');
  },
  filename:(req,file,cb)=>{
    const fileName = file.originalname.toLowerCase().split(' ').join('-');
    cb(null,'img-'+fileName)
  }
})

const upload = multer({
  storage:storage,
  fileFilter:(req,file,cb)=>{
    if(!file) cb(null,true);
    if(file.mimetype=="image/png" || file.mimetype=="image/jpeg" || file.mimetype=="image/jpg"){
      cb(null,true);
    }else{
      cb(null,false);
      return cb(new Error('only jpeg, jpg  and png images are allowed'));
    }
  }
})

module.exports ={ upload };