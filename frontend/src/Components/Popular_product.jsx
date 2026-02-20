import React, { useState } from 'react'
import heart from '../assets/images/line-md_heart.png'
import {products} from '../assets/assets'
import { useNavigate } from 'react-router-dom'

const Popular_product = () => {

    const navigate = useNavigate();

    return (
        <div className="px-10 py-16">
            <div className='instrument-serif-regular-italic text-4xl leading-none mb-10'>Popular Products</div>


            <div className='grid grid-cols-1 md:grid-cols-3 gap-6 w-full'>

                {products.map((item) => (
                    <div key={item.id} className='group flex flex-col cursor-pointer'>


                        <div className='relative overflow-hidden aspect-square bg-[#F3F3F3] rounded-sm'>


                            <div className='absolute top-4 left-4 z-20'>
                                <span className='bg-white px-3 py-1 instrument-serif-regular text-xl shadow-sm'>Popular</span>
                            </div>


                            <img
                                className='absolute top-4 right-4 z-20 w-8 h-8 object-contain bg-white rounded-full p-1.5 shadow-sm'
                                src={heart}
                                alt="Favorite"
                            />


                            <img
    
                                src={item.mainImg}
                                className='absolute inset-0 w-full h-full object-cover transition-opacity duration-700 opacity-100 group-hover:opacity-0'
                                alt={item.name}
                            />

                            {/* HOVER IMAGE (Fades in on hover) */}
                            <img
                                onClick={()=> {navigate(`/product_Dasbord/${item.id}`)}}
                                src={item.hoverImg} // This uses the hoverImg from the array above
                                className='absolute inset-0 w-full h-full object-cover transition-opacity duration-700 opacity-0 group-hover:opacity-100'
                                alt={`${item.name} hover`}
                            />

                            {/* 1. Use left-0 w-full + padding to create the 'gaps' on sides and bottom */}
                            <div className='absolute bottom-4 left-0 w-full px-4 h-11.25 opacity-0 group-hover:opacity-100 transition-all duration-500 ease-in-out'>

                                {/* 2. Using block and w-full makes it fill the space allowed by the parent's padding */}
                                <span  onClick={()=> {navigate(`/product/${item.category}`)}} className='h-10 w-full bg-white/90 font-sans text-xl shadow-md text-center flex items-center justify-center'>
                                    View Product
                                </span>
                            </div>
                        </div>

                        {/* TEXT CONTAINER */}
                        <div className='flex justify-between items-end mt-4 px-1'>
                            <h3 className='instrument-serif-regular text-[24px]  m-0 leading-none'>
                                {item.name}
                            </h3>
                            <p className="instrument-serif-regular text-[22px] leading-none m-0">
                                {item.price}₹ <span className="text-2xl ml-1 instrument-serif-regular">IND</span>
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Popular_product