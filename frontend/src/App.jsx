import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from './Components/Navbar'
import Home from './Pages/Home'
import Footer from './Components/Footer'


const App = () => {
  return (
    <div className='flex flex-col min-h-screen'>
      <main className='grow'>
        <Navbar />

        <Routes>
          <Route path='/' element={<Home />} />
        </Routes>

      </main>
      <Footer />
    </div>
  )
}

export default App
