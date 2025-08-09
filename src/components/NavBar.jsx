import React from 'react';
import {useSelector,useDispatch} from "react-redux";
import {Link,useNavigate} from "react-router-dom";
import {BASE_URL} from "../utils/constants";
import axios from "axios";
import {removeUser} from "../utils/userSlice";
import {removeFeed} from "../utils/feedSlice";
import {removeConnection} from "../utils/connectionSlice";


const NavBar = () => {
  const dispatch=useDispatch();
  const navigate=useNavigate();
  //const user=useSelector();
  const handleClick=async()=>{
  
    try{
        
       await axios.post(BASE_URL+"/logout",{},{withCredentials:true})
       dispatch(removeUser());
          dispatch(removeFeed());
          dispatch(removeConnection());
       return navigate("/login");
    }

   
    catch(err){
        console.error(err);
    }
  }

  const user=useSelector((store)=>store.user)
   
  return (
    <div className="navbar bg-base-200 shadow-sm px-4">
      <div className="flex-1">
        <Link to="/" className="btn btn-ghost text-xl text-secondary">devTinder</Link>
      </div>

   {user&& <div className="dropdown dropdown-end flex justify-center">
               <p  className="text-xl bt btn-ghost px-2 text-secondary"> Hi,{user.firstName}</p>
        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
    
          <div className="w-10 rounded-full">
            
            <img
              alt="User avatar"
              src={user.photoUrl}
            />
          </div>
        </div>

        <ul
               tabIndex={0}
          className="menu menu-sm dropdown-content mt-3 z-10 w-48 rounded-box bg-base-100 p-2 shadow-md"
        >

          <li>
            <Link to="/profile" className="justify-between">
              Profile
             
            </Link>
          </li> <li>
            <Link to="/connections" className="justify-between">
              Connections
             
            </Link>
          </li>

          <li>
            <Link to="/requests" className="justify-between">
              Request
             
            </Link>
          </li>
          

        
        <li> <Link  onClick={handleClick} >Logout</Link></li> 
        </ul>
      </div>}
    </div>
  );
};

export default NavBar;
