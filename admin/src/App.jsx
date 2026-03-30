import React, { useContext } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Profile from './pages/Profile'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import Add from './pages/Add'
import List from './pages/List'
import Orders from './pages/Orders'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import { AuthContext } from '../src/context/authcontext'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const App = () => {
  // Get token from AuthContext to check login status
  const { token } = useContext(AuthContext);

  return (
    <div className='bg-white min-h-screen'>
      <ToastContainer position="top-right" autoClose={3000} />

      {/* CONDITIONAL RENDERING:
        If there is no token, show ONLY the Login page.
        If there is a token, show the Navbar, Sidebar, and Dashboard routes.
      */}
      {token === "" ? (
        <Routes>
          <Route path="/login" element={<Login />} />
          {/* Redirect any other path to login if not authenticated */}
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      ) : (
        <>
          <Navbar />
          <hr className='border-gray-100' />

          <div className='flex w-full'>
            <Sidebar />

            <div className='flex-1 p-8 bg-gray-50/30 min-h-[calc(100vh-80px)]'>
              <div className='max-w-5xl mx-auto'>
                <Routes>
                  <Route path='/' element={<Dashboard token={token}/> } />
                  <Route path='/add' element={<Add token={token} />} />
                  <Route path='/list' element={<List token={token} />} />
                  <Route path='/orders' element={<Orders token={token} />} />
                  <Route path='/profile' element={<Profile token={token} />} />
                  <Route path="/login" element={<Navigate to="/" />} />
                </Routes>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default App