const express=require("express")
const connectDB=require("./config/database");
const cors=require("cors");
const cookiesParser=require("cookie-parser");
const authRouter=require("./routes/authRouter"); 
const profileRouter=require("./routes/profileRouter");
const requestRouter=require("./routes/requestRouter");
const userRouter=require("./routes/userRouter");





 const app=express();

  app.use(cors({origin:"http://localhost:5173", credentials:true}));
 app.use(express.json())
 app.use(cookiesParser());


 app.use("/",authRouter);
 app.use("/",profileRouter);
 app.use("/",requestRouter);
 app.use("/",userRouter);
 










 module.exports=app;


// connectDB().then(()=>{
//     console.log("connected to database")
//      app.listen(3000,()=>console.log("server is listeneing to the port"))
   
// }).catch(err=>{
//     console.log("can't connect to database")
// })







