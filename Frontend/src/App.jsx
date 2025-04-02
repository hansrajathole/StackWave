import React from 'react'
import Navbar from './components/Navbar/Navbar'
import SignIn from './components/SignIn/SignIn'
import SignUp from './components/SignUp/SignUp'
import AppRouter from './Routes/Router'

const App = () => {
  return (
    <div>
      <AppRouter/>
    </div>
  )
}

export default App
