import React from 'react'
import heart from '../assets/images/line-md_heart.png'
import banner_1 from '../assets/images/banner_1.png'

import { useNavigate, useParams } from 'react-router-dom'
import { allProducts } from '../assets/assets'

const Product = () => {
    const navigate = useNavigate()
    const { category } = useParams();

    const displayProduct = category ? allProducts.filter(item => item.category === category) : allProducts;
    
    return (
        <div >
            <div className="px-10 py-16">
                <div className='instrument-serif-regular-italic text-4xl leading-none mb-10'>Popular Products</div>

                <div className='grid grid-cols-1 md:grid-cols-3 gap-6 w-full'>
                    {displayProduct.map((item) => {
                        // Create a safe ID variable to use throughout this card
                        const safeId = item._id || item.id;

                        return (
                            <div 
                                key={safeId} // FIXED: Now uses the safe ID
                                className='group flex flex-col cursor-pointer'
                            >
                                <div className='relative overflow-hidden aspect-square bg-[#F3F3F3] rounded-sm'>
                                    
                                    <div className='absolute top-4 left-4 z-20'>
                                        <span className='bg-white px-3 py-1 instrument-serif-regular text-xl shadow-sm'>Popular</span>
                                    </div>

                                    <img
                                        className='absolute top-4 right-4 z-20 w-8 h-8 object-contain bg-white rounded-full p-1.5 shadow-sm hover:scale-110 transition-transform'
                                        src={heart}
                                        alt="Favorite"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            console.log("Added to favorites:", safeId); // FIXED
                                        }}
                                    />

                                    <img
                                        src={item.mainImg}
                                        className='absolute inset-0 w-full h-full object-cover transition-opacity duration-700 opacity-100 group-hover:opacity-0'
                                        alt={item.name}
                                    />

                                    {/* HOVER IMAGE */}
                                    <img
                                        // FIXED: Now uses the safe ID for navigation
                                        onClick={() => navigate(`/product_Dasbord/${safeId}`)} 
                                        src={item.hoverImg} 
                                        className='absolute inset-0 w-full h-full object-cover transition-opacity duration-700 opacity-0 group-hover:opacity-100'
                                        alt={`${item.name} hover`}
                                    />
                                </div>

                                {/* TEXT CONTAINER */}
                                <div className='flex justify-between items-end mt-4 px-1'>
                                    <h3 className='instrument-serif-regular text-[24px] m-0 leading-none truncate pr-4'>
                                        {item.name}
                                    </h3>
                                    <p className="instrument-serif-regular text-[22px] leading-none m-0 whitespace-nowrap">
                                        {item.price}₹ <span className="text-2xl ml-1 instrument-serif-regular">IND</span>
                                    </p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            <div className='relative w-full h-194.5 overflow-hidden'>
                <img src={banner_1} alt='banner_1' className='w-full h-full object-cover' />

                <div className='absolute leading-none mb-10 left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 w-full'>
                    <p className='text-center text-white instrument-serif-regular-italic text-6xl md:text-8xl font-extralight leading-[0.9]'>Define your style without <br />limits.</p>
                </div>

                <div className='absolute left-1/2 -translate-x-1/2 top-2/3 -translate-y-1/2 w-[20rem]'>
                    <button 
                        onClick={() => navigate('/product')}
                        className='w-full bg-white text-black py-4 flex items-center justify-center 
                                   instrument-serif-regular text-2xl uppercase tracking-tight shadow-sm
                                   hover:bg-black hover:text-white transition-all duration-500 font-normal'>
                        All Products
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Product