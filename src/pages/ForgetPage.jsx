import { Box, Button, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'

const ForgetPage = () => {
    const[ForgetEMail ,SetForgetEmail]=useState("");
        const[ForgetPass ,SetForgetPass]=useState("");
        const ForgetCheck=(e)=>{
            e.preventDefault();
        }
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
            Forget password
          </Typography>
          <TextField fullWidth label="Email" value={ForgetEMail} variant="outlined" sx={{ mb: 2 }} onChange={(e)=> SetForgetEmail(e.target.value) }/>
          {/* <TextField fullWidth label="Password" type="password" value={ForgetPass} variant="outlined" sx={{ mb: 3 }} onChange={(e)=>SetForgetPass(e.target.value)} /> */}
          <Box display="flex" justifyContent="center" gap={2}>

            <Button variant="contained" color="primary" >
              Forget
            </Button>
          </Box>
        </Box>
        </form>
    </div>
  )
}

export default ForgetPage