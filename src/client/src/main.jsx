import React, { StrictMode } from 'react'
import { BrowserRouter } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import { createRoot } from 'react-dom/client'
import Layout from './components/layout'

import './main.css'
import 'react-toastify/dist/ReactToastify.css'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <div className='h-screen'>
      <Layout />
      <ToastContainer
        position='top-right'
      />
    </div>
  </BrowserRouter>
)
