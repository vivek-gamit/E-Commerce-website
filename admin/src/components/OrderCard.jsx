import React from 'react'
import { Package } from 'lucide-react'

const OrderCard = ({ order, statusHandler }) => {
  return (
    <div className='grid grid-cols-1 sm:grid-cols-[0.5fr_2fr_1fr_1fr_1fr] gap-4 items-start border border-gray-100 p-6 rounded-2xl bg-white hover:border-black transition-all'>
      <div className='bg-gray-50 p-4 rounded-xl flex items-center justify-center w-16 h-16'>
          <Package size={24} className='text-zinc-400' />
      </div>

      <div>
        <div className='text-sm font-semibold'>
          {order.items.map((item, i) => (
            <span key={i}>{item.name} x {item.quantity} {i !== order.items.length-1 && ", "}</span>
          ))}
        </div>
        <p className='text-sm font-bold mt-2'>{order.address.firstName} {order.address.lastName}</p>
        <p className='text-[11px] text-gray-500'>{order.address.street}, {order.address.city}</p>
      </div>

      <div className='text-sm'>
          <p className='text-gray-400 text-[10px] font-bold uppercase'>Method</p>
          <p className='font-bold'>{order.paymentMethod}</p>
      </div>

      <div className='text-sm'>
          <p className='text-gray-400 text-[10px] font-bold uppercase'>Total</p>
          <p className='text-lg font-black'>₹{order.amount}</p>
      </div>

      <select 
        value={order.status} 
        onChange={(e) => statusHandler(e, order._id)}
        className='p-2 text-xs font-bold border border-gray-200 rounded-lg bg-gray-50 outline-none'
      >
        <option value="Order Placed">Order Placed</option>
        <option value="Packing">Packing</option>
        <option value="Shipped">Shipped</option>
        <option value="Delivered">Delivered</option>
      </select>
    </div>
  )
}

export default OrderCard