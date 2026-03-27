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
import Login from './Pages/Login'
import Profile from './Pages/Profile'
import CheckoutPage from './Pages/CheckoutPage'
import PaymentPage from './Pages/PaymentPage'
import CartPage from './Pages/CartPage'
import Orders from './Pages/Orders'
import FavoritesPage from './Pages/FavoritePage'

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
          <Route path='/about' element={<About/>} />
          <Route path='/blog' element={<Blog/>} />
          <Route path='/contact' element={<Contact/>} />
          <Route path='/favorite' element={<Favorite/>} />
          <Route path='/login' element={ <Login/>} />
          <Route path='/profile' element={ <Profile/>} />
          <Route path='/checkoutPage' element={ <CheckoutPage/>} />
          <Route path='/paymentpage' element={ <PaymentPage/>} />
          <Route path='/cartpage' element={<CartPage/>}/>
          <Route path='/orders' element={<Orders/>}/>
          <Route path='/favoritespage' element={<FavoritesPage/>}/>
          
          

        </Routes>

      </main>
      <Footer />
    </div>
  )
}

export default App
