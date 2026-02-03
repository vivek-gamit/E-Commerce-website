import React from 'react'
import arrow from '../assets/images/tabler_arrow-up.png'

const Footer = () => {
  return (
    <div className='relative bg-black w-full h-full md:h-140 lg:h-140 sm:h-full sm:w-full'>
        <h1 className='absolute bottom-0 left-1/2 font-serif italic text-gray-400 opacity-30 pointer-events-none select-none z-0 -translate-x-1/2 text-[25rem] tracking-tighter scale-y-130' >Fashion</h1>

        <div className='flex flex-col sm:grid grid-cols-[2fr_2fr_2fr_3fr] text-white gap-14 my-10  mt-50 text-sm md:mx-8 mx-5'>

            <div className=' mt-10'>
                <p className='font-serif text-xl tracking-tight mb-4 scale-y-130 font-extralight'>Shop</p>
                <ul className='font-normal flex flex-col gap-2'>
                    <li>All Products</li>
                    <li>Collections</li>
                    <li>Top Wears</li>
                    <li>Eyewears</li>
                    <li>Wrist Watches</li>
                </ul>
            </div>

            <div className=' mt-10'>
                <p className='font-serif text-xl tracking-tighter mb-4 scale-y-130 font-extralight'>Company</p>
                <ul className='font-normal flex flex-col gap-2'>
                    <li>About</li>
                    <li>Articles</li>
                </ul>
            </div>

            <div className=' mt-10'>
                <p className='font-serif text-xl tracking-tighter mb-4 scale-y-130 font-extralight'>Shop</p>
                <ul className='font-normal flex flex-col gap-2'>
                    <li>FAQ</li>
                    <li>Contact Us</li>
                    <li>Return Policy</li>
                    <li>Privacy & Policy</li>
                </ul>
            </div>

            <div className=' mt-10'>
                <p className='font-serif text-xl tracking-tighter font-extralight text-white mb-4 scale-y-130'>Be the first to discover <br />the latest news</p>
                <div className='bg-white flex justify-between p-0.5'>
                    <input className='text-gray-700 font-bold font ms-2 focus:outline-none' type="text" placeholder='Enter Email Here' />
                    <img className='bg-black' src={arrow} alt="arrow" />
                </div>
            </div>
        </div>
    </div>
  )
}

export default Footer
