import React from 'react'
import Card_1 from '../assets/images/card/Card_1.png'
import Card_2 from '../assets/images/card/Card_2.png'
import Card_3 from '../assets/images/card/Card_3.png'
import Card_4 from '../assets/images/card/Card_4.png'
import Card_5 from '../assets/images/card/Card_5.png'
import Card_6 from '../assets/images/card/Card_6.png'
import Popular_product from './Popular_product'
import heart from '../assets/images/line-md_heart.png'
import img_1 from '../assets/images/Component_4/img_1.png'
import img_2 from '../assets/images/Component_4/img_2.png'
import img_3 from '../assets/images/Component_4/img_3.png'


const Sticky = () => {

    const products = [
        {
            id: 1,
            name: "Redefining Classic Elegance",
            price: "4,999",
            mainImg: img_1,
        },
        {
            id: 2,
            name: "Elevating Everyday Style",
            price: "4,999",
            mainImg: img_2,

        },
        {
            id: 3,
            name: "Behind the Atelier",
            price: "4,999",
            mainImg: img_3,
        }
    ];
   return (
        /* 1. Use relative here so children can be positioned against it */
        <div className='relative bg-gray-100 w-full'>

            {/* STICKY BACKGROUND TEXT */}
            <div className='sticky top-0 h-screen w-full flex items-center justify-center z-0'>
                <h2 className='instrument-serif-regular-italic text-5xl text-center px-4'>
                    What Fashion Consumers <br />are saying about Us
                </h2>
            </div>

            {/* FLOATING CARDS SECTION */}
            {/* Added a negative margin-top so cards start appearing while text is visible */}
            <div className='relative z-10 w-full px-10 flex flex-col items-center -mt-[50vh] pb-[20vh]'>
                <img src={Card_1} alt="Card_1" className='w-85 h-60 object-contain mb-20 mt-100' />

                <div className='flex justify-around w-full max-w-6xl mb-20'>
                    <img src={Card_2} alt="Card_2" className='w-85 h-60 mt-20 mr-100' />
                    <img src={Card_3} alt="Card_3" className='w-85 h-60 mt-20' />
                </div>

                <div className='flex justify-around w-full max-w-6xl mb-20'>
                    <img src={Card_4} alt="Card_4" className='w-85 h-60 mt-20' />
                    <img src={Card_5} alt="Card_5" className='w-85 h-60 mt-20' />
                </div>

                <img src={Card_6} alt="Card_6" className='w-85 h-60 mb-20 mt-20' />
            </div>

            {/* POPULAR PRODUCTS SECTION */}
            {/* CHANGE: Changed 'absolute' to 'relative' and added 'z-20' */}
            <div className='relative z-20 bg-white w-full'>
                <div className="px-10 py-16">
                    <div className='instrument-serif-regular-italic text-4xl leading-none mb-10'>Popular Products</div>

                    <div className='grid grid-cols-1 md:grid-cols-3 gap-6 w-full'>
                        {products.map((item) => (
                            <div key={item.id} className='group flex flex-col cursor-pointer'>
                                <div className='relative overflow-hidden aspect-square bg-[#F3F3F3]'>
                                    <div className='absolute top-4 left-4 z-20'>
                                        <span className='bg-white px-3 py-1 instrument-serif-regular text-xl shadow-sm'>Brand Trust</span>
                                    </div>
                                    <img
                                        src={item.mainImg}
                                        className='absolute inset-0 w-full h-full object-cover transition-all duration-1000 opacity-100 group-hover:scale-110 ease-in-out'
                                        alt={item.name}
                                    />
                                </div>
                                <div className='flex justify-between items-end mt-4 px-1'>
                                    <h3 className='instrument-serif-regular text-[24px] m-0 leading-none'>
                                        {item.name}
                                    </h3>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Sticky