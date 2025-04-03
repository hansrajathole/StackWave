import React from 'react'
import {BrowserRouter as Router  , Routes , Route} from 'react-router-dom'

import Navbar from '../components/Navbar/Navbar'
import SignUp from '../Views/SignUp/SignUp'
import SignIn from '../Views/SignIn/SignIn'
import Protected from '../components/Protected/Protecte'
import MainLayout from '../components/MainLayOut/MainLayout'

const AppRouter = () => {
  return (
    <Router>
    <Routes>
      <Route path="/" element={<Navbar/>} />
      <Route path="/signup" element={<SignUp/>} />
      <Route path="/login" element={<SignIn />} />
      <Route path='/*' element={<Protected><MainLayout/></Protected>}/>
    </Routes>
  </Router>
  )
}

export default AppRouter
