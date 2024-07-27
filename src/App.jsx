import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import './App.css'
// import authService from "./appwrite/authService"
// import {Login, Logout} from "./store/authSlice"
import { Footer, Header } from './components'
import { Outlet } from 'react-router-dom'

function App() {
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()

  // useEffect(() => {
  //   authService.getCurrentUser()
  //   .then((userData) => {
  //     if (userData) {
  //       dispatch(Login({userData}))
  //     } else {
  //       dispatch(Logout())
  //     }
  //   })
  //   .finally(() => setLoading(false))
  // }, [])
  
  // return !loading ? (
  return  (
    <div className='min-h-screen flex flex-wrap content-between bg-gray-400'>
      <div className='w-full block'>
        <Header />
        <main>
        TODO:  <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  ) 
  // ) : null
}

export default App