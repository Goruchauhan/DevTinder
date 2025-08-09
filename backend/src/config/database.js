
const mongoose=require("mongoose")
const connectDB=async()=>{
   await mongoose.connect("mongodb+srv://Goru:CpNY1Zx6chuJQSkM@gorucluster.waewxza.mongodb.net/DevTinder")

}//it send promise that database is connect or not 
module.exports=connectDB




