import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import heart from '../assets/images/line-md_heart.png'
import card from '../assets/images/Vector.png'

const Navbar = () => {
  return (
    <div className='flex justify-between mx-4 mt-7'>
      <div className='font-sans text-3xl font-bold'>Fashion</div>

      <ul className='flex text-lg'>
        <NavLink className='px-5'>
            <li>Home</li>
        </NavLink>

        <NavLink className='px-5'>
            <li>About Us</li>
        </NavLink>

        <NavLink className='px-5'>
            <li>Collections</li>
        </NavLink>

        <NavLink className='px-5'>
            <li>Blog</li>
        </NavLink>

        <NavLink className='px-5'>
            <li>Contact Us</li>
        </NavLink>
      </ul>

      <div className='flex gap-1.5'>
        <img className='w-7 h-7' src={heart} alt="like icon" />
        <img className='w-7 h-7' src={card} alt="" />
      </div>
    </div>
  )
}

export default Navbar
