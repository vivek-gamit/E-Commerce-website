import React from 'react'
import { motion } from 'framer-motion'
import img_1 from '../assets/images/hero_section/img_1.jpg'
import img_2 from '../assets/images/hero_section/img_2.jpg'
import img_3 from '../assets/images/hero_section/img_3.jpg'
import img_4 from '../assets/images/hero_section/img_4.jpg'
import img_5 from '../assets/images/hero_section/img_5.jpg'
import img_6 from '../assets/images/hero_section/img_6.jpg'

const Hero_section = () => {
    // Array to manage the unique offsets and rotations for the "boom" spread
    const cards = [
        { img: img_1, x: -480, y: 34, rotate: -9 },
        { img: img_2, x: -280, y: -10, rotate: -5 },
        { img: img_3, x: -65, y: 10, rotate: -2 },
        { img: img_4, x: 100, y: -10, rotate: 2 },
        { img: img_5, x: 290, y: 17, rotate: 6 },
        { img: img_6, x: 480, y: 33, rotate: 10 },
    ];

    return (
        <div className='w-full min-h-screen bg-white overflow-hidden flex flex-col items-center pt-20'>
            {/* Header Text */}
            <div className='text-center '>
                <h2 className='text-2xl instrument-sans mb-3'>The Ultimate</h2>
                <h2 className='text-6xl instrument-sans'>COLLECTIONS</h2>
            </div>



            {/* Cards Container */}
            <div className='relative w-full h-[450px] flex items-center justify-center'>
                {cards.map((card, index) => (
                    <motion.div
                        key={index}
                        initial={{ x: 0, y: 0, rotate: 0, opacity: 0 }} // Starts stacked
                        whileInView={{
                            x: card.x,
                            y: card.y,
                            rotate: card.rotate,
                            opacity: 10
                        }}
                        viewport={{ once: true }}
                        transition={{
                            type: "spring",
                            stiffness: 50,
                            damping: 20,
                            delay: 2 + index * 0.08
                        }}
                        /* The first card (index 0) gets the highest zIndex (e.g., 60).
                           Each card after it gets a lower value so it tucks behind.
                        */
                        style={{ zIndex: cards.length - index }}
                        className='absolute'
                    >
                        <img
                            src={card.img}
                            alt={`img_${index + 1}`}
                            className='h-[300px] w-[240px] object-cover rounded-[2rem]'
                        />
                    </motion.div>
                ))}
            </div>

            {/* Bottom Content */}
            <div className='text-center mt-2 px-4'>
                <h2 className='text-black max-w-2xl mx-auto leading-relaxed text-lg font-semibold'>
                    Fresh styles made for modern lifestyles. Easy fits, bold details, and effortless
                    comfort perfect for every day, every plan.
                </h2>

                <div className='mt-3'>
                    <button className='bg-black text-white px-13 py-2 rounded-full font-semibold hover:scale-105 transition-transform text-md'>
                        Show Now
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Hero_section