import React from 'react'
import { Outlet } from 'react-router-dom'
import Aside from '../components/Aside'

function Layout() {
  return (
    <div>
        <Aside/>
        <Outlet/>
    </div>
  )
}

export default Layout