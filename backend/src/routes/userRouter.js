const express=require("express");
const userRouter=express.Router();
const {userAuth}=require("../middleware/auth")
const {ConnectionRequest}=require("../models/connectionRequest")
const USER_SAFE_DATA="firstName lastName age gender skills photoUrl about"
const User=require("../models/user");

//get all the pending request for theloggedIn  user
userRouter.get("/user/request/recieved",userAuth,async(req,res)=>{
    try{
           const loggedInUser=req.user;
    const connectionRequest=await ConnectionRequest.find({
        toUserId:loggedInUser._id,
        status:"interested"
    }).populate("fromUserId",USER_SAFE_DATA)
      

      

    if(!connectionRequest){
        res.status(404).json({message:"No request has came"})
    }

    res.json({message:"Data has been fecthed",data:connectionRequest})
    }
    catch(err){
        res.status(400).send("error:"+err.message)
    }
  
})

//get all the connections
userRouter.get("/user/connections",userAuth,async(req,res)=>{
  try{
     const loggedInUser=req.user;
     const connectionRequest=await ConnectionRequest.find({
        $or:[
            {fromUserId:loggedInUser._id,status:"accepted"},
            {status:"accepted",toUserId:loggedInUser._id}
        ]
     }).populate("fromUserId",USER_SAFE_DATA)
     .populate("toUserId",USER_SAFE_DATA)

      if(!connectionRequest|| connectionRequest.length === 0){
        return res.status(404).json({message:"no connection has found"})
     }


     const data=connectionRequest.map(row=>{
        if(row.fromUserId._id.toString()===loggedInUser._id.toString()){
            return row.toUserId;
        }
        return row.fromUserId;
        
      })
      //i move this to upper  fro socket .io remove if chat is not working 
    //  if(!connectionRequest){
    //     return res.send(404).json({message:"no connection has found"})
    //  }

     res.json({message:data})
  } 
  catch(err){
    res.send("Error:"+err.message);
  } 
})


//get the feed:user can see the profile of other which are not
//  connections of him also it can;t see his profile ,
// also the people which he ignored or they ignored 


userRouter.get("/feed",userAuth,async(req,res)=>{
//   const page=parseInt(req.query.page)||1;

//  let limit=parseInt(req.query.limit)||1;
//   limit=limit>5?5:limit;
   //const skip=(page-1)*limit;
    try{
        const loggedInUser=req.user;
        const connectionRequest= await ConnectionRequest.find({
    $or:[
       {fromUserId:loggedInUser._id},
       {toUserId:loggedInUser._id}
    ]
  
   
}).select("fromUserId toUserId")


 const hideUsersFromFeed=new Set();
 connectionRequest.forEach((req)=>{
    hideUsersFromFeed.add(req.fromUserId.toString())
    hideUsersFromFeed.add(req.toUserId.toString())

 })




const users=await User.find({
  $and:[
     { _id:{$nin: Array.from(hideUsersFromFeed)}},
      {_id:{$ne:loggedInUser._id}}

    ]
   
        
   
}).select(USER_SAFE_DATA)
//  .skip(skip)
//     .limit(limit)
  res.json({users})
 
    }
    catch(err){
        res.send("Error"+err.message)
    }

})

// userRouter.get("/feed",userAuth,async(req,res)=>{
//  const page=parseInt(req.query.page)||1;

//   let limit=parseInt(req.query.limit)||1;
//   limit=limit>5?5:limit;
//   const skip=(page-1)*limit;
//     try{
//         const loggedInUser=req.user;
//         const connectionRequest= await ConnectionRequest.find({
//     $or:[
//        {fromUserId:loggedInUser._id},
//        {toUserId:loggedInUser._id}
//     ]
  
   
// }).select("fromUserId toUserId")


//  const hideUsersFromFeed=new Set();
//  connectionRequest.forEach((req)=>{
//     hideUsersFromFeed.add(req.fromUserId.toString())
//     hideUsersFromFeed.add(req.toUserId.toString())

//  })




// const users=await User.find({
//   $and:[
//      { _id:{$nin: Array.from(hideUsersFromFeed)}},
//       {_id:{$ne:loggedInUser._id}}

//     ]
   
        
   
// }).select(USER_SAFE_DATA)
//    .skip(skip)
//    .limit(limit)
//   res.json({users})
 
//     }
//     catch(err){
//         res.send("Error"+err.message)
//     }

// })



// using code of socket.io
userRouter.get("/user/:id", userAuth, async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select(USER_SAFE_DATA);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});






module.exports=userRouter;
