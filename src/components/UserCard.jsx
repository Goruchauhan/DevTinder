import React from 'react'
import {BASE_URL} from "../utils/constants"
import axios from "axios";
import {useDispatch,useSelector} from "react-redux";
import {removeFeed} from "../utils/feedSlice"

const UserCard = ({user}) => {
   
    const dispacth=useDispatch();
   
    const _id=user._id;
    const requestSent=async(_id,status)=>{
       try{
        const res=await axios.post(BASE_URL+"/request/send/"+status+"/"+_id,{},{withCredentials:true})
        dispacth(removeFeed(_id));
         
         console.log(res);

       }
       catch(err){
           console.error(err);
       }
    }
  return (
    <div  className="font-medium">
      <div className="card bg-base-300 w-96  ">
  <figure>
    <img
      src={user.photoUrl}
      alt="Shoes" />
  </figure>
  <div className="card-body">
    <h2 className="card-title">{user.firstName+" "+user.lastName}</h2>
    <p>{user.about}</p>
    <p>{user.age}</p>
    <p>{user.gender}</p>
    <div className="card-actions justify-end">
      <button className="btn btn-primary"  onClick={()=>requestSent(_id,"ignored")}>Ignore</button>
            <button className="btn btn-secondary"  onClick={()=>requestSent(_id,"interested")}>Interested</button>
    </div>
  </div>
</div>
    </div>
  )
}

export default UserCard;
