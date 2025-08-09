import {useState,useEffect} from 'react';
import axios from "axios"
import {useDispatch,useSelector} from "react-redux";
import {addUser} from "../utils/userSlice";
import {useNavigate} from "react-router-dom";
import {BASE_URL} from "../utils/constants";
import { removeFeed } from '../utils/feedSlice';
import { removeConnection } from '../utils/connectionSlice';
import { removeUser } from '../utils/userSlice';
const Login=()=>{
   const user=useSelector(store=>store.user)



    const [firstName,setFirstName]=useState("");
      const [lastName,setLastName]=useState("");
      const [age,setAge]=useState(0);
      const[gender,setGender]=useState("")
      const [emailId,setEmailId]=useState("");
    const[password,setPassword]=useState("");
    const [isLoginForm,setIsLoginForm]=useState(true);
    const [error,setError]=useState(""); 
    const navigate=useNavigate();
     const dispatch=useDispatch();
     
    const  handleLogin=async()=>{ 
        setError("");
      try {const res=await axios.post(BASE_URL+"/login",{emailId,password},
      {withCredentials:true}
    );
    
      dispatch(addUser(res.data));
      
    
      return navigate("/feed");
     
   }
        catch(err){

         setError("Error: "+err?.response?.data)
         
        } 
    }

    const handleSignUp=async()=>{
      try{
        setError("");
       const res= await axios.post(BASE_URL+"/signup",{firstName,lastName,emailId,password,age,gender},{withCredentials:true})
       setIsLoginForm(true);
       setEmailId("");
       setPassword("");
       navigate("/login");
      }
      catch(err){ 
        setError("Error: "+err?.response?.data)

      }

    }


    useEffect(() => {
      if(user?._id) {
  dispatch(removeUser());
  dispatch(removeConnection());
  dispatch(removeFeed());
      }
}, []);

   
 return (
   
    <>
    <div className="flex justify-center my-10 font-mono" >
   <div className="card card-border bg-base-300 w-96">
  <div className="card-body">
    <h2 className="card-title justify-center">{isLoginForm===true?"Login":"SignUp"}</h2>

  {!isLoginForm  &&<>


  <fieldset className="fieldset">
  <legend className="margin-bottom: calc(0.25rem /* 4px */ * -1)
    display: flex
    align-items: center
    justify-content: space-between
    gap: calc(0.25rem /* 4px */ * 2)
    padding-block: calc(0.25rem /* 4px */ * 2)
    color: var(--color-base-content)
    font-weight: 600;">
    First Name</legend>
  <input type="text"   value={firstName} className="input"  onChange={(e)=>setFirstName(e.target.value)}/>
 
</fieldset>
 <fieldset className="fieldset">
  <legend className="margin-bottom: calc(0.25rem /* 4px */ * -1)
    display: flex
    align-items: center
    justify-content: space-between
    gap: calc(0.25rem /* 4px */ * 2)
    padding-block: calc(0.25rem /* 4px */ * 2)
    color: var(--color-base-content)
    font-weight: 600;">
    Last Name</legend>
  <input type="text"   value={lastName} className="input"  onChange={(e)=>setLastName(e.target.value)}/>
 
</fieldset>

  <fieldset className="fieldset">
  <legend className="margin-bottom: calc(0.25rem /* 4px */ * -1)
    display: flex
    align-items: center
    justify-content: space-between
    gap: calc(0.25rem /* 4px */ * 2)
    padding-block: calc(0.25rem /* 4px */ * 2)
    color: var(--color-base-content)
    font-weight: 600;">
    Age</legend>
  <input type="text"   value={age} className="input"  onChange={(e)=>setAge(e.target.value)}/>
 
</fieldset>
<fieldset className="fieldset my-2">
  <legend className="margin-bottom: calc(0.25rem /* 4px */ * -1)
    display: flex
    align-items: center
    justify-content: space-between
    gap: calc(0.25rem /* 4px */ * 2)
    padding-block: calc(0.25rem /* 4px */ * 2)
    color: var(--color-base-content)
    font-weight: 600;">
    Gender</legend>

    <div className="flex">
      Male<input type="radio" name="gender" value="male" className="radio radio-primary mr-5" onChange={(e)=>setGender(e.target.value)} defaultChecked />
   
   Female <input type="radio" name="gender" value="female" className="radio radio-primary mr-5" onChange={(e)=>setGender(e.target.value)} defaultChecked />
   Other    <input type="radio" name="gender" value="other" className="radio radio-primary  mr-5" onChange={(e)=>setGender(e.target.value)} defaultChecked />
  </div>
</fieldset>
</>}

    <fieldset className="fieldset">
  <legend className="margin-bottom: calc(0.25rem /* 4px */ * -1)
    display: flex
    align-items: center
    justify-content: space-between
    gap: calc(0.25rem /* 4px */ * 2)
    padding-block: calc(0.25rem /* 4px */ * 2)
    color: var(--color-base-content)
    font-weight: 600;">
    Email ID</legend>
  <input type="text"   value={emailId} className="input" placeholder="example@gmail.com"  onChange={(e)=>setEmailId(e.target.value)}/>
 
</fieldset>

 

   <fieldset className="fieldset  ">
  <legend className="
    margin-bottom: calc(0.25rem /* 4px */ * -1);
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: calc(0.25rem /* 4px */ * 2);
    padding-block: calc(0.25rem /* 4px */ * 2);
    color: var(--color-base-content);
    font-weight: 600;">
    Password</legend>
  <input type="password" value={password} className="input"   onChange={(e)=>setPassword(e.target.value)}
   />
    
 

</fieldset>  

 
     <p className="text-red-500">{error}</p>
   
    <div className=" display: flex flex-wrap:wrap align-items: flex-start gap: calc(0.25rem /* 4px */ * 2) justify-center py-2">
     
      <button className="btn btn-primary" onClick={()=>(isLoginForm===true?handleLogin():handleSignUp())}>{isLoginForm?"Login":"Sign Up"}</button>

   
      
    </div>
        <p onClick={()=>setIsLoginForm(prev=> !prev)} className="text-center font-bold cursor-pointer">{isLoginForm? "New User ? Signup here":"Existing User ? Log In here"}</p>
  </div>
</div>
</div>
       
    </>
 )
}
export default Login