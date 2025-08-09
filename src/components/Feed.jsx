import React,{useState,useEffect} from 'react'
import axios from "axios";
import {BASE_URL} from "../utils/constants"
import UserCard from "./UserCard";
import {useSelector,useDispatch} from "react-redux"
import {addFeed} from "../utils/feedSlice";


const Feed = () => {
 
   const [notFound,setNotFound]=useState("Does not have any feed  Data")
   const  feed=useSelector((store)=>store.feed)
   //this user uses in the use Effect for socket.io
   const user=useSelector(store=>store.user);
    console.log("Feed",feed);
  
 
    const dispatch=useDispatch();
   

  const getFeed=async()=>{
    // if(feed) return ;
    try{
      console.log("hiiiii")
        const res=await axios.get(BASE_URL+"/feed",{withCredentials:true});
   
        dispatch(addFeed(res?.data?.users));
    }
    catch(err){
      //handle the error by making the component
      setNotFound("Does not have any feed Data")
      console.error(err);
    }
    
  }


  useEffect(()=>{
  if(user._id)
getFeed();
  },user._id)

 console.log("hi goru");

return (
    
  <>
     
    {feed && feed.length > 0 ? (
      <div className="flex justify-center my-10">
       
          <UserCard  user={feed[0]} />
       
      </div>
    ) : feed && feed.length===0? (
      <p className="text-2xl  text-secondary text-center my-48">{notFound}</p>
    ) : (
      <p className="text-center mt-10">Loading feed...</p>
    )}
  </>
);



}
export default Feed
