import React,{useEffect} from 'react'
import NavBar from "./NavBar"
import Footer from "./Footer";
import {Outlet,useNavigate,useLocation} from "react-router-dom";
import {BASE_URL} from "../utils/constants";
import {useDispatch,useSelector} from "react-redux"
import {addUser} from "../utils/userSlice";
import axios from "axios";


const Body = () => {
  const location=useLocation();
  const dispatch=useDispatch();
  const navigate=useNavigate();



  const userData=useSelector((store)=>store.user);
  const hideFooter=["/login","/feed","/profile","/connections","/chat"]
  const shouldHideFooter=hideFooter.includes(location.pathname);

  const fetchUser=async()=>{
    //when i a using socket  
    // if(userData)  return ;

      if (userData && userData._id) return; 
      
    try{
    
      const res=await axios.get(BASE_URL+"/profile/view",{withCredentials:true});
      console.log("Fetched user:", res.data);
      dispatch(addUser(res.data));


      //for socket.io i done this chnge it if that is not working
     // console.log("body feed");
      //return navigate("/feed");
    
    



    } 
    catch(err){
      if(err.status===401)   { return navigate("/login");}
     
      //console.error(err);
    }
    
  }


  useEffect(()=>{
    fetchUser();
  },[])
  return (
    <div>
      <NavBar/>
      <Outlet/>
      {!shouldHideFooter&&<Footer/>}
    </div>
  )
}

export default Body
