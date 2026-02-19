import React from 'react'
import heart from '../assets/images/line-md_heart.png'
import Taupe_Bag_1 from '../assets/images/product/Taupe_Bag_1.png'
import Taupe_Bag_2 from '../assets/images/product/Taupe_Bag_2.png'
import Taupe_Bag_3 from '../assets/images/product/Taupe_Bag_3.png'
import Taupe_Bag_4 from '../assets/images/product/Taupe_Bag_4.png'
import hover_img_1 from '../assets/images/product/hover_img_1.png'
import hover_img_2 from '../assets/images/product/hover_img_2.png'
import hover_img_3 from '../assets/images/product/hover_img_3.png'
import hover_img_4 from '../assets/images/product/hover_img_4.png'
import banner_1 from '../assets/images/banner_1.png'
import glasses_1 from '../assets/images/product/glasses_1.png'
import glasses_2 from '../assets/images/product/glassess_2.avif'
import glasses_3 from '../assets/images/product/glassess_3.avif'
import glasses_4 from '../assets/images/product/glassess_4.avif'
import glasses_5 from '../assets/images/product/glassess_5.avif'


const Product = () => {

    const products = [
        {
            id: 1,
            name: "Taupe Bag",
            price: "4,999",
            mainImg: Taupe_Bag_1,
            hoverImg: hover_img_1,
        },
        {
            id: 2,
            name: "Taupe Bag",
            price: "4,999",
            mainImg: Taupe_Bag_2,
            hoverImg: hover_img_2,
        },
        {
            id: 3,
            name: "Taupe Bag",
            price: "4,999",
            mainImg: Taupe_Bag_3,
            hoverImg: hover_img_3,
        },
        {
            id: 4,
            name: "Taupe Bag",
            price: "4,999",
            mainImg: Taupe_Bag_4,
            hoverImg: hover_img_4,
        },
        {
            id: 5,
            name: "Glasses",
            price: "4,999",
            mainImg: glasses_1,
            hoverImg: hover_img_4,
        },
                {
            id: 6,
            name: "Glasses",
            price: "4,999",
            mainImg: glasses_2,
            hoverImg: hover_img_4,
        },
                {
            id: 7,
            name: "Glasses",
            price: "4,999",
            mainImg: glasses_3,
            hoverImg: hover_img_4,
        },
                {
            id: 8,
            name: "Glasses",
            price: "4,999",
            mainImg: glasses_4,
            hoverImg: hover_img_4,
        },
                {
            id: 9,
            name: "Glasses",
            price: "4,999",
            mainImg: glasses_5,
            hoverImg: hover_img_4,
        }
    ];

    return (
        <div >

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
                                    src={item.hoverImg} // This uses the hoverImg from the array above
                                    className='absolute inset-0 w-full h-full object-cover transition-opacity duration-700 opacity-0 group-hover:opacity-100'
                                    alt={`${item.name} hover`}
                                />

                                {/* 1. Use left-0 w-full + padding to create the 'gaps' on sides and bottom */}
 
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


            <div className='relative w-full h-194.5 overflow-hidden'>
                <img src={banner_1} alt='banner_1' />

                <div className='absolute leading-none mb-10 left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 w-full'>
                    <p className='text-center text-white instrument-serif-regular-italic text-6xl  md:text-8xl font-extralight leading-[0.9]'>Define your style without <br />limits.</p>
                </div>

                {/* Parent Container using your centering logic */}
                <div className='absolute left-1/2 -translate-x-1/2 top-2/3 -translate-y-1/2 w-[20rem]'>

                    {/* Use a button or a div with 'flex' for perfect centering */}
                    <button className='w-full bg-white text-black py-4 flex items-center justify-center 
                                   instrument-serif-regular text-2xl uppercase tracking-tight shadow-sm
                                   hover:bg-black hover:text-white transition-all duration-500 font-normal'>
                        all Products
                    </button>
                </div>
            </div>
        </div>
    )

}

export default Product
