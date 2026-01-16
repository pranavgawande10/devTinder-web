import React from 'react'
import NavBar from './NavBar'
import Footer from './Footer'
import { Outlet } from 'react-router-dom'

const Body = () => {
  return (
    <div>
        <NavBar/>
        <Footer/>
        <Outlet/>
    </div>
  )
}

export default Body