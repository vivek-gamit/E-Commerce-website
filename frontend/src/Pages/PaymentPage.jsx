import React, { useState } from 'react';
import { motion } from 'framer-motion';

const PaymentPage = () => {
  // Updated state to handle 'razorpay' and 'cod'
  const [paymentMethod, setPaymentMethod] = useState('razorpay');

  const handlePayment = () => {
    if (paymentMethod === 'razorpay') {
      console.log("Redirecting to Razorpay Gateway...");
      // Logic for Razorpay checkout goes here
    } else {
      console.log("Placing COD Order...");
      // Logic for COD order placement goes here
    }
  };

  return (
    <div className="bg-white min-h-screen p-6 md:p-12 max-w-4xl mx-auto font-sans">
      <h1 className="text-3xl font-serif mb-8 text-center">Payment & Review</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* LEFT: Shipping Summary & Payment Selection */}
        <div className="md:col-span-2 space-y-6">
          
          {/* 1. Review Address */}
          <div className="border p-4 rounded-lg flex justify-between items-start bg-gray-50/50">
            <div>
              <h3 className="text-xs uppercase tracking-widest text-gray-500 mb-2">Ship to</h3>
              <p className="text-sm font-medium">John Doe</p>
              <p className="text-sm text-gray-600">123 Fashion Street, Mumbai, 400001</p>
            </div>
            <button className="text-xs font-bold underline hover:text-gray-600">Edit</button>
          </div>

          {/* 2. Payment Selection */}
          <div className="space-y-4">
            <h2 className="text-lg font-medium mb-4">Select Payment Method</h2>
            
            {/* Razorpay Option */}
            <label 
              className={`flex items-center p-5 border rounded-xl cursor-pointer transition-all hover:bg-gray-50 ${
                paymentMethod === 'razorpay' ? 'border-black ring-1 ring-black bg-gray-50' : 'border-gray-200'
              }`}
            >
              <input 
                type="radio" 
                name="payment" 
                className="accent-black w-4 h-4" 
                onChange={() => setPaymentMethod('razorpay')}
                checked={paymentMethod === 'razorpay'}
              />
              <div className="ml-4 flex-1">
                <span className="block font-medium">Online Payment</span>
                <span className="text-xs text-gray-500">Cards, UPI, Netbanking, Wallets</span>
              </div>
              <img src="https://razorpay.com/favicon.png" alt="Razorpay" className="h-6 w-6 opacity-80" />
            </label>

            {/* Cash on Delivery Option */}
            <label 
              className={`flex items-center p-5 border rounded-xl cursor-pointer transition-all hover:bg-gray-50 ${
                paymentMethod === 'cod' ? 'border-black ring-1 ring-black bg-gray-50' : 'border-gray-200'
              }`}
            >
              <input 
                type="radio" 
                name="payment" 
                className="accent-black w-4 h-4" 
                onChange={() => setPaymentMethod('cod')}
                checked={paymentMethod === 'cod'}
              />
              <div className="ml-4 flex-1">
                <span className="block font-medium">Cash on Delivery</span>
                <span className="text-xs text-gray-500">Pay when your order arrives</span>
              </div>
              <div className="text-gray-400">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
            </label>
          </div>
        </div>

        {/* RIGHT: Order Summary Card */}
        <div className="h-fit sticky top-10 border-t-4 border-black bg-white shadow-xl p-6 rounded-b-xl">
          <h2 className="font-bold mb-4">Order Summary</h2>
          <div className="flex justify-between text-sm mb-2 text-gray-700">
            <span>Taupe Bag Classic</span>
            <span>₹4,999</span>
          </div>
          <div className="flex justify-between text-sm mb-4">
            <span>Shipping</span>
            <span className="text-green-600 font-medium">Free</span>
          </div>
          
          <div className="border-t pt-4 flex justify-between items-center mb-6">
            <span className="font-bold text-lg text-gray-900">Total</span>
            <span className="font-bold text-lg text-gray-900">₹4,999</span>
          </div>
          
          <motion.button 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handlePayment}
            className="w-full bg-black text-white py-4 rounded-full font-bold shadow-lg transition-colors hover:bg-gray-900"
          >
            {paymentMethod === 'razorpay' ? 'PROCEED TO PAY' : 'PLACE ORDER (COD)'}
          </motion.button>

          <p className="text-[10px] text-gray-400 mt-4 text-center px-2 leading-relaxed">
            {paymentMethod === 'razorpay' 
              ? "You will be redirected to Razorpay's secure payment portal." 
              : "Please keep the exact change ready for the delivery partner."}
          </p>
        </div>

      </div>
    </div>
  );
};

export default PaymentPage;