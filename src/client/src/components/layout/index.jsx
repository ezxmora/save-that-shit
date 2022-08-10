import React from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
// Pages
import Root from '../../pages/root'
import Faq from '../../pages/faq'

// Components
import Navbar from '../navbar'

const Layout = () => {
  return (
    <div className='h-full'>
      <Navbar currentRoute={useLocation().pathname} />
      <Routes>
        <Route exact path='/' element={<Root/>} />
        <Route path='/faq' element={<Faq/>} />
      </Routes >
    </div >
  )
}

export default Layout
