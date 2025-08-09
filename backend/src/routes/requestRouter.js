const express=require("express")
const requestRouter=express.Router();
const {userAuth}=require("../middleware/auth");
const {ConnectionRequest}=require("../models/connectionRequest");
const User=require("../models/user");

requestRouter.post("/request/send/:status/:userId",userAuth,async(req,res)=>{
   try{
 const  fromUserId= req.user._id;
    const toUserId=req.params.userId;
    const status=req.params.status;

    const allowedStatus=["ignored","interested"];

    const toUser=await User.find({_id:toUserId});
    if(toUser.length==0){
      return res.status(400).json({message:"The User  which you send request is not  found"});
    }
    if(fromUserId.toString()===toUserId.toString()){//these are mongoDb object  so we can't use js operator that's why i chnge into stirng
      
      return res.status(400).json({message:"You can't send  request to Yourself"})
    }
    if(!allowedStatus.includes(status)){
      return res.status(400).json({message:"Invalid status"+status})
    }
    const existingConnectionRequest=await ConnectionRequest.findOne({
      $or:[ {fromUserId,toUserId},
        {fromUserId:toUserId,toUserId:fromUserId}]
       
    })
    if(existingConnectionRequest){
       return res.status(400).json({message:"Connection Request Already exist!!"});
    }

    const data=new ConnectionRequest({
      fromUserId,
      toUserId,
      status
    })

    await data.save()
    res.json({message:`${req.user.firstName} has ${status}  ${toUser[0].firstName}`,

      data})
   } 
   catch(err){
      res.status(400).send("Error:"+err.message);
   }
  


});


requestRouter.post("/request/review/:status/:requestId",userAuth,async(req,res)=>{//here user will acceot the request only one time and the request satatus will wee chnge in the connectionRequestSChema. 
  try{

  
    const loggedInUser=req.user;
   const {status,requestId}=req.params;
   const allowedStatus=["accepted","rejected"];
   if(!allowedStatus.includes(status)){
    return res.status(400).json({message:"Status not allowed"});
   }
    const  connectionRequest=await ConnectionRequest.findOne({
      _id:requestId,
      toUserId:loggedInUser._id,
      status:"interested"
    })

    if(!connectionRequest){
      return res.status(404).json({message:"Connection request not found"});
    }

    connectionRequest.status=status;
    const data=await connectionRequest.save();
  res.json({message:"Connection Request "+ connectionRequest.status,data})
    
  } 
  catch(err){
  res.status(400).send("Error:"+err.message);
  }

  


});




module.exports=requestRouter;
//PrCha12@//same of others