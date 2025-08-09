import React,{useEffect,useState} from 'react'
import axios from "axios";
import {BASE_URL} from "../utils/constants";
import {useDispatch,useSelector} from "react-redux";
import { Link } from 'react-router-dom';
import {addConnection} from "../utils/connectionSlice.js"





const Connections = () => {
  const dispatch=useDispatch();
  //adding user store for socket.io
  const user=useSelector(store=>store.user)
  const connections=useSelector(store=>store.connections);

  

    const getConnections=async()=>{
  
      
    // const [message,setMessage]=useState("Connections");
    
try{
    const res=await  axios.get(BASE_URL+"/user/connections",{withCredentials:true});
    console.log(res);
    // setMessage("Connections")
    dispatch(addConnection(res?.data?.message));
}
catch(err){
   // setMessage("No Conections Available")
 console.error(err);
}
}

 //using socket.io
// useEffect(()=>{
//    getConnections();
// },[])

  useEffect(() => {
    if (user?._id) getConnections();
  }, [user?._id]);


  if(!connections) return ;

if(connections.length===0) return <h1 className="text-bold text-xl text-secondary text-center my-48">No Connections  Found</h1>;

  return (
    <div className="text-center my-10">

     <h1 className="text-bold text-2xl text-secondary">Connections</h1>

     {connections.map((connection)=>{
       const  {_id,firstName,lastName,age,photoUrl,gender,about}=connection;
        return (
            <div key={_id}  className="m-4 p-4 items-center flex rounded-lg bg-base-300  w-1/2 mx-auto">
 <div ><img alt="photo" src={photoUrl}  className="w-20 h-20 rounded-full"/></div> 
                <div className="text-left mx-4 "><h2 className="font-bold text-secondary">{firstName+" "+lastName}</h2>
               <h2>{"Gender:  "+gender+" "+"Age: "+age}</h2>
               <p>{"About: "+ about}</p> 
                
                <Link to={`/chat/${connection._id}`}>
      <button className="btn btn-sm btn-outline mt-2">Chat</button>
    </Link>
               
              
           
               
            </div>
            </div>
        )
     })}
    </div>
  )
}

export default Connections;

