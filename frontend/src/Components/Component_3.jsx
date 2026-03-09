import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion' // Added AnimatePresence
import heart from '../assets/images/line-md_heart.png'

import { useNavigate } from 'react-router-dom'
import { allProducts } from '../assets/assets'

const Component_3 = () => {
    const [activeTab, setActiveTab] = useState('Featured');

   
    const filteredProducts = allProducts.filter(item => item.categories === activeTab);
    const navigate = useNavigate();

    return (
        <div className="px-10 py-16 overflow-hidden">
            {/* Tab Navigation */}
            <div className="flex gap-10 mb-10 border-b border-gray-100">
                {['Featured', 'Popular', 'Trendy'].map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`relative pb-2 instrument-serif-regular-italic text-4xl transition-all ${
                            activeTab === tab ? 'text-black' : 'text-gray-400'
                        }`}
                    >
                        {tab}
                       
                        {activeTab === tab && (
                            <motion.div 
                                layoutId="activeTab"
                                className="absolute bottom-0 left-0 right-0 h-0.5 bg-black"
                            />
                        )}
                    </button>
                ))}
            </div>

            
            <motion.div 
                layout
                className='grid grid-cols-1 md:grid-cols-3 gap-8 w-full'
            >
                <AnimatePresence mode='popLayout'>
                    {filteredProducts.slice(0,3).map((item) => (
                        <motion.div
                            layout // This makes the card "slide" to its new position
                            key={item.id}
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            transition={{ 
                                duration: 0.5, 
                                ease: [0.43, 0.13, 0.23, 0.96] // Smooth luxury curve
                            }}
                            className='group flex flex-col cursor-pointer'
                        >
                            <div className='relative overflow-hidden aspect-square bg-[#F3F3F3] rounded-sm'>
                                {/* Badge */}
                                <div className='absolute top-4 left-4 z-20'>
                                    <span className='bg-white px-3 py-1 instrument-serif-regular text-lg shadow-sm'>
                                        {item.categories}
                                    </span>
                                </div>
                                
                                <img className='absolute top-4 right-4 z-20 w-8 h-8 object-contain bg-white rounded-full p-1.5 shadow-sm' src={heart} alt="Favorite" />
                                
                                {/* Image Logic */}
                                <img src={item.mainImg} className='absolute inset-0 w-full h-full object-cover transition-opacity duration-700 opacity-100 group-hover:opacity-0' alt={item.name} />
                                <img onClick={()=> {navigate(`/product_Dasbord/${item.id}`)}} src={item.hoverImg} className='absolute inset-0 w-full h-full object-cover transition-opacity duration-700 opacity-0 group-hover:opacity-100' alt={`${item.name} hover`} />
                                
                                {/* View Product Button */}
                                <div className='absolute bottom-4 left-0 w-full px-4 h-11.25 opacity-0 group-hover:opacity-100 transition-all duration-500 ease-in-out'>
                                    <span onClick={()=> {navigate(`/product/${item.category}`)}} className='h-10 w-full bg-white/90 font-sans text-xl shadow-md text-center flex items-center justify-center'>
                                        View Product
                                    </span>
                                </div>
                            </div>

                            {/* Info Section */}
                            <div className='flex justify-between items-end mt-4 px-1'>
                                <h3 className='instrument-serif-regular text-[22px] m-0 leading-none'>{item.name}</h3>
                                <p className="instrument-serif-regular text-[22px] leading-none m-0">{item.price}₹ IND</p>
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </motion.div>
        </div>
    )
}

export default Component_3