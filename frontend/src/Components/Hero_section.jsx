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
        <div className='w-full min-h-screen bg-white flex flex-col items-center pt-7 relative'>

            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: 50, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 1, ease: "easeOut", delay: 1 }}
                className='text-center mb-6 z-20'
            >
                <h2 className='text-2xl mb-1'>The Ultimate</h2>
                <h2 className='text-5xl tracking-tight'>COLLECTIONS</h2>
            </motion.div>

            {/* Cards */}
            <div className='relative w-full h-112.5 flex items-center justify-center z-10'>
                {cards.map((card, index) => {

                    const totalDelay = index * 0.08;

                    return (
                        <motion.div
                            key={index}
                            initial={{
                                x: 0,
                                y: 400,
                                rotate: 0,
                                opacity: 0
                            }}
                            animate={{
                                // Stage 1: Rise
                                y: [400, 0],
                                opacity: [0, 1],
                                transition: {
                                    y: {
                                        duration:  1.1,
                                        ease: "easeOut",
                                        delay: totalDelay
                                    },
                                    opacity: {
                                        duration: 0.7,
                                        delay: totalDelay
                                    }
                                }
                            }}
                            onAnimationComplete={() => {}}
                            style={{ zIndex: 100 + (cards.length - index) }}
                            className='absolute'
                        >
                            {/* Spread Phase */}
                            <motion.img
                                src={card.img}
                                alt={`img_${index}`}
                                initial={{
                                    x: 0,
                                    y: 0,
                                    rotate: 0
                                }}
                                animate={{
                                    x: card.x,
                                    y: card.y,
                                    rotate: card.rotate
                                }}
                                transition={{
                                    duration: 1.5,
                                    ease: "easeInOut",
                                    delay: totalDelay + 1.4 // after rise + pause
                                }}
                                className='h-75 w-60 object-cover rounded-4xl shadow-2xl will-change-transform'
                            />
                        </motion.div>
                    );
                })}
            </div>

            {/* Bottom */}
            <motion.div
                initial={{ opacity: 0, y: -50, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 1, ease: "easeOut", delay: 1 }}
                className='text-center px-4 z-20'
            >
                <h2 className='max-w-2xl mx-auto text-lg font-medium'>
                    Fresh styles made for modern lifestyles. Easy fits, bold details,
                    and effortless comfort perfect for every day, every plan.
                </h2>
                <div className='mt-2'>
                    <button className='bg-black text-white px-10 py-3 rounded-full font-semibold shadow-lg'>
                        Shop Now
                    </button>
                </div>
            </motion.div>

        </div>
    )
}

export default Hero_section