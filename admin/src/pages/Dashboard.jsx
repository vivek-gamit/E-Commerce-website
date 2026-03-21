import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { DollarSign, Package, Users, ShoppingCart } from 'lucide-react'

const Dashboard = ({ token }) => {
  const [stats, setStats] = useState({
    totalRevenue: 0,
    totalOrders: 0,
    totalProducts: 0,
    totalCustomers: 0
  })

  const fetchStats = async () => {
    try {
      // In a real app, you'd have a specific /api/admin/stats route
      // For now, we fetch the lists and calculate lengths
      const prodRes = await axios.get("http://localhost:5000/api/product/list")
      const orderRes = await axios.post("http://localhost:5000/api/order/list", {}, { headers: { token } })
      
      const orders = orderRes.data.orders || []
      const revenue = orders.reduce((acc, item) => acc + item.amount, 0)

      setStats({
        totalRevenue: revenue,
        totalOrders: orders.length,
        totalProducts: prodRes.data.products.length,
        totalCustomers: [...new Set(orders.map(o => o.userId))].length // Unique User IDs
      })
    } catch (error) {
      console.error("Stats Error:", error)
    }
  }

  useEffect(() => { fetchStats() }, [token])

  const statCards = [
    { name: 'Total Revenue', value: `₹${stats.totalRevenue}`, icon: <DollarSign className='text-green-600' />, bg: 'bg-green-50' },
    { name: 'Total Orders', value: stats.totalOrders, icon: <ShoppingCart className='text-blue-600' />, bg: 'bg-blue-50' },
    { name: 'Inventory Items', value: stats.totalProducts, icon: <Package className='text-orange-600' />, bg: 'bg-orange-50' },
    { name: 'Active Customers', value: stats.totalCustomers, icon: <Users className='text-purple-600' />, bg: 'bg-purple-50' },
  ]

  return (
    <div className='space-y-8'>
      <div className='flex flex-col'>
        <h2 className='text-2xl font-bold tracking-tight'>Welcome back, Admin</h2>
        <p className='text-sm text-gray-400'>Here is what's happening with your store today.</p>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
        {statCards.map((card, index) => (
          <div key={index} className='bg-white p-6 rounded-2xl border border-gray-100 shadow-sm'>
            <div className={`w-12 h-12 ${card.bg} rounded-xl flex items-center justify-center mb-4`}>
              {card.icon}
            </div>
            <p className='text-xs font-bold text-gray-400 uppercase tracking-widest'>{card.name}</p>
            <h3 className='text-2xl font-black mt-1'>{card.value}</h3>
          </div>
        ))}
      </div>

      {/* Placeholder for a simple Recent Activity list */}
      <div className='bg-white p-6 rounded-2xl border border-gray-100'>
         <h3 className='font-bold mb-4'>Recent Performance</h3>
         <div className='h-48 w-full bg-gray-50 rounded-xl border-2 border-dashed border-gray-100 flex items-center justify-center text-gray-300 italic'>
            Real-time analytics chart will appear here as your sales grow.
         </div>
      </div>
    </div>
  )
}

export default Dashboard