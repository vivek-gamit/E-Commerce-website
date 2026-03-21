import React from 'react'
import { NavLink } from 'react-router-dom'
import { LayoutDashboard, PlusCircle, ListOrdered, ShoppingBag } from 'lucide-react'

const Sidebar = () => {
  const menuItems = [
    { name: 'Dashboard', path: '/', icon: <LayoutDashboard size={20} /> },
    { name: 'Add Items', path: '/add', icon: <PlusCircle size={20} /> },
    { name: 'List Items', path: '/list', icon: <ListOrdered size={20} /> },
    { name: 'Orders', path: '/orders', icon: <ShoppingBag size={20} /> },
  ]

  return (
    <div className='w-[18%] min-h-screen border-r border-gray-100 bg-white pt-10 sticky top-20'>
      <div className='flex flex-col gap-2 pl-[15%]'>
        {menuItems.map((item) => (
          <NavLink 
            key={item.name}
            to={item.path} 
            className={({isActive}) => `flex items-center gap-3 px-4 py-3 rounded-l-2xl transition-all ${
              isActive 
              ? 'bg-black text-white shadow-lg shadow-gray-200' 
              : 'text-gray-400 hover:bg-gray-50 hover:text-black'
            }`}
          >
            {item.icon}
            <p className='hidden md:block text-sm font-bold tracking-tight'>{item.name}</p>
          </NavLink>
        ))}
      </div>
    </div>
  )
}

export default Sidebar