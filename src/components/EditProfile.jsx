import React,{useState,useEffect} from 'react'
import { BASE_URL } from '../utils/constants'
import UserCard from "./UserCard";
import {useDispatch} from "react-redux";
import axios  from "axios";
import { addUser } from '../utils/userSlice';

// const EditProfile = ({user={}}) => {
//     const [firstName,setFirstName]=useState(user?.firstName);
//     const [lastName,setLastName]=useState(user?.lastName);
//     const [about,setAbout]=useState(user?.about);
//     const [gender,setGender]=useState(user?.gender);
//     const [age,setAge]=useState(user?.age);
//     const [photoUrl,setPhoto]=useState(user?.photoUrl);
//     const [error,setError]=useState("");
//     const dispatch=useDispatch();

const EditProfile = ({ user = {} }) => {
  const [firstName, setFirstName] = useState("");
  const [message,setMessage]=useState(false);
  const [lastName, setLastName] = useState("");
  const [about, setAbout] = useState("");
  const [gender, setGender] = useState("");
  const [age, setAge] = useState("");
  const [photoUrl, setPhoto] = useState("");
  const [error, setError] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    setFirstName(user?.firstName || "");
    setLastName(user?.lastName || "");
    setAbout(user?.about || "");
    setGender(user?.gender || "");
    setAge(user?.age || "");
    setPhoto(user?.photoUrl || "");
  }, [user]);

    const saveProfile=async()=>{
        try{
          const res= await axios.patch(BASE_URL+"/profile/edit",{firstName,lastName,about,gender,age,photoUrl},{withCredentials:true})
          console.log(res?.data?.data);
          dispatch(addUser(res?.data?.data))
            setMessage(true);
          setTimeout(()=>{
            setMessage(false);
          },3000)
        
          
      }
        catch(err){
            setError(err?.response?.data)
            setTimeout(()=>{
              setError("");
            },3000)
        }
       

    }


  return (
    <div className=" flex  justify-center my-10 font-mono ">
 {message && (
  <div className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-pink-300 text-blue-900 px-6 py-3 rounded shadow-lg z-50">
    Profile updated successfully!
  </div>
)}


<div className="flex justify-center  mx-10">
  <div className="card card-border bg-base-300 w-96">
    <div className="card-body">
      <h2 className="card-title justify-center">Edit Profile</h2>

      <fieldset className="fieldset">
        <legend className="font-semibold">FirstName</legend>
        <input type="text" value={firstName} className="input w-full" onChange={(e)=>{ if (e.target.value.length<=15)setFirstName(e.target.value)}} />
      </fieldset>

      <fieldset className="fieldset">
        <legend className="font-semibold">LastName</legend>
        <input type="text" value={lastName} className="input w-full" onChange={(e)=>{ if (e.target.value.length<=15)setLastName(e.target.value)} }/>
      </fieldset>

      <fieldset className="fieldset">
        <legend className="font-semibold">Age</legend>
        <input type="text" value={age} className="input w-full" onChange={(e)=>{ if(e.target.value.length<=3)setAge(e.target.value)}} />
      </fieldset>

      <fieldset className="fieldset">
         <legend className="font-semibold my-2">Gender</legend>
    <label>
      Male<input type="radio" name="gender" value="male" className="radio radio-primary mr-5" onChange={(e)=>setGender(e.target.value)} defaultChecked />
   
   Female <input type="radio" name="gender" value="female" className="radio radio-primary mr-5" onChange={(e)=>setGender(e.target.value)} defaultChecked />
   Other    <input type="radio" name="gender" value="other" className="radio radio-primary  mr-5" onChange={(e)=>setGender(e.target.value)} defaultChecked />
  </label>
  </fieldset>

      <fieldset className="fieldset">
        <legend className="font-semibold">About</legend>
        <textarea type="text" value={about} className="input w-full" onChange={(e)=>{ if(e.target.value.length<=40)setAbout(e.target.value)}} />
      </fieldset>

        
      <fieldset className="fieldset">
        <legend className="font-semibold">PhotoURL</legend>
        <input type="text" value={photoUrl} className="input w-full" onChange={(e)=>setPhoto(e.target.value)} />
      </fieldset>
      <p className="text-red-500">{error}</p>
      <div className="flex flex-wrap items-start gap-2 justify-center py-2">
        <button className="btn btn-primary" onClick={saveProfile}>Save Profile</button>
      </div>
    </div>
      
  </div>
  

</div>{user&&<UserCard  className="w-96 card card-border h-auto " user={{firstName,lastName,photoUrl,age,gender,about}}/>}

</div>


    
  )
}

export default EditProfile
