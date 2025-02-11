import React, { useContext, useEffect, useState } from 'react'
import { GlobalContext } from '../Context/Context'
import { collection, deleteDoc, doc, getFirestore, onSnapshot, orderBy, query, where } from 'firebase/firestore'
import Swal from 'sweetalert2'
import moment from 'moment'
import {  Button,  TextField } from "@mui/material";
import { IconButton } from '@mui/material';
import { ThumbUp, Share, Comment } from '@mui/icons-material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

// import { Button } from '@mui/material'

const Profile = () => {
    const{state}=useContext(GlobalContext)
    const [provideData, setProvideData]= useState([])
    const [idCheck ,setIdCheck]=useState("")
    const db = getFirestore();
    console.log("idCheck", idCheck)
    const{dispatchId}=useContext(GlobalContext)
    let getLocalCheck = localStorage.getItem("userId")
    // const userIdForQuery = getLocalCheck ? getLocalCheck.toString() : null;
    const userIdForQuery = getLocalCheck 
  ? getLocalCheck.toString() 
  : state?.user?.uid ?? null;
  console.log("state", state)
    console.log("getLocalCheck", getLocalCheck)
    let unsubscribe;
    useEffect(()=>{
      
        const q = query(collection(db, "Social-Posts"),orderBy("userDate", "desc") ,where("userId", "==", userIdForQuery ));
         unsubscribe = onSnapshot(q, (querySnapshot) => {
            let checkData = []
  querySnapshot.forEach((doc) => {
    //   cities.push(doc.data().name);
    checkData.push({...doc.data(), id: doc.id})
    setProvideData(checkData)
  });

//   console.log("Current cities in CA: ", cities.join(", "));
});
        
return ()=>{
unsubscribe();
// dispatchId({type: "USER_ID_NOTFOUND"})
}
    },[])
    const deletePostCheck= async(id) =>{
        await deleteDoc(doc(db, "Social-Posts", id));
        console.log('delete post', id);
        
      }
      const editpost=(id )=>{
        setIdCheck(id)
        // setAnthorText(val)
        // setModalOpen(true)
        
        }
         
  return (
    <div>
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
            <img
                src={ele.profilePic}
                alt="Profile Picture"
                style={styles.profilePic}
                onClick={()=>{editpost(ele.id)}}
              />
              <div style={{display: "flex", justifyContent: "space-between", width: "100%"}}>
              <div style={styles.userInfo}>
                <span style={styles.userName}>{ele.userName}</span>
                <span style={styles.userData}>{moment(ele.userDate).fromNow()}</span>
              </div>
              {(state.user.uid == ele.userId)?
              <div style={{display: "flex", gap: "20px"}}>
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
              </div>
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
    </div>
  )
}

export default Profile
