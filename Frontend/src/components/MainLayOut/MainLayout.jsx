import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Protected from '../Protected/Protecte'
import Navbar from '../Navbar/Navbar'
import Home from '../Home/Home'
import Room from '../../Views/Room/Room'
const MainLayout = () => {
  return (
    <div className=' flex'>
        <div className='w-[20%]'>
            <Navbar/>
        </div>
        <div className='w-[100%] mt-10'>
            <Routes>
                <Route path='/home' element={<Protected><Home/></Protected>}/>
                <Route path='/room' element={<Protected><Room/></Protected>}/>
            </Routes>
        </div>
    </div>
  )
}

export default MainLayout
