import React from 'react'
import arrow from '../assets/images/tabler_arrow-up.png'

const Footer = () => {
  return (
    <div className='relative bg-black w-full h-full md:h-140 lg:h-140 sm:h-full sm:w-full px-3 '>
        <h1 className='absolute bottom-0 left-1/2 -translate-x-1/2 w-full text-center z-0 pointer-events-none select-none opacity-30 text-gray-400 instrument-serif-regular-italic text-[30rem] leading-none'>
  Fashion
</h1>

        <div className='flex flex-col sm:grid grid-cols-[2fr_2fr_2fr_3fr] text-white gap-14 my-10  mt-50 text-sm md:mx-8 mx-5'>

            <div className=' mt-10'>
                <p className='instrument-serif-regular text-2xl mb-4'>Shop</p>
                <ul className='font-normal flex flex-col gap-2 text-xl'>
                    <li>All Products</li>
                    <li>Collections</li>
                    <li>Top Wears</li>
                    <li>Eyewears</li>
                    <li>Wrist Watches</li>
                </ul>
            </div>

            <div className=' mt-10'>
                <p className='instrument-serif-regular text-2xl mb-4 '>Company</p>
                <ul className='font-normal flex flex-col gap-2 text-xl'>
                    <li>About</li>
                    <li>Articles</li>
                </ul>
            </div>

            <div className=' mt-10'>
                <p className='instrument-serif-regular text-2xl mb-4'>Shop</p>
                <ul className='font-normal flex flex-col gap-2 text-xl'>
                    <li>FAQ</li>
                    <li>Contact Us</li>
                    <li>Return Policy</li>
                    <li>Privacy & Policy</li>
                </ul>
            </div>

            <div className=' mt-10'>
                <p className='instrument-serif-regular text-3xl font-extralight text-white mb-4'>Be the first to discover <br />the latest news</p>
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
