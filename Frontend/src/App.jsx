import React from 'react'
import AppRouter from './Routes/Router'
import Navbar from './components/Navbar/Navbar'
import { Toaster } from 'react-hot-toast'
import 'remixicon/fonts/remixicon.css'

const App = () => {
  return (
    <div className=''>
      {/* <Navbar/> */}
      <AppRouter/>
      <Toaster position="top-right" />
    </div>
  )
}

export default App
