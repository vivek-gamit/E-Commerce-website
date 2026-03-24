import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const CartPage = () => {

  
  // Sample state - in a real app, this comes from Redux or Context
  const [cartItems, setCartItems] = useState([
    { id: 1, name: "Taupe Bag Classic", price: 4999, qty: 1, image: "/bag-image.jpg" },
    { id: 2, name: "Midnight Clutch", price: 3200, qty: 1, image: "/clutch-image.jpg" }
  ]);

  const updateQty = (id, delta) => {
    setCartItems(prev => prev.map(item => 
      item.id === id ? { ...item, qty: Math.max(1, item.qty + delta) } : item
    ));
  };

  const removeItem = (id) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.qty), 0);
   
  const navigate = useNavigate();
  return (
    <div className="bg-white min-h-screen p-6 md:p-12 max-w-5xl mx-auto">
      <h1 className="text-3xl font-serif mb-10 italic">Your Shopping Bag</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Left: Item List */}
        <div className="lg:col-span-2 space-y-8">
          <AnimatePresence>
            {cartItems.map((item) => (
              <motion.div 
                key={item.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 50 }}
                className="flex gap-6 border-b pb-8 items-center"
              >
                <img src={item.image} alt={item.name} className="w-24 h-32 object-cover bg-gray-100 rounded" />
                
                <div className="flex-1 space-y-1">
                  <h3 className="font-medium text-lg uppercase tracking-tight">{item.name}</h3>
                  <p className="text-gray-500 text-sm">₹{item.price.toLocaleString()}</p>
                  
                  <div className="flex items-center gap-4 mt-4">
                    {/* Quantity Selector */}
                    <div className="flex items-center border border-gray-300 rounded-full px-3 py-1">
                      <button onClick={() => updateQty(item.id, -1)} className="px-2 hover:text-gray-500">-</button>
                      <span className="px-4 text-sm font-bold w-10 text-center">{item.qty}</span>
                      <button onClick={() => updateQty(item.id, 1)} className="px-2 hover:text-gray-500">+</button>
                    </div>
                    <button onClick={() => removeItem(item.id)} className="text-xs text-red-500 underline uppercase tracking-widest font-bold ml-4">Remove</button>
                  </div>
                </div>

                <div className="text-right">
                  <p className="font-bold text-lg">₹{(item.price * item.qty).toLocaleString()}</p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Right: Summary Box */}
        <div className="bg-gray-50 p-8 rounded-xl h-fit sticky top-10 border border-gray-100 shadow-sm">
          <h2 className="text-xl font-medium mb-6">Order Summary</h2>
          <div className="space-y-4 border-b pb-6 text-gray-600">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span className="font-medium text-black">₹{subtotal.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-green-600">
              <span>Shipping</span>
              <span className="font-medium uppercase text-xs">Free</span>
            </div>
          </div>
          <div className="flex justify-between items-center pt-6 mb-8">
            <span className="text-lg font-bold">Total</span>
            <span className="text-2xl font-bold">₹{subtotal.toLocaleString()}</span>
          </div>

          <button onClick={() => {navigate(`/paymentpage`)}} className="w-full bg-black text-white py-4 rounded-full font-bold hover:bg-gray-800 transition-all flex items-center justify-center gap-2">
            CHECKOUT
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartPage;