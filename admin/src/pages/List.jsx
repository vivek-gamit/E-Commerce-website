import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { Trash2, ExternalLink } from 'lucide-react'

const List = ({ token }) => {
  const [list, setList] = useState([])
  
  const fetchList = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/product/list")
      console.log("Full API Response:", response.data); // 👈 What does this say?

      if (response.data.success) {
        // Check if 'products' exists in the response
        if (response.data.products) {
          setList(response.data.products);
        } else {
          console.error("The key 'products' is missing in the API response!");
        }
      } else {
        toast.error(response.data.message)
      }
    } catch (error) {
      console.error("Axios Error:", error);
      toast.error("Could not connect to server")
    }
  }
  console.log(list);


  const removeProduct = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        const response = await axios.post("http://localhost:3000/api/product/delete", { id }, { headers: { token } })

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
          {list?.length || 0} Items Total
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

        {list && list.length > 0 ? (
          list.map((item, index) => {
            // Safety Check: If item or item.images is missing, skip rendering this row
            if (!item || !item.images) return null;

            return (
              <div
                key={item._id || index}
                className='grid grid-cols-[1.5fr_3fr_1fr] md:grid-cols-[1fr_3fr_2fr_1fr_1fr] items-center gap-4 py-4 px-6 border-b border-gray-50 hover:bg-gray-50/50 transition-all'
              >
                {/* Product Image with Double Guard */}
                <div className='w-14 h-18 bg-gray-100 rounded-lg overflow-hidden flex items-center justify-center border border-gray-100'>
                  {item.images && item.images.length > 0 ? (
                    <img className='w-full h-full object-cover' src={item.images[0]} alt={item.name} />
                  ) : (
                    <span className='text-[8px] text-gray-400 uppercase font-bold'>No Image</span>
                  )}
                </div>

                {/* Name - Safe Access */}
                <div>
                  <p className='text-sm font-bold text-zinc-800 truncate pr-4 uppercase tracking-tight'>
                    {item.name || "Untitled Product"}
                  </p>
                  <p className='md:hidden text-[10px] text-gray-400 font-bold uppercase'>
                    {item.category || "General"}
                  </p>
                </div>

                {/* Category */}
                <p className='hidden md:block text-[11px] text-gray-400 font-bold uppercase tracking-widest'>
                  {item.category} <span className='mx-1 text-gray-200'>|</span> {item.subCategory}
                </p>

                {/* Price - Safe Access */}
                <p className='text-sm font-black text-black'>
                  ₹{(item.price || 0).toLocaleString()}
                </p>

                {/* Delete Icon */}
                <div className='flex justify-center'>
                  <button
                    onClick={() => removeProduct(item._id)}
                    className='p-2.5 text-gray-300 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all'
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            );
          })
        ) : (
          <div className='flex flex-col items-center justify-center py-32 border-2 border-dashed border-gray-100 rounded-3xl mt-4'>
            {/* ... Empty state content ... */}
          </div>
        )}
      </div>
    </div>
  )
}

export default List