import React from 'react'
import { motion } from 'framer-motion'
import img_1 from '../assets/images/hero_section/img_1.jpg'
import img_2 from '../assets/images/hero_section/img_2.jpg'
import img_3 from '../assets/images/hero_section/img_3.jpg'
import img_4 from '../assets/images/hero_section/img_4.jpg'
import img_5 from '../assets/images/hero_section/img_5.jpg'
import img_6 from '../assets/images/hero_section/img_6.jpg'

const Hero_section = () => {
    const cards = [
        { img: img_1, x: -480, y: 34, rotate: -9 },
        { img: img_2, x: -280, y: -10, rotate: -5 },
        { img: img_3, x: -65, y: 10, rotate: -2 },
        { img: img_4, x: 100, y: -10, rotate: 2 },
        { img: img_5, x: 290, y: 17, rotate: 6 },
        { img: img_6, x: 480, y: 33, rotate: 10 },
    ];

    const topTextVariants = {
        hidden: { opacity: 0, y: 50, scale: 0.9 },
        visible: {
            opacity: 1, y: 0, scale: 1,
            transition: { duration: 1, ease: "easeOut", delay: 1 }
        }
    };

    const bottomTextVariants = {
        hidden: { opacity: 0, y: -50, scale: 0.9 },
        visible: {
            opacity: 1, y: 0, scale: 1,
            transition: { duration: 1, ease: "easeOut", delay: 1 }
        }
    };

    return (
        <div className='w-full min-h-screen bg-white flex flex-col items-center pt-7 relative z-0'>
            {/* Header Text */}
            <motion.div
                initial="hidden"
                animate="visible"
                variants={topTextVariants}
                className='text-center mb-6 z-20'
            >
                <h2 className='text-2xl instrument-sans mb-1'>The Ultimate</h2>
                <h2 className='text-5xl instrument-sans tracking-tight'>COLLECTIONS</h2>
            </motion.div>

            {/* Cards Container - Forced Z-Index and Relative Height */}
            <div className='relative w-full h-[450px] flex items-center justify-center z-10'>
                {cards.map((card, index) => (
                    <motion.div
                        key={index}
                        initial={{ x: 0, y: 400, rotate: 0, opacity: 0 }} // Match the first keyframe
                        animate={{
                            // 1. Start at 0 | 2. Stay at 0 | 3. Move to final X
                            x: [0, 0, 0, card.x],
                            // 1. Start at 400 | 2. Rise to 0 | 3. Stay at 0 | 4. Move to final Y
                            y: [400, 0, 0, card.y],
                            rotate: [0, 0, 0, card.rotate],
                            opacity: [0, 1, 1, 1]
                        }}
                        transition={{
                            duration: 2, // Slightly faster for better 'snap'
                            ease: "easeInOut",
                            // 0% to 30%: Rise | 30% to 60%: Pause | 60% to 100%: Spread
                            times: [0, 0.3, 0.6, 1],
                            delay: index * 0.05
                        }}
                        style={{ zIndex: 100 + (cards.length - index) }}
                        className='absolute'
                    >
                        <img
                            src={card.img}
                            alt={`img_${index}`}
                            className='h-[300px] w-[240px] object-cover rounded-[2rem] shadow-2xl'
                        />
                    </motion.div>
                ))}
            </div>

            {/* Bottom Content */}
            <motion.div
                initial="hidden"
                animate="visible"
                variants={bottomTextVariants}
                className='text-center px-4 z-20'
            >
                <h2 className='text-black max-w-2xl mx-auto leading-relaxed text-lg font-medium'>
                    Fresh styles made for modern lifestyles. Easy fits, bold details, and effortless
                    comfort perfect for every day, every plan.
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