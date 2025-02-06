import React, { useContext, useState, useRef, useEffect } from 'react';
import { GlobalContext } from '../Context/Context';
import "./Home.css";
import VideoCameraFrontIcon from '@mui/icons-material/VideoCameraFront';
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import { Modal, Box, Button, Typography, TextField } from "@mui/material";
import { IconButton } from '@mui/material';
import { ThumbUp, Share, Comment } from '@mui/icons-material';
// import Card from '../components/CardsCom';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import { addDoc, collection, getDocs, getFirestore, query } from "firebase/firestore";
import moment from 'moment/moment';


const HomePage = () => {
  const [open, setOpen] = useState(false);
  const [text, setText] = useState("");
  const [file, setFile] = useState(null);
  const [closed , setClosed]=useState(false)
  const { state } = useContext(GlobalContext);
  // const [isDragging, setIsDragging] = useState(false);
  const [provideData ,setProvideData]=useState([])
  const fileInputRef = useRef(null);
  const [selectedFiles, setSelectedFiles] = useState();
  const db = getFirestore();
  
  const handleOpen = () => {
    setOpen(true);
    setClosed(false)
  }
  const handleClose = () => {
    setOpen(false);
    setSelectedFiles([]);
    setFile(null);
    setClosed(false)
  };

 
  


  
  const handleFileInputChange = (e) => {
    const files = Array.from(e.target.files);
    // handleFiles(files);
  };

  // const handleFiles = (files) => {
  //   if (files.length > 0) {
  //     setSelectedFiles(files);
  //     setFile(files[0]);
  //   }
  // };

  const handleClick = () => {
    fileInputRef.current.click();
  };
 
    
    const  addPost  = async () => {
      try {
        const docRef = await addDoc(collection(db, "Social-Posts"), {
          userName: state.user.displayName,
          profilePic: state.user.photoURL,
          userEmail : state.user.email,
          caption: text,
          userId: state.user.uid,
          userDate : new Date().getTime(),
          


        });
        console.log("Document written with ID: ", docRef.id);
      } catch (e) {
        console.error("Error adding document: ", e);
      }
      setOpen(false)
      setText("")

 
    };
    useEffect(()=>{
      const getPost= async()=>{
        const q = query(collection(db, "Social-Posts") );

const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
  
      console.log(doc.id, " => ", doc.data());
      setProvideData((prev)=>[...prev, doc.data()])
});
      } 
      getPost()
      console.log('getprov', provideData)
      
    },[])
 

  const removeSelectedFiles = () => {
    setSelectedFiles([]);
    setFile(null);
    setClosed(true)
    console.log("check")
  };

  return (
    <>
      <div className='header'>
        <div className='header-First'>
          <img src={state.user?.photoURL} alt="" />
          <button>What's on your mind, {state?.user?.displayName}?</button>
        </div>
        <hr />
        <div className='Button-section'>
          <button><VideoCameraFrontIcon style={{ fontSize: 30, color: 'red' }} />Live Video</button>
          <button onClick={handleOpen}><InsertPhotoIcon style={{ fontSize: 30, color: 'green' }} />Photo/Video</button>
          <button><EmojiEmotionsIcon style={{ fontSize: 30, color: 'yellow' }} />Feeling Activity</button>
        </div>
      </div>

      <Modal open={open} onClose={handleClose}>
        <Box sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "#252728",
          boxShadow: 24,
          p: 4,
          borderRadius: 2
        }}>
          <Typography variant="h6" sx={{ color: "white", textAlign: "center", mb: 2 }}>
            Create Post
          </Typography>
          <div style={{ border: "1px solid rgb(101, 104, 108)", padding: "10px", borderRadius: "8px", display: "flex", alignItems: "center", columnGap: "10px", color: "white", marginBottom: "10px" }}>
              <img style={{ width: "45px", borderRadius: "50%" }} src={state?.user?.photoURL} alt="" />
              <div style={{ display: "flex", flexDirection: "column", gap: "3px" }}>
                <span>{state?.user?.displayName}
                </span>
                <button style={{ backgroundColor: "rgb(59, 61, 62)", color: "white", border: "none", borderRadius: "6px", padding: "5px" }}>friends of friends</button>
              </div>
            </div>
          <TextField
            fullWidth
            multiline
            rows={2}
            label="Enter your text"
            variant="outlined"
            sx={{ mb: 2 }}
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          {(closed == false)?
          <div style={{border: "1px solid rgb(101, 104, 108)", padding: "10px", borderRadius: "8px"}}>

          <Box sx={{
            width: "100%",
            height: 200,
            border: "1px solid #444",
            borderRadius: "8px",
            backgroundColor: "#333",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
            cursor: "pointer",
            // overflow: "hidden"
          }}
           
            // onClick={handleClick}
          >
            <CloseIcon sx={{ position: "absolute", top: 8, right: 8, cursor: "pointer", color: "white"}} onClick={removeSelectedFiles} />
            <input type="file" multiple hidden ref={fileInputRef} onChange={handleFileInputChange} />
            <div onClick={handleClick} style={{display: "flex", justifyContent: "center",alignItems: "center", flexDirection: "column"}}>
            <AddIcon sx={{ fontSize: 40, color: "white" }} />
            <Typography color="white">Add photos/videos</Typography>
            <Typography color="#ccc" fontSize={12}>or drag and drop</Typography>
            </div>
          </Box>
          </div>
          :
          null
}
          <Box sx={{ mt: 3, display: "flex", justifyContent: "space-between" }}>
            <Button variant="contained" sx={{ bgcolor: "gray" }} onClick={handleClose}>Cancel</Button>
            <Button variant="contained" color="primary" disabled={text == 0    } onClick={addPost}>Post</Button>
          </Box>
        </Box>
      </Modal>
      {provideData.map((ele , i)=>{
        const styles = {
          card: {
            width: '35.5%',
            border: '1px solid #ddd',
            borderRadius: '8px',
            padding: '16px',
            fontFamily: 'Arial, sans-serif',
            backgroundColor: '#252728',
            margin: "auto",
            marginTop: "10px"
          },
          cardHeader: {
            display: 'flex',
            alignItems: 'center',
          },
          profilePic: {
            width: '42px',
            height: '42px',
            borderRadius: '50%',
            marginRight: '16px',
          },
          userInfo: {
            display: 'flex',
            flexDirection: 'column',
          },
          userName: {
            fontWeight: 'bold',
          },
          userData: {
            fontSize: '12px',
            color: '#555',
          },
          cardImage: {
            marginTop: '16px',
            width: '100%',
            height: 'auto',
            borderRadius: '8px',
          },
          actions: {
            display: 'flex',
            justifyContent: 'space-between',
            marginTop: '16px',
          },
          actionBtn: {
            padding: '8px',
            color: "white"
          },
        };
        return(
         <div key={i} style={styles.card}>
                <div style={styles.cardHeader}>
                  <img
                    src={ele.profilePic}
                    alt="Profile Picture"
                    style={styles.profilePic}
                  />
                  <div style={styles.userInfo}>
                    <span style={styles.userName}>{ele.userName}</span>
                    <span style={styles.userData}>{moment(ele.userDate).fromNow()}</span>
                  </div>
                </div>
              <p>{ele.caption}
              </p>
                <img src="image.jpg" alt="Image" style={styles.cardImage} />
                <div style={styles.actions}>
                  <IconButton style={styles.actionBtn}>
                    <ThumbUp />
        
                  </IconButton>
                  <IconButton style={styles.actionBtn}>
                    <Share />
        
                  </IconButton>
        
                  <IconButton style={styles.actionBtn}>
                    <Comment />
        
                  </IconButton>
                </div>
              </div>
        )
      })}


     


       
 
    </>
  );
};

export default HomePage;