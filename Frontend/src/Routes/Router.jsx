import React from 'react'
import {BrowserRouter as Router  , Routes , Route} from 'react-router-dom'
import SignUp from '../components/SignUp/SignUp'
import SignIn from '../components/SignIn/SignIn'
import Navbar from '../components/Navbar/Navbar'

const AppRouter = () => {
  return (
    <Router>
    <Routes>
      <Route path="/" element={<Navbar/>} />
      <Route path="/signup" element={<SignUp/>} />
      <Route path="/login" element={<SignIn />} />
    </Routes>
  </Router>
  )
}

export default AppRouter
