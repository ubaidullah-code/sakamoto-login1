
import './App.css';
import Header from './components/HeaderPage';
import { Route, Routes } from 'react-router';

import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useContext, useEffect } from 'react';
import { GlobalContext } from './Context/Context';
import CustomRoutes from './components/CustomRoutes';
// import header form ''
//firebase login
//firebase init
function App() {
  const{state, dispatch}=useContext(GlobalContext)
  console.log(state)
  const firebaseConfig = {
    apiKey: "AIzaSyCMXk4MM0597c-b_N72krcFeNnAqaB5ODY",
    authDomain: "sakamoto-login1.firebaseapp.com",
    projectId: "sakamoto-login1",
    storageBucket: "sakamoto-login1.firebasestorage.app",
    messagingSenderId: "355405512899",
    appId: "1:355405512899:web:e4042f46f8e3ff5b15e276"
  };
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
 useEffect(()=>{
  onAuthStateChanged(auth, (user) => {
    if (user) {
      dispatch({type: "USER_LOGIN" ,payload : user})
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/auth.user
      const uid = user.uid;
      // ...
    } else {
      dispatch({type: "USER_LOGOUT"})
      // User is signed out
      // ...
    }
  })
 },[])

  return (
    <div className="App">
      <Header/>
      <CustomRoutes/>
 
    </div>
  );
}

export default App;
