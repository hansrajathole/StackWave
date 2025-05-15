import React, { useEffect } from 'react'
import {BrowserRouter as Router  , Routes , Route} from 'react-router-dom'

import SignUp from '../Views/SignUp/SignUp'
import SignIn from '../Views/SignIn/SignIn'
import Protected from '../components/Protected/Protecte'
import MainLayout from '../components/MainLayOut/MainLayout'
import { useSelector } from 'react-redux'
import ProtectedRoute from '../components/Protected/Protecte'
import CollabEditor from '../components/editor/CollabEditor'
import ProfilePage from '../Views/profile/ProfilePage'
import Home from '../Views/Home/Home'
import OtpForm from '../components/otpVerification/OtpForm'
import ForgetPass from '../components/forgetPassword/ForgetPass'
const AppRouter = () => {
  const user = useSelector((state)=> state.auth.user)
  
  return (

      <Router>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/signup" element={<SignUp/>} />
        <Route path="/login" element={<SignIn />} />
        <Route path="/forget-password" element={<ForgetPass />} />
        <Route path="/login/otpVerification" element={<OtpForm/>} />
        <Route path="/rooms/room/:roomId" element={
              <ProtectedRoute>
                <CollabEditor/>
              </ProtectedRoute>
             }
            />
        <Route path='/*' element={<Protected><MainLayout/></Protected>}/>
        
        <Route path='/profile/:userId' element={<ProtectedRoute><ProfilePage/></ProtectedRoute>}/>
      </Routes>
    </Router>

  )
}

export default AppRouter
