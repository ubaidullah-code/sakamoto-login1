import { Box, Button, TextField, Typography } from "@mui/material";
import { IconButton, InputAdornment } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { createUserWithEmailAndPassword, getAuth, sendEmailVerification, updateProfile } from "firebase/auth";
import React, { useState } from "react";

const ForgetPage = () => {
  const [signEmail, SetSignEmail] = useState("");
  const [userName, SetUserName] = useState("");
  const [signPass, SetSignPass] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  const ForgetCheck = (e) => {
    e.preventDefault();
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, signEmail, signPass)
      .then((userCredential) => {
        const user = auth.currentUser;
        
        console.log("signpage user" ,user)
       updateProfile(auth.currentUser, {
  displayName: userName, photoURL: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
        }).then(() => {
          // return auth.currentUser.reload();
          // Profile updated!
          
          console.log('Profile updated!')
        

       
        }).catch((error) => {
         console.log('profile error' ,error)
          // ...
        });
      })
      .catch((error) => {
        console.log("SignPage error", error);
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  };

  return (
    <div>
      <form onSubmit={ForgetCheck}>
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
            Sign In
          </Typography>

          <TextField
            fullWidth
            label="User Name"
            variant="outlined"
            sx={{ mb: 2 }}
            onChange={(e) => SetUserName(e.target.value)}
          />

          <TextField
            type="email"
            fullWidth
            label="Email"
            variant="outlined"
            sx={{ mb: 2 }}
            onChange={(e) => SetSignEmail(e.target.value)}
          />

          {/* Password Field with Show/Hide Button */}
          <TextField
            fullWidth
            label="Password"
            type={showPassword ? "text" : "password"}
            value={signPass}
            variant="outlined"
            sx={{ mb: 3 }}
            onChange={(e) => SetSignPass(e.target.value)}
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
            <Button variant="contained" type="submit" color="primary">
              Sign In
            </Button>
          </Box>
        </Box>
      </form>
    </div>
  );
};

export default ForgetPage;
