import React, { useContext, useState, useRef, useEffect } from 'react';
import { GlobalContext } from '../Context/Context';
import "./Home.css";
import VideoCameraFrontIcon from '@mui/icons-material/VideoCameraFront';
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import { Modal, Box, Button, Typography, TextField } from "@mui/material";
import { IconButton } from '@mui/material';
import { ThumbUp, Share, Comment } from '@mui/icons-material';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import { addDoc, collection, deleteDoc, doc, getDocs, getFirestore, onSnapshot, orderBy, query, updateDoc, where } from "firebase/firestore";
import moment from 'moment/moment';
import axios from 'axios';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Swal from 'sweetalert2';
import { Link } from 'react-router';
// import Button from '@mui/material/Button';

const HomePage = () => {
  const [open, setOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [text, setText] = useState("");
  const [files, setFile] = useState();
  const [closed, setClosed] = useState(false)
  const { state } = useContext(GlobalContext);
  const [captionCheck, setCaptionCheck] = useState('');
  const [anthorText, setAnthorText] = useState('');
  const[idCheck, serIdCheck]=useState('')
  const [provideData, setProvideData] = useState([])
  // const anchorRef = useRef(null);
  const fileInputRef = useRef(null);
  // const{state}=useContext(GlobalContext)
  

 
  const db = getFirestore();

  const handleOpen = () => {
    setOpen(true);
    
  }
  const handleClose = () => {
    setOpen(false);
    
    
  };








  const handleClick = () => {
    fileInputRef.current.click();
  };
  

  const addPost = async () => {
    if(files){
    const formData = new FormData();
    formData.append("file", files);
    formData.append("upload_preset", "social-posts");
    const res = await axios.post("https://api.cloudinary.com/v1_1/diplc3kki/upload", formData);

    
    try {
      const docRef = await addDoc(collection(db, "Social-Posts"), {
        userName: state.user.displayName,
        profilePic: state.user.photoURL,
        userEmail: state.user.email,
        caption: text,
        userId: state.user.uid,
        userDate: new Date().getTime(),
        postFile: res.data.url




      });
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }
  else{
    try {
      const docRef = await addDoc(collection(db, "Social-Posts"), {
        userName: state.user.displayName,
        profilePic: state.user.photoURL,
        userEmail: state.user.email,
        caption: text,
        userId: state.user.uid,
        userDate: new Date().getTime(),
        // postFile: res.data.url




      });
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }
    setOpen(false)
    setModalOpen(false)
    setText("")
    setFile()

  };
  // const getPost = async () => {
  //   const q = query(collection(db, "Social-Posts"));

  //   const querySnapshot = await getDocs(q);
  //   querySnapshot.forEach((doc) => {

  //     console.log(doc.id, " => ", doc.data());
  //     setProvideData((prev) => [...prev, doc.data()])
  //   });
  // }
  useEffect(() => {
    let unsubscribe;
    // getPost()
    const realTimeData=()=>{
      const q = query(collection(db, "Social-Posts"), orderBy("userDate" ,"desc"),   /* where("userId", "==", state?.user?.uid)*/);
       unsubscribe = onSnapshot(q, (querySnapshot) => {
        let realTime = []
        querySnapshot.forEach((doc) => {
          
          // console.log('data', provideData )
          realTime.push({...doc.data(), id:doc.id })
          // setProvideData((prev) => [...prev, doc.data()]) 
        });
        // console.log("Current cities in CA: ", cities.join(", "));
        setProvideData(realTime)
      });
    }  

    console.log('getprov', provideData)
    realTimeData()
    
    return()=> {
      unsubscribe()
    }
  }, [])
  const deletePostCheck= async(id) =>{
    await deleteDoc(doc(db, "Social-Posts", id));
    console.log('delete post', id);
    
  }
  const upadatePost = async()=>{
    const cityRef = doc(db, 'Social-Posts', idCheck );
    setCaptionCheck('')
// Remove the 'capital' field from the document
await updateDoc(cityRef, {
    caption:captionCheck
  });
  setModalOpen(false)
  setCaptionCheck('')
  }
const editpost=(id ,val)=>{
serIdCheck(id)
setAnthorText(val)
setModalOpen(true)

}
const handleCloseCheck=()=>{
  setModalOpen(false)
  setCaptionCheck('')
}
const targetclosed=()=>{
  setClosed(true)
}
  
  return (
    <div style={{opacity: closed==false ? 1 : 0.5}}>
      <div className='header' >
        <div className='header-First'>
          <img src={state.user?.photoURL} alt="" />
          <button onClick={handleOpen}>What's on your mind, {state?.user?.displayName}?</button>
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
          {(closed == false) ?
            <div style={{ border: "1px solid rgb(101, 104, 108)", padding: "10px", borderRadius: "8px" }}>

              {(closed== false)?
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
                <CloseIcon sx={{ position: "absolute", top: 8, right: 8, cursor: "pointer", color: "white" }} onClick={targetclosed} />
                <input  type="file" ref={fileInputRef} hidden  onChange={(e) => setFile(e.target.files[0])} 
/>
                <div onClick={handleClick} style={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
                  <AddIcon sx={{ fontSize: 40, color: "white" }} />
                  <Typography color="white">Add photos/videos</Typography>
                  <Typography color="#ccc" fontSize={12}>or drag and drop</Typography>
                </div>
              </Box>
                :
                null
}
            </div>
            :
            null
          }
          <Box sx={{ mt: 3, display: "flex", justifyContent: "space-between" }}>
            <Button variant="contained" sx={{ bgcolor: "gray" }} onClick={handleClose}>Cancel</Button>
            <Button variant="contained" color="primary" disabled={text == 0} onClick={addPost}>Post</Button>
          </Box>
        </Box>
      </Modal>
      {provideData.map((ele, i) => {
        console.log("eachpost", ele)
        const styles = {
          card: {
            width: '35.5%',
            border: '1px solid #ddd',
            borderRadius: '8px',
            padding: '16px',
            fontFamily: 'Arial, sans-serif',
            backgroundColor: '#252728',
            margin: "auto",
            marginTop: "10px",
            color: "white"
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
        return (
          <div key={i} style={styles.card }>
            <div style={styles.cardHeader}>
             <Link to={"/profile"}> <img
                src={ele.profilePic}
                alt="Profile Picture"
                style={styles.profilePic}
              /></Link>
              <div style={{display: "flex", justifyContent: "space-between", width: "100%"}}>
              <div style={styles.userInfo}>
                <span style={styles.userName}>{ele.userName}</span>
                <span style={styles.userData}>{moment(ele.userDate).fromNow()}</span>
              </div>
              {(state.user.uid == ele.userId)?
              <>
              <Button variant="contained" color='error' onClick={()=>{Swal.fire({
  title: "Do you want to delete your post?",
  // showDenyButton: true,
  icon: "warning",
  showCancelButton: true,
  confirmButtonText: "Delete",
  denyButtonText: `Don't save`
}).then((result) => {
  /* Read more about isConfirmed, isDenied below */
  if (result.isConfirmed) {
    deletePostCheck(ele.id)
    Swal.fire("Saved!", "", "success");
  } 
});}} startIcon={<DeleteIcon />}>Delete</Button>
              <Button variant="contained" color='secondary' onClick={()=>{editpost(ele.id , ele.caption) }} startIcon={<EditIcon />}>Edit</Button>
              </>
              :
              null
}
      </div>

       
              

              
            </div>
            <p>{ele.caption}
            </p>
            {(ele.postFile)?
            <img src={ele.postFile} alt="Image" style={styles.cardImage} />
            :
            null}
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
  <Modal open={modalOpen} onClose={handleCloseCheck}>
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
            Update Post
          </Typography>
         
          <TextField
            fullWidth
            multiline
            rows={2}
            type='text'
            label="Enter your text"
            variant="outlined"
            sx={{ mb: 2 }}
            // value={anthorText}
            onChange={(e) => setCaptionCheck(e.target.value)}
          />
          
               
          <Box sx={{ mt: 3, display: "flex", justifyContent: "space-between" }}>
            {/* <Button variant="contained" sx={{ bgcolor: "gray" }} onClick={handleClose}>Cancel</Button> */}
            <Button variant="contained" color="primary" disabled={captionCheck == 0} onClick={upadatePost}>Post</Button>
          </Box>
        </Box>
      </Modal>






    </div>
  );
};

export default HomePage;

