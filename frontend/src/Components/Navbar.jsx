import React, { useState, useContext } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { AuthContext } from '../Context/authContext'
import heart from '../assets/images/line-md_heart.png'
import card from '../assets/images/Vector.png'

const Navbar = () => {
    const navigate = useNavigate();

    // Get user and logout from Global Context
    const { user, setUser, setToken } = useContext(AuthContext);

    // State to toggle logout dropdown
    const [showMenu, setShowMenu] = useState(false);

    const logout = () => {
        setToken('');
        setUser(null);
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/login');
    };

    const navLinks = [
        { name: 'Home', path: '/' },
        { name: 'About Us', path: '/about' },
        { name: 'Collections', path: '/product' },
        { name: 'Blog', path: '/blog' },
        { name: 'Contact Us', path: '/contact' }
    ];

    // Animation Variants
    const navVariants = {
        hidden: { opacity: 0, y: -100 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 1.5, ease: [0.22, 1, 0.36, 1], staggerChildren: 0.1, delayChildren: 0.1 }
        }
    };

    const logoVariants = {
        hidden: { opacity: 0, y: -50, x: "40vw" },
        visible: {
            opacity: 1,
            y: 0,
            x: 0,
            transition: { duration: 1.5, ease: [0.22, 1, 0.36, 1], delay: 0.2 }
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
            className='flex justify-between items-center mx-4 mt-1 px-6 relative z-100 h-20'
        >
            {/* Logo */}
            <motion.div
                variants={logoVariants}
                className='font-sans text-3xl font-bold tracking-tighter cursor-pointer'
                onClick={() => navigate('/')}
            >
                Fashion
            </motion.div>

            {/* Nav Links */}
            <ul className='hidden md:flex text-lg items-center gap-10 font-medium'>
                {navLinks.map((item, index) => (
                    <motion.div key={index} variants={linkVariants}>
                        <NavLink
                            to={item.path}>
                            <li className='list-none'>{item.name}</li>
                        </NavLink>
                    </motion.div>
                ))}
            </ul>

            {/* Icons & Auth */}
            <div className='flex gap-6 items-center'>
                <motion.div variants={linkVariants} className='flex gap-4 items-center border-r pr-4 border-gray-200'>
                    <motion.img
                        whileHover={{ scale: 1.1 }}
                        className='w-6 h-6 cursor-pointer'
                        src={heart}
                        alt="like"
                        onClick={() => navigate(`/Favorite`)}
                    />
                    <motion.img
                        whileHover={{ scale: 1.1 }}
                        className='w-6 h-6 cursor-pointer'
                        src={card}
                        alt="cart"
                        onClick={() => navigate(`/Card`)}
                    />
                </motion.div>

                {/*logout section*/}    
                <motion.div variants={linkVariants} className="relative">
                    {user ? (
                        <div
                            onMouseEnter={() => setShowMenu(true)}
                            onMouseLeave={() => setShowMenu(false)}
                            className='relative group py-2' // Added 'group' and vertical padding
                        >
                            {/* The Profile Icon */}
                            <div className='w-10 h-10 rounded-full bg-black text-white flex items-center justify-center cursor-pointer uppercase font-bold text-sm shadow-md hover:bg-gray-800 transition-all'>
                                {user.name[0]}
                            </div>

                            {/* Dropdown Menu - Controlled by showMenu state */}
                            {showMenu && (
                                <div className='absolute right-0 top-full w-40 z-999 pt-2'>
                                    <div className='flex flex-col gap-2 py-3 px-4 bg-white text-gray-500 rounded-xl shadow-2xl border border-gray-100'>
                                        <p
                                            onClick={() => { navigate('/profile'); setShowMenu(false); }}
                                            className='hover:text-black cursor-pointer text-sm transition-colors'
                                        >
                                            My Profile
                                        </p>
                                        <p
                                            onClick={() => { navigate('/orders'); setShowMenu(false); }}
                                            className='hover:text-black cursor-pointer text-sm transition-colors'
                                        >
                                            Orders
                                        </p>
                                        <hr className='border-gray-100' />
                                        <p
                                            onClick={() => { logout(); setShowMenu(false); }}
                                            className='hover:text-red-600 cursor-pointer text-sm font-medium transition-colors'
                                        >
                                            Logout
                                        </p>
                                    </div>
                                </div>
                            )}
                        </div>
                    ) : (
                        <button
                            onClick={() => navigate('/login')}
                            className='bg-black text-white px-6 py-2 rounded-full text-sm font-semibold hover:bg-gray-800 transition-all active:scale-95'
                        >
                            Create Account
                        </button>
                    )}
                </motion.div>
            </div>
        </motion.div>
    )
}

export default Navbar