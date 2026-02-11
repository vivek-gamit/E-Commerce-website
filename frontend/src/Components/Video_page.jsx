import React from 'react'
import fashion_v1 from '../assets/video_1.mp4'

const Video_page = () => {
  return (
    // Added flex, items-center, and justify-center to center the content
    <div className='relative bg-gray-100 w-full h-screen overflow-hidden group'>
      
      <div className='relative h-screen flex items-center justify-center'>
        <video 
          src={fashion_v1} 
          className='h-58.75 w-auto object-cover transition-all ease-in-out duration-3000 group-hover:w-auto group-hover:h-full group-hover:scale-[1.5]'
          autoPlay
          muted
          loop
          playsInline 
        />
      </div>

      <div className='absolute text-white flex justify-around top-1/2 w-full items-center text-bold text-4xl font-melodrama'>
        <h2>FASHION</h2>
        <h2>FOR EVERYONE</h2>
      </div>

    </div>
  )
}

export default Video_page