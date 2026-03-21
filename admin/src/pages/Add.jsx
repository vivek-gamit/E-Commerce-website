import React, { useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { Upload } from 'lucide-react'

const Add = ({ token }) => {
  // State for Images
  const [image1, setImage1] = useState(false)
  const [image2, setImage2] = useState(false)
  const [image3, setImage3] = useState(false)
  const [image4, setImage4] = useState(false)

  // State for Text Inputs
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [price, setPrice] = useState("")
  const [category, setCategory] = useState("Men")
  const [subCategory, setSubCategory] = useState("Topwear")
  const [bestSeller, setBestSeller] = useState(false)
  const [sizes, setSizes] = useState([])

  const onSubmithandler = async (e) => {
    e.preventDefault();
    try {
        const formData = new FormData();
        formData.append("name", name);
        formData.append("description", description);
        formData.append("price", price);
        formData.append("category", category);
        formData.append("subCategory", subCategory);
        formData.append("bestSeller", bestSeller);
        formData.append("sizes", JSON.stringify(sizes));

        // Append images if they exist
        image1 && formData.append("images", image1);
        image2 && formData.append("images", image2);
        image3 && formData.append("images", image3);
        image4 && formData.append("images", image4);

        // Note: I used port 3000 as per your previous message
        const response = await axios.post("http://localhost:3000/api/product/add", formData, { headers: { token } });

        if (response.data.success) {
            toast.success(response.data.message);
            
            // ✅ CORRECT RESET LOGIC
            setName('');
            setDescription('');
            setPrice('');
            setBestSeller(false);
            setSizes([]);
            setImage1(false);
            setImage2(false);
            setImage3(false);
            setImage4(false);

        } else {
            toast.error(response.data.message);
        }
    } catch (error) {
        toast.error(error.response?.data?.message || error.message);
    }
  }

  return (
    <form onSubmit={onSubmithandler} className='flex flex-col w-full items-start gap-3 bg-white p-8 rounded-2xl border border-gray-100 shadow-sm'>
      
      {/* --- IMAGE UPLOAD SECTION --- */}
      <div>
        <p className='mb-2 text-sm font-bold text-gray-700 uppercase tracking-widest'>Upload Images</p>
        <div className='flex gap-2'>
          {[ {img: image1, set: setImage1}, {img: image2, set: setImage2}, {img: image3, set: setImage3}, {img: image4, set: setImage4} ].map((item, index) => (
            <label key={index} htmlFor={`image${index+1}`}>
                <div className='w-24 h-32 border-2 border-dashed border-gray-200 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 transition-all rounded-lg overflow-hidden relative'>
                    {item.img ? (
                        <img className='w-full h-full object-cover' src={URL.createObjectURL(item.img)} alt="" />
                    ) : (
                        <Upload size={20} className='text-gray-300' />
                    )}
                </div>
                <input onChange={(e) => item.set(e.target.files[0])} type="file" id={`image${index+1}`} hidden />
            </label>
          ))}
        </div>
        <p className='text-[10px] text-gray-400 mt-2 uppercase font-semibold'>Slot 1: Main Image | Slot 2: Hover Image</p>
      </div>

      {/* --- TEXT INPUTS --- */}
      <div className='w-full mt-4'>
        <p className='mb-2 text-xs font-bold uppercase'>Product Name</p>
        <input onChange={(e)=>setName(e.target.value)} value={name} className='w-full max-w-[500px] px-3 py-2 border border-gray-100 rounded-lg outline-none focus:border-black bg-gray-50/50' type="text" placeholder='Type here' required />
      </div>

      <div className='w-full'>
        <p className='mb-2 text-xs font-bold uppercase'>Description</p>
        <textarea onChange={(e)=>setDescription(e.target.value)} value={description} className='w-full max-w-[500px] px-3 py-2 border border-gray-100 rounded-lg outline-none focus:border-black bg-gray-50/50 min-h-[100px]' placeholder='Write content here' required />
      </div>

      <div className='flex flex-col sm:flex-row gap-8 w-full'>
        <div className='flex-1 sm:max-w-[150px]'>
            <p className='mb-2 text-xs font-bold uppercase'>Category</p>
            <select onChange={(e)=>setCategory(e.target.value)} value={category} className='w-full px-3 py-2 border border-gray-100 rounded-lg bg-gray-50/50'>
                <option value="Men">Men</option>
                <option value="Women">Women</option>
                <option value="Kids">Kids</option>
            </select>
        </div>
        <div className='flex-1 sm:max-w-[150px]'>
            <p className='mb-2 text-xs font-bold uppercase'>Sub Category</p>
            <select onChange={(e)=>setSubCategory(e.target.value)} value={subCategory} className='w-full px-3 py-2 border border-gray-100 rounded-lg bg-gray-50/50'>
                <option value="Topwear">Topwear</option>
                <option value="Bottomwear">Bottomwear</option>
                <option value="Winterwear">Winterwear</option>
            </select>
        </div>
        <div>
            <p className='mb-2 text-xs font-bold uppercase'>Price</p>
            <input onChange={(e)=>setPrice(e.target.value)} value={price} className='w-full px-3 py-2 border border-gray-100 rounded-lg sm:w-[120px] bg-gray-50/50' type="Number" placeholder='2500' required />
        </div>
      </div>

      {/* --- SIZE SELECTION --- */}
      <div className='mt-2'>
        <p className='mb-2 text-xs font-bold uppercase'>Product Sizes</p>
        <div className='flex gap-3'>
            {['S', 'M', 'L', 'XL', 'XXL'].map(size => (
                <div key={size} onClick={() => setSizes(prev => prev.includes(size) ? prev.filter(item => item !== size) : [...prev, size])}>
                    <p className={`${sizes.includes(size) ? 'bg-black text-white border-black' : 'bg-gray-50 text-gray-400 border-gray-100'} px-4 py-2 cursor-pointer border rounded-lg text-xs font-bold transition-all hover:border-black`}>
                        {size}
                    </p>
                </div>
            ))}
        </div>
      </div>

      {/* --- BEST SELLER CHECKBOX --- */}
      <div className='flex gap-2 mt-4 items-center bg-gray-50 px-4 py-2 rounded-lg border border-gray-100 cursor-pointer' onClick={() => setBestSeller(prev => !prev)}>
        <input readOnly checked={bestSeller} type="checkbox" id='bestseller' className='w-4 h-4 accent-black' />
        <label className='text-xs font-bold uppercase cursor-pointer' htmlFor="bestseller">Add to Bestseller</label>
      </div>

      <button type='submit' className='w-full max-w-[500px] py-4 mt-6 bg-black text-white font-bold uppercase tracking-[0.2em] rounded-xl hover:bg-zinc-800 transition-all active:scale-95 shadow-lg shadow-gray-200'>
        Add Product to Inventory
      </button>

    </form>
  )
}

export default Add