import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import { router } from './routes/Routes'
import { Toaster } from 'react-hot-toast'

ReactDOM.createRoot(document.getElementById('root')).render(
  <div className='max-w-[1440px] mx-auto'>
    <Toaster />
    <RouterProvider router={router} />
  </div>
)
