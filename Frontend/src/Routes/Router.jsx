import React, { useEffect } from 'react'
import {BrowserRouter as Router  , Routes , Route} from 'react-router-dom'

import Navbar from '../components/Navbar/Navbar'
import SignUp from '../Views/SignUp/SignUp'
import SignIn from '../Views/SignIn/SignIn'
import Protected from '../components/Protected/Protecte'
import MainLayout from '../components/MainLayOut/MainLayout'
import Home from '../Views/Home/Home'
import Home2 from '../Views/Home/Home2'
import { useSelector } from 'react-redux'
import PageNotFound from '../Views/404/PageNotFound'

const AppRouter = () => {
  const user = useSelector((state)=> state.auth.user)
  
  return (

      <Router>
      <Routes>
        <Route path="/" element={user? <Home2/>:<Home/>} />
        <Route path="/signup" element={<SignUp/>} />
        <Route path="/login" element={<SignIn />} />
        {/* <Route path='/*' element={<PageNotFound/>}/> */}
        <Route path='/*' element={<Protected><MainLayout/></Protected>}/>
        
      </Routes>
    </Router>

  )
}

export default AppRouter
