import React,{useEffect,useState} from 'react'
import {useDispatch,useSelector} from "react-redux";
import {BASE_URL} from "../utils/constants";
import {addRequests,removeRequests} from "../utils/requestSlice";
import axios from "axios"

const Request = () => {


   const dispatch=useDispatch();
   const  request=useSelector(store=> store.requests);
    
 



  const rejectRequest=async(id)=>{
 
     try{
 const res=await axios.post(BASE_URL+"/request/review/rejected/"+id,{},{withCredentials:true});
    console.log(res);
    dispatch(removeRequests(id));
     }
     catch(err){
       console.log
     }
   



    

  }
  const acceptRequest=async(id)=>{
 
    try{    const res=await axios.post(BASE_URL+"/request/review/accepted/"+id,{},{withCredentials:true});
    console.log(res);
     dispatch(removeRequests(id))
  }
    catch(err){}
  }

    const getRequest=async()=>{
      
         
        try{
           const res=await axios.get(BASE_URL+"/user/request/recieved",{withCredentials:true})
          console.log(res?.data?.data);
          dispatch(addRequests(res?.data?.data));
          }
        
        catch(err){
           console.error(err);   
        }   
       

    }

    useEffect(()=>{getRequest()},[]);


  if(!request) return ;

if(request.length===0) return <h1 className="text-bold text-xl text-secondary text-center my-48">No Connections Request Found</h1>;

  return (
    <div className="text-center my-10">

     <h1 className="text-bold text-2xl text-secondary">Requests</h1>


     {request.map((request)=>{

       const  id=request._id;
      // console.log(id);
       const {_id,firstName,lastName,age,gender,about,photoUrl}=request.fromUserId
        return (
            <div key={_id} className="m-4 p-4  flex rounded-lg bg-base-300  w-2/3 mx-auto">
 <div ><img alt="photo" src={photoUrl}  className="w-20 h-20 rounded-full"/></div> 
                <div className="text-left mx-4 "><h2 className="font-bold text-secondary">{firstName+" "+lastName}</h2>
               <h2>{"Gender:  "+gender+" "+"Age: "+age}</h2>
               <p>{"About: "+ about}</p> 
                

               
              
           
               
            </div>
            
           <div>
            <button className="btn btn-primary mx-4" onClick={()=>rejectRequest(id)}>Reject</button>
            <button className="btn btn-secondary mx-4" onClick={()=>acceptRequest(id)}>Accept</button>
            </div>
            </div>
        )
     })}
    </div>
  )
}

export default Request
