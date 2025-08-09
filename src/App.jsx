
import NavBar from "./components/NavBar"
import { createBrowserRouter,RouterProvider } from "react-router-dom";
import Body from "./components/Body";
import Login from "./components/Login";
import Profile from "./components/Profile";
import Connections from "./components/Connections";
import {Provider} from "react-redux";
import appStore from "./utils/appStore";
import Feed from "./components/Feed";
import Chat from "./components/Chat";
import Request from "./components/Request"


 const router = createBrowserRouter([

  {
    path:"/",
    element:<Body/>,
    children:[
      {
    path: "/login",
    element:<Login/>,  
  },
   {
    path: "/profile",
    element:<Profile/>,  
  },
  {
    path:"/feed",
    element:<Feed/>
  },
  {
  path:"/connections",
  element:<Connections/>
},
 {
  path:"/requests",
  element:<Request/>
},
 {
  path:"/chat/:id",
  element:<Chat/>
}

    ]
  },
  
  ]);
function App() {


  return (
    <>
 <Provider store={appStore}>{/*provide the sotre */}
   <RouterProvider router={router}/>
 </Provider>

    




    </>
  )
}

export default App