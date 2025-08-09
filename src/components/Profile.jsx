import React from 'react'
import EditProfile  from "./EditProfile";
import {useSelector} from "react-redux";



const Profile = () => {
  const user=useSelector(store=>store.user)
  return (
    <div className="flex justify-center">
      <h1><EditProfile user={user}/></h1>
      
    </div>
  )
}

export default Profile
