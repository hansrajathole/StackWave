import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Protected from '../Protected/Protecte'
import Navbar from '../Navbar/Navbar'
import Home from '../Home/Home'
const MainLayout = () => {
  return (
    <div className=' flex'>
        <div className='w-[20%]'>
            <Navbar/>
        </div>
        <div className='w-[80%] mt-20'>
            <Routes>
                <Route path='/home' element={<Protected><Home/></Protected>}/>
            </Routes>
        </div>
    </div>
  )
}

export default MainLayout
