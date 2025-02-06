import { IconButton, InputAdornment } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Box, Button, TextField, Typography } from '@mui/material'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { GithubAuthProvider , signInWithPopup } from "firebase/auth";
import React, { useState } from 'react'

const LoginPage = () => {
    const[loginEmail ,SetLoginEMail]=useState("");
    const[loginPass ,SetLoginPass]=useState("");
    const [showPassword, setShowPassword] = useState(false);
    const auth = getAuth();
    const handleTogglePassword = () => {
      setShowPassword((prev) => !prev);
    };
const provider = new GithubAuthProvider();
    const loginCheckwithAnthoroption = () =>{
      signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a GitHub Access Token. You can use it to access the GitHub API.
        const credential = GithubAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
    
        // The signed-in user info.
        const user = result.user;
        // IdP data available using getAdditionalUserInfo(result)
        // ...
      }).catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GithubAuthProvider.credentialFromError(error);
        // ...
      });
    }
    const LoginCheck=(e)=>{
        e.preventDefault();
        console.log("hello")
const auth = getAuth();
const provider = new GithubAuthProvider();
const loginCheckwithAnthoroption = () =>{
  signInWithPopup(auth, provider)
  .then((result) => {
    // This gives you a GitHub Access Token. You can use it to access the GitHub API.
    const credential = GithubAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;

    // The signed-in user info.
    const user = result.user;
    // IdP data available using getAdditionalUserInfo(result)
    // ...
  }).catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.customData.email;
    // The AuthCredential type that was used.
    const credential = GithubAuthProvider.credentialFromError(error);
    // ...
  });
}
signInWithEmailAndPassword(auth, loginEmail, loginPass)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    console.log("loginpage" ,user)
  })
  .catch((error) => {
    const errorCode = error.code;
    console.log("loginerror" ,error)
    const errorMessage = error.message;
  });
  console.log("object")
    }
  return (
    <div>
        <form onSubmit={LoginCheck}>
        <Box
    sx={{
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      width: 400,
      bgcolor: "background.paper",
      boxShadow: 24,
      p: 4,
      borderRadius: 3,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    }}
  >
    

    <Typography variant="h5" fontWeight="bold" gutterBottom>
      Log In
    </Typography>
    <TextField fullWidth type='email' label="Email" value={loginEmail} variant="outlined" sx={{ mb: 2 }} onChange={(e)=> SetLoginEMail(e.target.value) }/>
    <TextField
     fullWidth
      label="Password"
       type="password" value={loginPass} variant="outlined" 
       sx={{ mb: 3 }} onChange={(e)=>SetLoginPass(e.target.value)}
       InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton onClick={handleTogglePassword} edge="end">
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        ),
      }}
       />
    <Box display="flex" justifyContent="center" gap={2}>

      <Button variant="contained" type='submit' color="primary" >
        Login
      </Button>
      <Button variant="contained" type="button"  color="primary" onClick={loginCheckwithAnthoroption} >
        Github
      </Button>
    </Box>
  </Box>
        </form>
  </div>
  )
}

export default LoginPage