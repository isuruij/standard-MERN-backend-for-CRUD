const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken")

// creating a schema to create a model
const Schema = mongoose.Schema;

//creating a schema model
const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  age: {
    type: Number,
    required: true,
  },
  password:{
    type: String,
    required: true,
    trim: true,
  },
  tokens:[
    {
        token:{
            type:String,
        }
    }
  ]
});



userSchema.pre("save", async function (next) {
  const user = this;
  
  if(user.isModified("password")){
    user.password = await bcrypt.hash(user.password,8)
  }
  next();
});


userSchema.statics.findByCredentials = async (email,password)=>{

  const user = await User.findOne({email:email})
  if(!user){
    throw new Error()
  }
  
  const isMatch = await bcrypt.compare(password,user.password)

  if(!isMatch){
    throw new Error()
  }

  return user;


}

userSchema.methods.generateAuthToken = async function(){
    const user = this;
    const token = jwt.sign({_id:user._id.toString()},"mysecret")
    user.tokens = user.tokens.concat({token})
    await user.save()
    return token;
}

// creating a model using the schema
const User = mongoose.model("User", userSchema);

// exporting the model to use it in another program files
module.exports = User;
