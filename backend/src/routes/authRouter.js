const express=require("express");
const authRouter=express.Router();
const {validateSignUpData}=require("../utils/validation");
const User=require("../models/user");
const bcrypt=require("bcrypt");



authRouter.post("/signup",async(req,res)=>{
    try{
       //console.log(req)
       //validate the data
        validateSignUpData(req);
         const {firstName,lastName,password,emailId,age,gender}=req.body;
       //encryot the data 
       const passwordHash=await  bcrypt.hash(password,10);
      
     const data=new User({
         firstName,
        lastName,
        emailId,
        age,
        gender,
        password:passwordHash
     })
     await data.save();
   res.send("save the data ")
}
catch(err){
    
    res.status(404).send(err.message)
}
});


authRouter.post("/login",async(req,res)=>{
    try{
     const {emailId,password}=req.body;//got the error when i write emailId as email here don't write that 
     
    
     const checkUser=await User.findOne({emailId:emailId})
 
     
     if(!checkUser){
       
          res.status(400).send("Invalid credentials")


     }
    

     const checkPassword=await checkUser.validatePassword(password);
     if(checkPassword){
        const token=await checkUser.getJWT();

        res.cookie("token",token,{expires:new Date(Date.now()+8*3600000),});//expires in 8 hours 8days=8*24*60*60*1000
        res.send(checkUser);
     }
     else{
        res.status(400).send("Invalid credentials");
     }

     

    }catch(err){
        res.status(400).send("Error:"+err.message)
    }
})

authRouter.post("/logout",async(req,res)=>{
   try{

        res.cookie("token",null,{expires:new Date(Date.now())})
    res.send("Logout successfully");
   }catch(err){
      res.send("Error:"+err.message)
   }
  
})



module.exports=authRouter;