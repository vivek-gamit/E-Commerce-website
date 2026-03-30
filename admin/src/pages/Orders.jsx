import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { Package } from 'lucide-react'

const Orders = ({ token }) => {
  const [orders, setOrders] = useState([])

  const fetchAllOrders = async () => {
    if (!token) return null;
    try {
      // Updated port to 3000 to match your backend
      const response = await axios.get("http://localhost:3000/api/order/orderList", {}, { headers: { token } })
      if (response.data.success) {
        setOrders(response.data.orders.reverse()) // Newest orders first
      } else {
        toast.error(response.data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  const statusHandler = async (event, orderId) => {
    const newStatus = event.target.value;
    try {
      // Optimistic UI update: instantly change it on screen for a faster feel
      setOrders(prevOrders => prevOrders.map(order =>
        order._id === orderId ? { ...order, status: newStatus } : order
      ));

      // Updated port to 3000
      const response = await axios.post("http://localhost:3000/api/order/status", { orderId, status: newStatus }, { headers: { token } })
      if (response.data.success) {
        toast.success("Status Updated")
      } else {
        // If it fails, refresh from database to fix the UI
        fetchAllOrders();
        toast.error("Failed to update status");
      }
    } catch (error) {
      fetchAllOrders();
      toast.error(error.message)
    }
  }

  useEffect(() => {
    fetchAllOrders()
  }, [token])

  return (
    <div className='bg-white p-8 rounded-2xl border border-gray-100 shadow-sm'>
      <div className='flex justify-between items-center mb-8'>
        <h2 className='text-xl font-bold uppercase tracking-tight'>Customer Orders</h2>
        <div className='flex gap-2 items-center text-xs font-bold text-zinc-400'>
          <span className='w-2 h-2 bg-green-500 rounded-full animate-pulse'></span>
          LIVE UPDATES
        </div>
      </div>

      <div className='flex flex-col gap-4'>
        {orders.map((order, index) => (
          <div key={index} className='grid grid-cols-1 sm:grid-cols-[0.5fr_2fr_1fr] lg:grid-cols-[0.5fr_2fr_1fr_1fr_1fr] gap-4 items-start border border-gray-100 p-6 rounded-2xl hover:border-black transition-all'>

            {/* 1. Icon */}
            <div className='bg-gray-50 p-4 rounded-xl flex items-center justify-center w-16 h-16'>
              <Package size={24} className='text-zinc-400' />
            </div>

            {/* 2. Items & Customer Info */}
            <div>
              <div className='mb-3'>
                {order.items.map((item, index) => (
                  <p className='text-sm font-semibold text-zinc-800' key={index}>
                    {item.name} x {item.quantity}

                    {/* This checks if size exists AND isn't just an empty string before rendering the brackets */}
                    {item.size && item.size.trim() !== '' && (
                      <span className='text-gray-400 text-xs ml-1'>({item.size})</span>
                    )}

                    {index !== order.items.length - 1 && ","}
                  </p>
                ))}
              </div>
              <p className='text-sm font-bold mt-3'>{order.address.firstName + " " + order.address.lastName}</p>
              <div className='text-xs text-gray-500 mt-1 leading-relaxed'>
                <p>{order.address.street + ","}</p>
                <p>{order.address.city + ", " + order.address.state + ", " + order.address.zipcode}</p>
              </div>
              <p className='text-xs font-medium text-zinc-400 mt-2'>{order.address.phone}</p>
            </div>

            {/* 3. Order Details */}
            <div className='text-sm'>
              <p className='text-gray-400 text-[10px] font-bold uppercase mb-1'>Items</p>
              <p className='font-bold'>{order.items.length}</p>
              <p className='text-gray-400 text-[10px] font-bold uppercase mt-3 mb-1'>Method</p>
              <p className='font-bold text-zinc-600'>{order.paymentMethod || "COD"}</p>
            </div>

            {/* 4. Payment & Price */}
            <div className='text-sm'>
              <p className='text-gray-400 text-[10px] font-bold uppercase mb-1'>Total Amount</p>
              <p className='text-lg font-black'>₹{order.amount}</p>
              <div className={`mt-2 inline-block px-2 py-1 rounded text-[10px] font-bold uppercase ${order.payment ? 'bg-green-50 text-green-600' : 'bg-orange-50 text-orange-600'}`}>
                {order.payment ? 'Paid' : 'Pending'}
              </div>
              {/* NEW: Display the Order Date */}
              <p className='text-[10px] text-zinc-400 font-bold uppercase mt-3'>
                {new Date(order.date || order.createdAt).toLocaleDateString()}
              </p>
            </div>

            {/* 5. Status Selector */}
            <select
              onChange={(event) => statusHandler(event, order._id)}
              value={order.status}
              className='p-3 text-sm font-bold border border-gray-200 rounded-xl outline-none bg-gray-50 focus:border-black transition-all cursor-pointer'
            >
              <option value="Order Placed">Order Placed</option>
              <option value="Packing">Packing</option>
              <option value="Shipped">Shipped</option>
              <option value="Out for delivery">Out for delivery</option>
              <option value="Delivered">Delivered</option>
            </select>

          </div>
        ))}
      </div>
    </div>
  )
}

export default Orders