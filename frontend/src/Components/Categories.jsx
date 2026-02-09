import React, { useState } from 'react' // Added useState
import { categories } from '../assets/assets'
import arrow from '../assets/images/tabler_arrow-up.png'

const Categories = () => {
    
    const [activeIndex, setActiveIndex] = useState(0);

    return (
        <div className="px-10 py-16">
            <div className='flex justify-between mb-10 items-baseline items-end'>
                <h2  className='instrument-serif-regular-italic text-4xl leading-none'>Shop By Categories</h2>
                <p className='text-xs md:text-sm uppercase tracking-widest text-right leading-relaxed'>
                    ESSENTIAL SILHOUETTES, NATURAL TEXTURES, <br /> AND EFFORTLESS LAYERING FOR EVERY SEASON
                </p>
            </div>

           
            <div 
                onMouseLeave={() => setActiveIndex(0)} 
                className='flex flex-col lg:flex-row gap-3 h-[600px] lg:h-[766px] w-full'
            >
                {categories.map((item, index) => (
                    <div
                        key={item.id}
                        onMouseEnter={() => setActiveIndex(index)} 
                       className={`relative transition-all duration-700 ease-in-out cursor-pointer flex flex-col overflow-hidden
                                   ${activeIndex === index ? 'flex-[1.5]' : 'flex-1'}`}
                    >
                        {/* IMAGE CONTAINER */}
                        <div className='relative flex-grow overflow-hidden rounded-3xl mb-4'>
                            <img
                                className='absolute inset-0 w-full h-full object-cover transition-transform duration-700' 
                                src={item.image}
                                alt={item.name}
                            />
                        </div>

                        {/* BUTTONS CONTAINER */}
                        <div className="flex items-center gap-2 h-12">

                          
                            <div className={`relative overflow-hidden transition-all duration-700 ease-in-out h-full border rounded-full shadow-sm
                                            ${activeIndex === index 
                                                ? 'w-59 bg-black border-black text-white' 
                                                : 'w-13.5 bg-white border-gray-200 text-black'}`}>

                                <span className={`absolute left-5 top-1/2 -translate-y-1/2 font-medium text-sm transition-all duration-700 ease-out whitespace-nowrap
                                               ${activeIndex === index ? 'translate-x-0 opacity-100' : '-translate-x-20 opacity-0'}`}>
                                    View All
                                </span>

                                <div className={`absolute  top-1/2 right-1 -translate-y-1/2 w-10.5 h-10.5 rounded-full flex items-center justify-center transition-all duration-700
                                                ${activeIndex === index ? 'bg-white' : 'bg-black'}`}>
                                    <img
                                        src={arrow}
                                        alt=""
                                        className={`w-5 h-5 transition-transform duration-500 
                                                   ${activeIndex === index ? '-rotate-45 invert' : 'rotate-0'}`}
                                    />
                                </div>
                            </div>

                   
                            <div className={`overflow-hidden transition-all duration-700 ease-in-out h-full flex items-center justify-center border rounded-full px-5 shadow-sm
                                            ${activeIndex === index 
                                                ? 'w-36.25 border-black' 
                                                : 'w-50 bg-white border-gray-200'}`}>
                                <span className="text-sm font-medium whitespace-nowrap text-center">
                                    {item.name}
                                </span>
                            </div>
                        </div> 
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Categories