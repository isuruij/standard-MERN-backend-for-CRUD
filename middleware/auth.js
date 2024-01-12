const jwt = require("jsonwebtoken")
const User = require("../model")


const auth = async (req,res,next)=>{
    try{
        const token = req.header("Authorization").replace("Bearer ","")
        const decoded = jwt.verify(token,"mysecret")  
        console.log(decoded) 

        const user = await User.findOne({_id:decoded._id,"tokens.token":token})

        if(!user){
            throw new Error()
        }
        req.user = user
        req.token = token

        next()
    }
    catch(e){
        res.status(401).send({error:"please authenticate"})
    }
    
}

module.exports = auth;