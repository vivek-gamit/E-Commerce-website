import React from 'react';
import { useNavigate } from 'react-router-dom';

const CheckoutPage = () => {

    const navigate = useNavigate()
  return (
    <div className="bg-white min-h-screen p-4 md:p-10 font-sans text-gray-900">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
        
        {/* Left Side: Forms */}
        <div className="space-y-8">
          <h1 className="text-2xl font-serif font-medium">Fashion</h1>
          
          <section>
            <h2 className="text-lg font-medium mb-4">Contact</h2>
            <input type="text" placeholder="Email or mobile phone number" className="w-full border p-3 rounded-md outline-none focus:ring-1 focus:ring-black" />
          </section>

          <section>
            <h2 className="text-lg font-medium mb-4">Shipping Address</h2>
            <div className="grid grid-cols-2 gap-4">
              <input type="text" placeholder="First name" className="border p-3 rounded-md" />
              <input type="text" placeholder="Last name" className="border p-3 rounded-md" />
              <input type="text" placeholder="Address" className="col-span-2 border p-3 rounded-md" />
              <input type="text" placeholder="City" className="border p-3 rounded-md" />
              <input type="text" placeholder="PIN code" className="border p-3 rounded-md" />
            </div>
          </section>

          <button onClick={() => navigate(`/paymentpage`)} className="w-full bg-black text-white py-4 rounded-md font-medium hover:bg-gray-800 transition">
            Continue
          </button>
        </div>

        {/* Right Side: Order Summary */}
        <div className="bg-gray-50 p-6 rounded-xl border border-gray-100">
          <div className="flex items-center gap-4 mb-6">
            <div className="relative">
              <img src="/path-to-bag.jpg" alt="Product" className="w-20 h-20 object-cover rounded-lg border" />
              <span className="absolute -top-2 -right-2 bg-gray-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">1</span>
            </div>
            <div className="flex-1">
              <h3 className="font-medium text-sm">Taupe Bag Classic</h3>
            </div>
            <p className="font-medium">₹4,999</p>
          </div>

          <div className="border-t pt-4 space-y-2 text-sm text-gray-600">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>₹4,999</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping</span>
              <span>Calculated at next step</span>
            </div>
            <div className="flex justify-between text-base font-bold text-black pt-4 border-t mt-4">
              <span>Total</span>
              <span>₹4,999</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;