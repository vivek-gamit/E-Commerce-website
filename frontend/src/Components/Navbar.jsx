import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import { motion } from 'framer-motion'
import heart from '../assets/images/line-md_heart.png'
import card from '../assets/images/Vector.png'

const Navbar = () => {
    // 1. Navbar Container: Simply drops down from the top
    const navVariants = {
        hidden: { opacity: 0, y: -100 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 1.5,
                ease: [0.22, 1, 0.36, 1], // Premium smooth deceleration
                staggerChildren: 0.1,
                delayChildren: 0.1
            }
        }
    };

    // 2. Logo Logic: Starts at the center of the screen, then moves to the left
    const logoVariants = {
        hidden: { opacity: 0, y: -50, x: "40vw" }, // Starts high and in the middle
        visible: { 
            opacity: 1, 
            y: 0, 
            x: 0, // Moves to its natural left position
            transition: { 
                duration: 1.5, 
                ease: [0.22, 1, 0.36, 1],
                delay: 0.2 
            } 
        }
    };

    const linkVariants = {
        hidden: { opacity: 0, y: -20 },
        visible: { opacity: 1, y: 0 }
    };

    return (
        <motion.div 
            initial="hidden"
            animate="visible"
            variants={navVariants}
            className='flex justify-between items-center mx-4 mt-1 px-6 relative z-[100]'
        >
            {/* Logo: Travels from center-screen to the left */}
            <motion.div 
                variants={logoVariants}
                className='font-sans text-3xl font-bold tracking-tighter'
            >
                Fashion
            </motion.div>

            {/* Nav Links: Fade in after logo starts moving */}
            <ul className='flex text-lg items-center gap-10'>
                {['Home', 'About Us', 'Collections', 'Blog', 'Contact Us'].map((item, index) => (
                    <motion.div key={index} variants={linkVariants}>
                        <NavLink 
                            to={`/${item.toLowerCase().replace(' ', '')}`} 
                            className='px-5'
                        >
                            <li className='list-none'>{item}</li>
                        </NavLink>
                    </motion.div>
                ))}
            </ul>

            {/* Icons: Slide in from the top/right */}
            <motion.div variants={linkVariants} className='flex gap-4 items-center'>
                <motion.img 
                    whileHover={{ scale: 1.1 }}
                    className='w-8 h-8 cursor-pointer' 
                    src={heart} 
                    alt="like" 
                />
                <motion.img 
                    whileHover={{ scale: 1.1 }}
                    className='w-8 h-8 cursor-pointer' 
                    src={card} 
                    alt="cart" 
                />
            </motion.div>
        </motion.div>
    )
}

export default Navbar