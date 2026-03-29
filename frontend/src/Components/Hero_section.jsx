import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import img_1 from '../assets/images/hero_section/img_1.webp';
import img_2 from '../assets/images/hero_section/img_2.webp';
import img_3 from '../assets/images/hero_section/img_3.webp';
import img_4 from '../assets/images/hero_section/img_4.webp';
import img_5 from '../assets/images/hero_section/img_5.webp';
import img_6 from '../assets/images/hero_section/img_6.webp';
import { useNavigate } from 'react-router-dom';

// --- THE MAGIC VARIABLE ---
// Because this is outside the component, it remembers its state 
// as long as the user navigates around without hard-refreshing.
let hasPlayedAnimation = false;

const Hero_section = () => {

    const navigate = useNavigate();
    useEffect(() => {
        // Once the component loads for the first time, we set this to true.
        // On subsequent visits to this page (like clicking "Home"), it skips the delay.
        hasPlayedAnimation = true;
    }, []);

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
                initial={hasPlayedAnimation ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 70, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: hasPlayedAnimation ? 0 : 1.2, ease: "easeOut", delay: hasPlayedAnimation ? 0 : 0.5 }}
                className='text-center mb-6 z-20'
            >
                <h2 className='text-2xl mb-1 font-semibold'>The Ultimate</h2>
                <h2 className='text-5xl tracking-tight font-semibold'>COLLECTIONS</h2>
            </motion.div>

            {/* Cards Container */}
            <div className='relative w-full h-112.5 flex items-center justify-center z-10'>
                {cards.map((card, index) => {
                    const totalDelay = index * 0.15;

                    return (
                        <motion.div
                            key={index}
                            initial={hasPlayedAnimation ? { y: 0, opacity: 1 } : { y: 600, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{
                                y: {
                                    duration: hasPlayedAnimation ? 0 : 2.2,
                                    ease: [0.22, 1, 0.36, 1],
                                    delay: hasPlayedAnimation ? 0 : totalDelay
                                },
                                opacity: {
                                    duration: hasPlayedAnimation ? 0 : 1.2,
                                    delay: hasPlayedAnimation ? 0 : totalDelay
                                }
                            }}
                            style={{
                                zIndex: 100 + (cards.length - index),
                                position: 'absolute',
                                transformPerspective: 1200,
                                // 🚀 PERFORMANCE FIX: Tell the GPU this specific div is going to move
                                willChange: "transform, opacity",
                                transform: "translateZ(0)" // Forces GPU rendering
                            }}
                        >
                            <motion.img
                                src={card.img}
                                alt={`img_${index}`}
                                initial={hasPlayedAnimation ? { x: card.x, y: card.y, rotate: card.rotate } : {}}
                                animate={hasPlayedAnimation ? { x: card.x, y: card.y, rotate: card.rotate } : {
                                    x: [0, 0, card.x],
                                    y: [0, 0, card.y],
                                    rotate: [0, 0, card.rotate],
                                }}
                                transition={{
                                    duration: hasPlayedAnimation ? 0 : 3,
                                    ease: "easeInOut",
                                    times: [0, 0.45, 1],
                                    delay: hasPlayedAnimation ? 0 : totalDelay + 2.2
                                }}
                                // 🚀 PERFORMANCE FIX: Removed shadow-xl from the base class. 
                                className='h-70 w-60 object-cover rounded-[40px] border border-gray-100'
                                style={{
                                    backfaceVisibility: "hidden",
                                    // Optional: A much cheaper way to render shadows if you still want them
                                    filter: "drop-shadow(0px 10px 15px rgba(0,0,0,0.1))"
                                }}
                            />
                        </motion.div>
                    );
                })}
            </div>

            {/* Bottom Content */}
            <motion.div
                initial={hasPlayedAnimation ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: hasPlayedAnimation ? 0 : 1.2, ease: "easeOut", delay: hasPlayedAnimation ? 0 : 3.8 }}
                className='text-center px-4 z-20 mt-10'
            >
                <h2 className='max-w-2xl mx-auto text-lg font-medium text-gray-700'>
                    Fresh styles made for modern lifestyles. Easy fits, bold details,
                    and effortless comfort perfect for every day, every plan.
                </h2>
                <div className='mt-6'>
                    <button onClick={()=> {navigate(`/product`)}} className='bg-black text-white px-10 py-3 rounded-full font-semibold shadow-lg hover:bg-gray-800 transition-colors'>
                        Shop Now
                    </button>
                </div>
            </motion.div>

        </div>
    )
}

export default Hero_section;