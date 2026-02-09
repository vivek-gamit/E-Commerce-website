import React from 'react'
import banner_1 from '../assets/images/banner_1.png'



const Banner_1 = () => {
    return (
        <div>
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

export default Banner_1
