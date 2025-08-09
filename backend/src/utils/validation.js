
const validator =require("validator")
const  validateSignUpData =(req)=>{

const {firstName,lastName,emailId,password}=req.body
if(!firstName||!lastName){
     throw new Error ("Name is Not valid")
}
else if(!validator.isEmail(emailId)){
  throw new Error ("Email is not valid")    
}
else if(!validator.isStrongPassword(password)){
  throw new Error ("Please Enter the valid passwor")    
}



};

const validateEditDetails=()=>{
   const EditAllowedOnly=["firstName","lastName","gender","age","about","skills","photoUrl"];
    const fields=req.body;
   const isEditvalid=Object.keys(fields).every(key=> EditAllowedOnly.includes(key))

   return isEditvalid;
}
module.exports={
     validateSignUpData,
     validateEditDetails
}