import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { Trash2, ExternalLink } from 'lucide-react'

const List = ({ token }) => {
  const [list, setList] = useState([])

  const fetchList = async () => {
    try {
      // Replace with your actual backend URL
      const response = await axios.get("http://localhost:5000/api/product/list")
      if (response.data.success) {
        setList(response.data.products);
      } else {
        toast.error(response.data.message)
      }
    } catch (error) {
      console.error(error)
      toast.error(error.message)
    }
  }

  const removeProduct = async (id) => {
    if(window.confirm("Are you sure you want to delete this product?")) {
        try {
            const response = await axios.post("http://localhost:5000/api/product/remove", { id }, { headers: { token } })
            
            if (response.data.success) {
              toast.success(response.data.message)
              await fetchList(); // Refresh the list
            } else {
              toast.error(response.data.message)
            }
          } catch (error) {
            toast.error(error.message)
          }
    }
  }

  useEffect(() => {
    fetchList()
  }, [])

  return (
    <div className='bg-white p-8 rounded-2xl border border-gray-100 shadow-sm'>
      <div className='flex justify-between items-center mb-6'>
          <h2 className='text-xl font-bold tracking-tight text-black uppercase'>Current Inventory</h2>
          <p className='text-xs font-bold text-gray-400 bg-gray-50 px-3 py-1 rounded-full uppercase tracking-widest'>
            {list.length} Items Total
          </p>
      </div>

      <div className='flex flex-col gap-2'>
        {/* --- Table Header --- */}
        <div className='hidden md:grid grid-cols-[1fr_3fr_2fr_1fr_1fr] items-center py-3 px-4 bg-black text-white rounded-lg text-xs font-bold uppercase tracking-widest mb-2'>
          <span>Image</span>
          <span>Name</span>
          <span>Category</span>
          <span>Price</span>
          <span className='text-center'>Action</span>
        </div>

        {/* --- Product List --- */}
        {list.length > 0 ? (
          list.map((item, index) => (
            <div 
                key={index} 
                className='grid grid-cols-[1fr_3fr_1fr] md:grid-cols-[1fr_3fr_2fr_1fr_1fr] items-center gap-2 py-3 px-4 border border-gray-100 rounded-xl hover:bg-gray-50 transition-all group'
            >
              {/* Product Image */}
              <img className='w-12 h-16 object-cover rounded-md bg-gray-100' src={item.images[0]} alt={item.name} />
              
              {/* Name */}
              <p className='text-sm font-semibold text-zinc-800 truncate pr-4'>{item.name}</p>
              
              {/* Category (Hidden on mobile) */}
              <p className='hidden md:block text-xs text-gray-500 font-medium'>{item.category} / {item.subCategory}</p>
              
              {/* Price */}
              <p className='text-sm font-bold text-black'>₹{item.price}</p>
              
              {/* Delete Icon */}
              <div className='flex justify-center'>
                <button 
                    onClick={() => removeProduct(item._id)} 
                    className='p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-full transition-all'
                >
                    <Trash2 size={18} />
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className='text-center py-20 text-gray-400 font-medium'>
            No products found in inventory. Start by adding some!
          </div>
        )}
      </div>
    </div>
  )
}

export default List