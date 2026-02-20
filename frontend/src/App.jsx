import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from './Components/Navbar'
import Home from './Pages/Home'
import Footer from './Components/Footer'
import Product from './Pages/Product'
import Product_Dasbord from './Pages/Product_Dasbord'


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
          <Route path='/product_Dasbord/:id' element={<Product_Dasbord />} />

        </Routes>

      </main>
      <Footer />
    </div>
  )
}

export default App
