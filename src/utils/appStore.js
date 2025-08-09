import {configureStore} from "@reduxjs/toolkit";//createStore
import UserReducer from "./userSlice";
import feedReducer from "./feedSlice";
import connectionReducer from "./connectionSlice.js";
import requestReducer from "./requestSlice";
const appStore=configureStore({
   reducer:{

    user:UserReducer,
    feed:feedReducer,
    connections:connectionReducer,
    requests:requestReducer,
   },
})

export default appStore;