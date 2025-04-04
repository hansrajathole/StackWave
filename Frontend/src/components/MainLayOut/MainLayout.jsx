import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Protected from '../Protected/Protecte'
import Navbar from '../Navbar/Navbar'
import Room from '../../Views/Room/Room'
import Users from '../../Views/Users/Users'
import Home from '../../Views/Home/Home'
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
                <Route path='/users' element={<Protected><Users/></Protected>}/>
            </Routes>
        </div>
    </div>
  )
}

export default MainLayout
