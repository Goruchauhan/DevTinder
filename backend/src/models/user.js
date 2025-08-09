const mongoose=require("mongoose");
const validator=require("validator");
const jwt=require("jsonwebtoken")
const bcrypt=require("bcrypt");
const userSchema=new mongoose.Schema({//creating schema
    firstName:{
        type:String,
        required:true,
        minLength:4,
        maxLength:50

    },
    lastName:{
        type:String,
        
    }
    ,
    emailId:{
        type:String,
        required:true,
        lowercase:true,
        unique:true,
        trim:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("invalid Email address"+value)
            }
        }
    },
    password:{
        type:String,
        required:true,
        validate(value){
            if(!validator.isStrongPassword(value)){
                throw new Error("Password is not strong "+ value)
            }
        }
    }
    ,age:{
        type:Number,
        min:18,//means age should at least 18 to signim to tinder
        validate(value){
            if(!Number.isInteger(value)){
                throw new Error("Age should be integer and at least 18")
            }
        }
        
    },
    gender:{
        type:String,
        validate(value){//custom validator function.Here we can use enum also 
            if(!["male","female","other"].includes(value)){
                throw new Error ("Gender data is not valid"+value);
            }
        }
    },
    photoUrl:{
        type:String,
         default:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRm-TruksPXPI5imDL_kfzEfFiAZwg5AzHtWg&s",
        validate(value){
         if(!validator.isURL(value)){
           throw new Error("Invalid phto URL")
         }
        },
       

    },
    about:{
        type:String,
        default:"This is default about of the user"
    },
    skills:{
        type:[String,],//it is ans array of string

    }},
    {     
        timestamps:true
    }

);

userSchema.methods.getJWT=async function(){
    const user=this;
    const token=await jwt.sign({_id:user._id},"Goruhan123",{expiresIn:'7d'}
    

)
return token;}

userSchema.methods.validatePassword=async function(passwordInputByUser){
    const user=this;
    const passwordHash=user.password;
    const isPassowrdValid=await bcrypt.compare(passwordInputByUser,passwordHash);
    return isPassowrdValid;
}


const userModel=mongoose.model("User",userSchema);
module.exports=userModel;























