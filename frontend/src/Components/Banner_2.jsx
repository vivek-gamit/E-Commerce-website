import React from 'react'
import banner_2 from '../assets/images/banner_2.png'

const Banner_2 = () => {
  return (
    <div>
      <div className='relative w-full h-194.5 overflow-hidden'>
                      <img src={banner_2} alt='banner_2' />
      
                      <div className='absolute leading-none left-15 bottom-20 w-full'>
                          <h1 className='text-white instrument-serif-regular-italic text-3xl  md:text-4xl font-extralight leading-10'>Enjoy freedom to define your <br />fashion.</h1>
                          <p className='text-white instrument-serif-regular text-sm  md:text-xl'>Discover accessories crafted to endure, <br />uniting classic elegance with modern flair.</p>
                      </div>
      
                      {/* Parent Container using your centering logic */}
                      <div className='absolute leading-none right-15 bottom-22  w-100'>
      
                          {/* Use a button or a div with 'flex' for perfect centering */}
                          <button className='w-full bg-white text-black py-4 flex items-center justify-center 
                             instrument-serif-regular text-2xl uppercase shadow-sm
                             hover:bg-black hover:text-white transition-all duration-500 font-normal'>
                              SEE OUR VALUES
                          </button>
                      </div>
                  </div>
    </div>
  )
}

export default Banner_2
