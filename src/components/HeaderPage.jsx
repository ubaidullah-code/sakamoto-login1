import { useContext, useEffect, useState } from "react";
import { AppBar, Toolbar, Typography, Button, IconButton, Drawer, List, ListItem, ListItemText } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Link } from "react-router";
import { getAuth, sendEmailVerification, signOut } from "firebase/auth";
import { GlobalContext } from "../Context/Context";


const Header = () => {
  const [isSignInOpen, setIsSignInOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isRightOpen, setIsRightOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [openPath, setOpenPath] = useState(false);

  const { state } = useContext(GlobalContext)
  console.log('state' ,state)
  const userCheck = localStorage.setItem('user', Boolean(state.isLogin))
  console.log('usercheck', userCheck)
  useEffect(() => {
    if (userCheck == true) {
      setOpenPath(false);
    } else if (state.isLogin == false) {
      setOpenPath(false);
    }
    else {
      setOpenPath(true);
    }
  }, [state.isLogin])
  console.log('state header', state.isLogin)
  const LogoutCheck = () => {
    const auth = getAuth();
    signOut(auth).then(() => {
      //
      console.log('Sign-out successful')
    }).catch((error) => {
      // An error happened.
    });
  }
  const auth = getAuth();
  const verificationCheck = () => {
    sendEmailVerification(auth.currentUser)
      .then(() => {
        // 
        console.log('Email verification sent!')
        // ...
      }).catch((error)=>{
        console.log('error of verification', error)
      })
  }

  // const handleSubmit = (modalType) => {
  //   console.log(`Submitted Value for ${modalType}:`, inputValue);
  //   modalType === "Sign In" ? setIsSignInOpen(false) : setIsLoginOpen(false);
  // };

  return (
    <div>
      <AppBar position="static" sx={{ backgroundColor: "#1e1e1e", padding: "10px 15px" }}>
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }} onClick={() => setIsDrawerOpen(true)}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" sx={{ flexGrow: 1,display: "flex", justifyContent: "center", fontWeight: "bold" }}>
            <Link style={{textDecoration: "none", color: "white"}} to={'./profile'}><p>{state.user.displayName}</p></Link>
          </Typography>
          {(state.isLogin == false) ?
            <>
              <Link to={"/sign"}><Button variant="outlined" color="inherit" onClick={() => setIsSignInOpen(true)} sx={{ borderColor: "#fff", color: "#fff", mr: 2 }}>
                Sign In
              </Button></Link>
              <Link to={"/login"}><Button variant="contained" color="primary" >
                Login
              </Button></Link>
            </>
            :
            <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }} onClick={() => setIsRightOpen(true)}>
              <img style={{ width: "45px", borderRadius: "50%" }} src={state.user.photoURL} />
            </IconButton>

          }

        </Toolbar>
      </AppBar>

      <Drawer anchor="left"  open={isDrawerOpen} onClose={() => setIsDrawerOpen(false)}>

        <div style={{ display: "flex", justifyContent: "space-between", flexDirection: "column", alignItems: "center", height: "95vh", pointerEvents: openPath ? "auto" : "none", opacity: openPath ? 1 : 0.5 }}>


          <List sx={{ width: 250 }}>
            <Link to={'/'} style={{ textDecoration: "none", color: "black" }}>
              <ListItem button onClick={(e) => !openPath && e.preventDefault()}>
                <ListItemText primary="Home" />
              </ListItem></Link>
            <ListItem button onClick={(e) => !openPath && e.preventDefault()}>
              <ListItemText primary="About" />
            </ListItem>
            <ListItem button onClick={(e) => !openPath && e.preventDefault()}>
              <ListItemText primary="Contact" />
            </ListItem>
          </List>
        </div>
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", pointerEvents: openPath == false ? "auto" : "none", opacity: openPath == false ? 1 : 0.5 }}>
          <List >
            <ListItem button >
              <Link to={"/forget"}><ListItemText primary="Forget password" /></Link>
            </ListItem>
          </List>
        </div>
      </Drawer>
    
      <Drawer anchor="right" open={isRightOpen} onClose={() => setIsRightOpen(false)}>

        <div style={{ overflow: "hidden", display: "flex", justifyContent: "space-between", flexDirection: "column", alignItems: "center", height: "95vh", pointerEvents: openPath ? "auto" : "none", opacity: openPath ? 1 : 0.5 }}>
          <List sx={{ width: 250 }}>
            <ListItem style={{display: "flex", gap: "11px"}}>
            <Link to={'./profile'}><img src={state?.user.photoURL} style={{width: "50px", borderRadius: "50%"}} alt="" /></Link>
              <div style={{}}>
              <p style={{margin: 0}}>{state?.user.displayName}</p>
              {/* <p style={{margin: 0, color: "rgb(47, 79, 79)"}} >{state?.user.email}</p> */}
              
              </div>
            </ListItem  >
            
            <ListItem button style={{margin: 0, display: "flex", flexDirection: "column", alignItems: "flex-start"}}  onClick={(e) => !openPath && e.preventDefault()} >
              <ListItemText primary="Verify Your Email" onClick={verificationCheck} />
           
            <div style={{margin: 0 , color: "green"}}>
            {state?.user?.emailVerified == false?
              <ListItemText style={{color: "#FCA510" }} primary="Please Verify Your Email First." />
              :
             
              "Your Email Is Verified."
              
         
              
    }
            </div>
            </ListItem>
          </List>
          <List>
            <ListItem button style={{ textDecoration: "underline" }} >
              <ListItemText primary="Log out" onClick={LogoutCheck} />
            </ListItem>
          </List>
        </div>
       
      </Drawer>




    </div>
  );
}
export default Header;
