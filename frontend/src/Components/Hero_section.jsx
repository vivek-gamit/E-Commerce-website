import React from 'react'
import { motion } from 'framer-motion'
import img_1 from '../assets/images/hero_section/img_1.webp'
import img_2 from '../assets/images/hero_section/img_2.webp'
import img_3 from '../assets/images/hero_section/img_3.webp'
import img_4 from '../assets/images/hero_section/img_4.webp'
import img_5 from '../assets/images/hero_section/img_5.webp'
import img_6 from '../assets/images/hero_section/img_6.webp'

const Hero_section = () => {

    const cards = [
        { img: img_1, x: -480, y: 34, rotate: -9 },
        { img: img_2, x: -280, y: -10, rotate: -5 },
        { img: img_3, x: -65, y: 10, rotate: -2 },
        { img: img_4, x: 100, y: -10, rotate: 2 },
        { img: img_5, x: 290, y: 17, rotate: 6 },
        { img: img_6, x: 480, y: 33, rotate: 10 },
    ];

    return (
        <div className='w-full min-h-screen bg-white flex flex-col items-center pt-7 relative overflow-hidden'>

            {/* Header Section */}
            <motion.div
                initial={{ opacity: 0, y: 70, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 1.2, ease: "easeOut", delay: 0.5 }}
                className='text-center mb-6 z-20'
            >
                <h2 className='text-2xl mb-1 font-semibold'>The Ultimate</h2>
                <h2 className='text-5xl tracking-tight font-semibold'>COLLECTIONS</h2>
            </motion.div>

            {/* Cards Container */}
            <div className='relative w-full h-112.5 flex items-center justify-center z-10'>
                {cards.map((card, index) => {
                    // Increased stagger (0.12 -> 0.15) for a slower, cascading effect
                    const totalDelay = index * 0.15;

                    return (
                        <motion.div
                            key={index}
                            initial={{ y: 600, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{
                                // Rise duration increased to 2.2s for a much smoother, slower feel
                                y: { duration: 2.2, ease: [0.22, 1, 0.36, 1], delay: totalDelay },
                                opacity: { duration: 1.2, delay: totalDelay }
                            }}
                            style={{
                                zIndex: 100 + (cards.length - index),
                                position: 'absolute',
                                transformPerspective: 1200,
                            }}
                        >
                            <motion.img
                                src={card.img}
                                alt={`img_${index}`}
                                animate={{
                                    x: [0, 0, card.x],
                                    y: [0, 0, card.y],
                                    rotate: [0, 0, card.rotate],
                                }}
                                transition={{
                                    duration: 3, 
                                    ease: "easeInOut",
                                    times: [0, 0.45, 1], // Increased hold time slightly
                                    // Delay is pushed to 2.2s to wait for the slower rise to complete
                                    delay: totalDelay + 2.2 
                                }}
                                className='h-70 w-60 object-cover rounded-[40px] shadow-xl'
                                style={{
                                    willChange: "transform",
                                    transform: "translateZ(0)",
                                    backfaceVisibility: "hidden"
                                }}
                            />
                        </motion.div>
                    );
                })}
            </div>

            {/* Bottom Content */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                // Delayed bottom text even further to match the slower card sequence
                transition={{ duration: 1.2, ease: "easeOut", delay: 3.8 }}
                className='text-center px-4 z-20 mt-10'
            >
                <h2 className='max-w-2xl mx-auto text-lg font-medium text-gray-700'>
                    Fresh styles made for modern lifestyles. Easy fits, bold details,
                    and effortless comfort perfect for every day, every plan.
                </h2>
                <div className='mt-6'>
                    <button className='bg-black text-white px-10 py-3 rounded-full font-semibold shadow-lg hover:bg-gray-800 transition-colors'>
                        Shop Now
                    </button>
                </div>
            </motion.div>

        </div>
    )
}

export default Hero_section