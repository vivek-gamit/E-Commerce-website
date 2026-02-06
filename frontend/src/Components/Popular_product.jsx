import React, { useState } from 'react'
import heart from '../assets/images/line-md_heart.png'
import bag_1 from '../assets/images/component_2/bag_1.png'
import bag_2 from '../assets/images/component_2/bag_2.png'
import glasses_1 from '../assets/images/component_2/glasses_1.png'
import glasses_2 from '../assets/images/component_2/glasses_2.png'
import watch_1 from '../assets/images/component_2/watch_1.png'
import watch_2 from '../assets/images/component_2/watch_2.png'

const Popular_product = () => {

    const products = [
        {
            id: 1,
            name: "Taupe Bag",
            price: "4,999",
            mainImg: bag_1,
            hoverImg: bag_2,
        },
        {
            id: 2,
            name: "Taupe Bag",
            price: "4,999",
            mainImg: glasses_1,
            hoverImg: glasses_2,
        },
        {
            id: 3,
            name: "Taupe Bag",
            price: "4,999",
            mainImg: watch_1,
            hoverImg: watch_2,
        }
    ];

    return (
        <div className="px-10 py-16">
            <div className='font-serif italic text-3xl leading-none mb-10'>Popular Products</div>


            <div className='grid grid-cols-1 md:grid-cols-3 gap-6 w-full'>

                {products.map((item) => (
                    <div key={item.id} className='group flex flex-col cursor-pointer'>


                        <div className='relative overflow-hidden aspect-square bg-[#F3F3F3] rounded-sm'>


                            <div className='absolute top-4 left-4 z-20'>
                                <span className='bg-white px-3 py-1 font-serif italic text-xl shadow-sm'>Popular</span>
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
                                src={item.hoverImg} // This uses the hoverImg from the array above
                                className='absolute inset-0 w-full h-full object-cover transition-opacity duration-700 opacity-0 group-hover:opacity-100'
                                alt={`${item.name} hover`}
                            />

                            {/* 1. Use left-0 w-full + padding to create the 'gaps' on sides and bottom */}
                            <div className='absolute bottom-4 left-0 w-full px-4 h-[45px] opacity-0 group-hover:opacity-100 transition-all duration-500 ease-in-out'>

                                {/* 2. Using block and w-full makes it fill the space allowed by the parent's padding */}
                                <span className='h-[40px] w-full bg-white/90 font-serif text-xl shadow-md text-center flex items-center justify-center'>
                                    View Product
                                </span>
                            </div>
                        </div>

                        {/* TEXT CONTAINER */}
                        <div className='flex justify-between items-end mt-4 px-1'>
                            <h3 className='font-serif text-[22px] tracking-tight m-0 leading-none'>
                                {item.name}
                            </h3>
                            <p className="font-serif text-[22px] tracking-tighter leading-none m-0">
                                {item.price}₹ <span className="text-lg ml-1">IND</span>
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Popular_product