import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from './Components/Navbar'
import Home from './Pages/Home'
import Footer from './Components/Footer'
import Product from './Pages/Product'
import Product_Dasbord from './Pages/Product_Dasbord'
import About from './Pages/About'
import Blog from './Pages/Blog'
import Contact from './Pages/Contact'
import Favorite from './Pages/Favorite'
import Card from './Pages/Card'
import Login from './Pages/Login'
import Profile from './Pages/Profile'


const App = () => {
  return (
    <div className='flex flex-col min-h-screen'>
      <main className='grow'>
        <Navbar />

        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/product' element={<Product />} />
          <Route path='/product/:category' element={<Product />} />
          <Route path='/product_Dasbord' element={<Product_Dasbord />} />
          <Route path='/product_Dasbord/:id/:category?' element={<Product_Dasbord />} />
          <Route path='about' element={<About/>} />
          <Route path='blog' element={<Blog/>} />
          <Route path='contact' element={<Contact/>} />
          <Route path='favorite' element={<Favorite/>} />
          <Route path='card' element={<Card/>} />
          <Route path='login' element={ <Login/>} />
          <Route path='profile' element={ <Profile/>} />
          

        </Routes>

      </main>
      <Footer />
    </div>
  )
}

export default App
