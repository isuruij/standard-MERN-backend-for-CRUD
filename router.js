const express = require("express");
const router = express.Router();

const User = require("./model"); 
const auth = require("./middleware/auth")

// Authorization

router.post("/users/login", async (req, res) => {
  try {
    const user = await User.findByCredentials(
      req.body.email,
      req.body.password
      );
      
      const token = await user.generateAuthToken()
      console.log("hi")
    console.log(token)
    res.send({user,token});
    console.log("done")
  } catch (error) {
    res.status(401).send();
  }
});


router.post("/users/login", async (req,res)=>{
  try{
    const user = await User.findByCredentials(req.body.email,req.body.password)
    const token = await user.generateAuthToken()
    res.send(user)
  }catch(error){
    res.status(401).send()
  }

})

router.post("/users", async (req, res) => {
    console.log(req.body);
    const user = new User(req.body);
   
    try {  
      await user.save();
      res.status(201).send(user);
    } catch (error) {
      res.status(400).send(error);
    }
  }); 


  router.get("/users/:id", async (req, res) => {
    try {
      const user = await User.find({id:req.params.id});
      res.status(200).send(user);
    } catch (error) { 
      res.status(400).send(error);  
    } 
  }); 


  router.get("/users",auth, async (req, res) => {
    try {
      const user = await User.find();
      res.status(200).send(user);
    } catch (error) { 
      res.status(400).send(error);  
    } 
  });  

 

  router.patch("/users/:name", async (req, res) => {
    try {
      const updatedUser = await User.findOneAndUpdate(
        { name: req.params.name },
        req.body,
        { new: true }
      );
  
      if (!updatedUser) {
        return res.status(404).send({ message: "User not found" });
      }
  
      res.status(200).send({ message: "User updated successfully", updatedUser });
    } catch (error) {
      res.status(400).send({ message: "Bad Request", error });
    }
  });
  




  router.delete("/users/:name", async (req, res) => {
    try {
      const deletedUser = await User.findOneAndDelete({ name: req.params.name });
   
      if (!deletedUser) {
        // If no user with the specified name is found
        return res.status(404).send({ message: "User not found" });
      }
  
      res.status(200).send({ message: "User deleted successfully", deletedUser });
    } catch (error) {
      res.status(500).send({ message: "Internal Server Error" });
    }
  });
  



  module.exports = router;