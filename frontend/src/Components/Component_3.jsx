import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion' // Added AnimatePresence
import heart from '../assets/images/line-md_heart.png'
// Category 1 & 2 Imports (Component_3 folder)
import Hat_1 from '../assets/images/component_3/Hat_1.png'
import Hat_2 from '../assets/images/component_3/Hat_2.png'
import glasses_1 from '../assets/images/component_3/glasses_1.png'
import glasses_2 from '../assets/images/component_3/glasses_2.png'
import watch_1 from '../assets/images/component_3/watch_1.png'
import watch_2 from '../assets/images/component_3/watch_2.png'
import Hat_3 from '../assets/images/component_3/Hat_3.png'
import Hat_4 from '../assets/images/component_3/Hat_4.png'
import watch_3 from '../assets/images/component_3/watch_3.png'
import watch_4 from '../assets/images/component_3/watch_4.png'

// Trendy Category Imports (Component_2 folder)

import bag_1 from '../assets/images/component_2/bag_1.png'
import bag_2 from '../assets/images/component_2/bag_2.png'
import glasses_comp2_1 from '../assets/images/component_2/glasses_1.png'
import glasses_comp2_2 from '../assets/images/component_2/glasses_2.png'
import watch_comp2_1 from '../assets/images/component_2/watch_1.png'
import watch_comp2_2 from '../assets/images/component_2/watch_2.png'

const Component_3 = () => {
    const [activeTab, setActiveTab] = useState('Featured');

    const products = [
        { id: 1, name: "Taupe Bag", price: "4,999", mainImg: Hat_1, hoverImg: Hat_2, categories: "Featured" },
        { id: 2, name: "Taupe Bag", price: "4,999", mainImg: glasses_1, hoverImg: glasses_2, categories: "Featured" },
        { id: 3, name: "Taupe Bag", price: "4,999", mainImg: watch_1, hoverImg: watch_2, categories: "Featured" },
        { id: 4, name: "Classic Hat", price: "2,499", mainImg: Hat_3, hoverImg: Hat_4, categories: "Popular" },
        { id: 5, name: "Luxury Watch", price: "6,999", mainImg: watch_3, hoverImg: watch_4, categories: "Popular" },
        { id: 6, name: "Taupe Bag", price: "4,999", mainImg: bag_1, hoverImg: bag_2, categories: "Trendy" },
        { id: 7, name: "Taupe Bag", price: "4,999", mainImg: glasses_comp2_1, hoverImg: glasses_comp2_2, categories: "Trendy" },
        { id: 8, name: "Taupe Bag", price: "4,999", mainImg: watch_comp2_1, hoverImg: watch_comp2_2, categories: "Trendy" }
    ];

    // Logic: If Popular is clicked, we can manually reorder or just let layout prop handle the shift
    const filteredProducts = products.filter(item => item.categories === activeTab);

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
                        {/* Underline animation for premium feel */}
                        {activeTab === tab && (
                            <motion.div 
                                layoutId="activeTab"
                                className="absolute bottom-0 left-0 right-0 h-[2px] bg-black"
                            />
                        )}
                    </button>
                ))}
            </div>

            {/* Product Grid with Layout Animations */}
            <motion.div 
                layout
                className='grid grid-cols-1 md:grid-cols-3 gap-8 w-full'
            >
                <AnimatePresence mode='popLayout'>
                    {filteredProducts.map((item) => (
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
                                <img src={item.hoverImg} className='absolute inset-0 w-full h-full object-cover transition-opacity duration-700 opacity-0 group-hover:opacity-100' alt={`${item.name} hover`} />
                                
                                {/* View Product Button */}
                                <div className='absolute bottom-4 left-0 w-full px-4 h-11.25 opacity-0 group-hover:opacity-100 transition-all duration-500 ease-in-out'>
                                    <span className='h-10 w-full bg-white/90 font-sans text-xl shadow-md text-center flex items-center justify-center'>
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