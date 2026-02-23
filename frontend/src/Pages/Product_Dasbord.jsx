import React from 'react'
import { useParams } from 'react-router-dom'
import { FaStar } from "react-icons/fa"
import { CiHeart } from "react-icons/ci"
import { products, small_cards } from '../assets/assets'
import { LuDot } from "react-icons/lu";

const Product_Dasbord = () => {
    const { id } = useParams();
    const displayProduct = products.find(item => item.id === Number(id));

    if (!displayProduct) {
        return <div className='p-20 text-center'>Product not found</div>;
    }

    const relatedProducts = small_cards.filter(item => item.category === displayProduct.category);

    return (
        <div className="px-10 py-16">
            <div className='flex flex-col md:flex-row gap-10'>
                {/* Left: Main Image */}
                <div className='shrink-0'>
                    <img
                        className='w-full md:w-180 h-auto aspect-square object-cover'
                        src={displayProduct.mainImg}
                        alt={displayProduct.name}
                    />
                </div>

                {/* Middle: Thumbnails */}
                <div className='flex md:flex-col gap-3'>
                    {relatedProducts.map((item) => (
                        <div key={item.id} className='cursor-pointer'>
                            <img src={item.mainImg} className='w-24 h-24 object-cover' alt={item.name} />
                        </div>
                    ))}
                </div>

                {/* Right: Product Details & Info Column */}
                <div className='flex flex-col flex-1 gap-4'>
                    <nav className='flex gap-1 instrument-serif-regular items-center text-gray-400'>
                        <span>Home</span> <LuDot className='text-xl' /> <span>All Products</span><LuDot className='text-xl' /><span>Shop</span> <LuDot className='text-xl' /> <span className='text-black'>Trendy</span>
                    </nav>

                    <h1 className='instrument-serif-regular-italic text-5xl'>{displayProduct.name}</h1>
                    <span className='instrument-serif-regular text-2xl'>₹{displayProduct.price}</span>

                    <hr className='border-gray-200' />

                    <p className='text-[16px] text-gray-500 leading-relaxed'>
                        Experience the perfect blend of style and comfort with our {displayProduct.name}. Crafted with premium materials, this piece is designed for those who appreciate timeless elegance and modern functionality.
                    </p>

                    <div className='flex items-center gap-3'>
                        <div className='flex gap-1 text-black'>
                            {[...Array(5)].map((_, i) => <FaStar key={i} />)}
                        </div>
                        <p className='text-xs font-medium uppercase'>4.8 AVG BY 156 REVIEWS</p>
                    </div>

                    {/* Action Buttons */}
                    <div className='flex gap-2 mt-2 h-14'>
                        <button className='bg-black text-white w-full uppercase tracking-widest hover:bg-zinc-800 transition-colors'>
                            Add to Cart
                        </button>
                        <div className='bg-gray-100 h-full w-16 flex justify-center items-center cursor-pointer hover:bg-gray-200'>
                            <CiHeart size={30} />
                        </div>
                    </div>


                    <div className='mt-8 flex flex-col gap-8 pt-8'>
                        {/* Shipping */}
                        <div className='flex flex-col gap-2'>
                            <h3 className='text-xl'>Shipping Information</h3>
                            <p className='text-gray-500 text-sm leading-relaxed'>
                                Shipping times vary depending on your location, but most orders are delivered within 5–10 business days. Once your order is shipped, you’ll receive a confirmation email with a tracking number so you can follow your package in real time.
                            </p>
                        </div>
                        <hr className='border-gray-200' />

                        {/* Material */}
                        <div className='flex flex-col gap-2'>
                            <h3 className='text-xl'>Material & Care</h3>
                            <p className='text-gray-500 text-sm leading-relaxed'>
                                We work only with trusted suppliers to ensure our materials are environmentally responsible and meet international quality standards.e.
                            </p>
                        </div>
                        <hr className='border-gray-200' />
                        {/* Clearance */}
                        <div className='flex flex-col gap-2'>
                            <h3 className='text-xl'>Source of Clearance</h3>
                            <p className='text-gray-500 text-sm leading-relaxed'>
                                These products may include end-of-season items, overstock, or the final remaining units. Every clearance item is completely brand-new and has been fully inspected and quality-verified before shipping, ensuring you receive the same trusted quality at a lower price.
                            </p>
                        </div>

                        <hr className='border-gray-200' />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Product_Dasbord;