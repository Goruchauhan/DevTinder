// ⭐using axios to call the api by client and making http request 
//always use async and await when using axios also try and catch 
//axios autotmatically parse json to javascript object
//using fetch we need to manually parse the json 


//⭐CORS(Cross Origin Resource  Sharing)
//This error cause by browser ,becuase requesting from one origin to another localhost::3000 to localhost:4000 
//so browser will not allow to do that 
//can't handle cors error from fontend 
//can be hadnle cors problem b Backend only
//also we use cors middle ware in backend and set origin: frontend
//using credentaisl:true if sending the cookies to the server
//in the axios use 'withcredentials':true else cookies will not be sent 


// ⭐ Redux — used to manage state globally in a React app

// 🔄 With Redux, there's no need to pass props manually between components.
// Components can directly access or update global state from anywhere.

// ✅ Reducer:
// A pure function that takes the current state and an action
// and returns a new state.
// It's responsible for updating the state in response to dispatched actions.

// ✅ Store:
// The central container that holds all the Redux state.
// The store receives actions, passes them to reducers, and stores the new state.

// ✅ useDispatch:
// A React Redux hook used to dispatch actions to the store.
// This is how you tell Redux: "Hey! Something happened."

// ✅ useSelector:
// A hook used to read/select specific parts of the state from the store.
// It listens for changes and re-renders the component when that part of the state updates.


//in this we cannot go to the any route without authentication ,if tooken failed  ans user reload 
// the page then  hw will go directly to the login page 
//after the logout the redux store should be empty 
//Then removeUser is an action creator, and you must always call it before dispatching.
//shoul  be like this dispacth(removeUser()) no like this dispacth(removeUser)
//alwyas forget to write withCredentials:true

//we don't need to return anything if it is arrow function

//✅ Keep the object keys same as your schema field names to avoid bugs and confusion.

//const EditProfile = ({ user = {} }) => {
//This ensures that if user is not passed or is undefined, it will default to {}, and accessing user.firstName won't crash.

//Diffrence between Link and useNavigate
//  when we use axios to pass get methos so we will not pass an empty {} 
//  beacuse it take two argumente only in post because we are sending the data thats why it take the t hree argument 


//🔴 Do not call Hooks inside conditions or loops.
//🔴 Do not call Hooks after a conditional return statement.

//🔴 Do not call Hooks in event handlers.
//🔴 Do not call Hooks in class components.
//🔴 Do not call Hooks inside functions passed to useMemo, useReducer, or useEffect.

//in the map always use key on the parent 


// <button className="btn btn-primary mx-4" onClick={rejectRequest(_id)}>Reject</button>
//<button className="btn btn-secondary mx-4" onClick={acceptRequest(_id)}>Accept</button> couldn't write like this because it will cal immediatley 
//need to write like the below 
 //<button className="btn btn-primary mx-4" onClick={()=>rejectRequest(_id)}>Reject</button>
           // <button className="btn btn-secondary mx-4" onClick={()=>acceptRequest(_id)}>Accept</button>


//dont't use alone feed use with feed&&feed.length

//when child router or component renser parent will aso render ....
//useEffect is not asynchronous function 
//if not writing the await in the code than code is not waiting for the  response it went  to next control 


//component render first before useEffect
//When you navigate between components, the Redux store stays in memory. It is not cleared or reset.


//two ways of making signup page- one way is to make component and call signup api second is tooggling 




//message coming two times  -----when doing chat ---how u solve  it 

// in my code there is bug like chat is working properly but when i login to a user A and also login to user B than when i  click on the connection of A htan A's connection are showing and when i click on B
//  than A's connection showing but ar ediffrenetuser when login how this is happenein




//socket.io--->chenge
//chat.jsx
//body.jsx
//app.jsx
//model --create
//inside the userRouter
//sockkt.js
//added the <link > tage inside the Connections.jsx 
// in the /user/connection  I write the if upper the map function  in backend 



// Bonus Tip (💡): Do not reuse same browser for multi-login testing
//For testing multiple users, use:

//Different browsers (Chrome + Firefox)

//OR use incognito window + normal window

//OR use two separate devices

//Because sessions, cookies, and sockets may conflict.

//  useEffect(() => {
  //  if (user?._id) getConnections();
//  }, [user?._id]);  Updating useEfect with this in Connection.jsx also in feed.jsx

//i write useEffect in app.jsx so when i open the app gaian it remove all the things 