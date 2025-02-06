import React, { useContext } from 'react'
import { Navigate, Route, Routes } from 'react-router'
import { GlobalContext } from '../Context/Context'
import HomePage from '../pages/HomePage'
import SignPage from '../pages/SignPage';
import ForgetPage from '../pages/ForgetPage';
import LoginPage from '../pages/LoginPage';
import { CircularProgress } from '@mui/material'


const CustomRoutes = () => {
  // const [loading, setLoading] = useState(false);
    const{state}=useContext(GlobalContext)
  return (
    <div>
        {(state.isLogin)?
        <Routes>
        <Route path='/' element={<HomePage/>}/>
        <Route path='/forget' element={<ForgetPage/>}/>
        <Route path='*' element={<Navigate to={'/'}/>}/>

      </Routes>
      :
      (state.isLogin == false)?
      <Routes>
          <Route path='/sign' element={<SignPage/>}/>
          <Route path='/login' element={<LoginPage/>}/>
          <Route path='/forget' element={<ForgetPage/>}/>
          <Route path='*' element={<Navigate to={'/login'}/>}/>
          </Routes>
          : 
          <div style={{ 
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            overflow: 'hidden' // Prevents scrollbars
        }}>
            <CircularProgress size={100} /> 
            </div>
}
    </div>
  )
}

export default CustomRoutes