const mongoose=require("mongoose")

const  connectionSchema=new mongoose.Schema({
    fromUserId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"User"
    },
    toUserId:{
        type:mongoose.Schema.Types.ObjectId,

          ref:"User",
        required:true,

    },
    status:{
        type:String,
        enum:{
            values:["accepted","rejected","ignored","interested"],
            message:" {VALUE}  is not valid  value to  connect from one user to another"
        },
        required:true
        
    }
},{timestamps:true});

const ConnectionRequest=mongoose.model("ConnectionRequest",connectionSchema);
module.exports={ConnectionRequest}

