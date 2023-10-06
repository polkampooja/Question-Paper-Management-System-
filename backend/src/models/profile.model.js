const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const profileSchema = new Schema({
  email:{
    type:String,
    unique:true,
    required: true,
  },
  username:{
    type:String,
    required: true,
  },
  password:{
    type:String,
    required:true
  },
  linkedin:{
    type:String,
  },
  city:{
    type:String,
  }, 
  state:{
    type:String,
  }, 
  country:{
    type:String,
  }, 
  pin:{
    type:Number,
  },
  phone:{
    type:String,
  }
}
)

profileSchema.statics.isEmailExists = async function(email){
  const user = await this.findOne({email});
  return !!user;
}

profileSchema.statics.getUser = async function(email){
  const user = await this.findOne({email});
  return user;
}

const Profile = mongoose.model('profile', profileSchema);

module.exports = Profile;
