import React, { useContext } from 'react';
import { IconButton } from '@mui/material';
import { ThumbUp, Share, Comment } from '@mui/icons-material';
import { GlobalContext } from '../Context/Context';

  const Card = () => {
    const { state } = useContext(GlobalContext)
    return (
      <div style={styles.card}>
        <div style={styles.cardHeader}>
          <img
            src={state.user.photoURL}
            alt="Profile Picture"
            style={styles.profilePic}
          />
          <div style={styles.userInfo}>
            <span style={styles.userName}>{state.user.displayName}</span>
            <span style={styles.userData}>Joined 2 years ago</span>
          </div>
        </div>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor optio eligendi ipsam dignissimos, blanditiis culpa,     tempora at aperiam corrupti nesciunt magnam cupiditate consequuntur provident.
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
    );
  };

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

  export default Card;
