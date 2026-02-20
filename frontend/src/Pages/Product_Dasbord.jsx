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
        return (
            <div className='p-20 text-center'>
                <h2 className='text-2xl font-bold'>Product Not Found</h2>
                <p className='text-gray-500'>The item you are looking for does not exist.</p>
            </div>
        );
    }

    const relatedProducts = small_cards.filter(item => item.category === displayProduct.category);
    console.log(displayProduct.category);
    

    return (
        <div className="px-10 py-16">
            <div className='flex flex-col md:flex-row gap-10'>
                
                <div className='flex-shrink-0'>
                    <img 
                        className='w-full md:w-[500px] h-auto aspect-square object-cover' 
                        src={displayProduct.mainImg} 
                        alt={displayProduct.name} 
                    />
                </div>

                <div className='flex md:flex-col gap-3'>
                    {relatedProducts.map((item) => (
                        <div key={item.id} className='cursor-pointer transition-all overflow-hidden'>
                            <img
                                src={item.mainImg}
                                className='w-24 h-24 object-cover'
                                alt={item.name}
                            />
                        </div>
                    ))}
                </div>

                <div className='flex flex-col flex-1 gap-4'>
                    {/* Breadcrumbs */}
                    <nav className='flex gap-1 instrument-serif-regular'>
                        <span>Home</span> <LuDot className='pt-1 text-xl'/> <span>All Products</span><LuDot className='pt-1 text-xl'/><span>Shop</span> <LuDot className='pt-1 text-xl' /> <span className='text-black'>Trendy</span>
                    </nav>

                    <h1 className='instrument-serif-regular-italic text-5xl'>{displayProduct.name}</h1>
                    <span className='instrument-serif-regular text-2xl'>₹{displayProduct.price}</span>
                    
                    <hr className='border-gray-200' />

                    <p className='text-[16px] text-gray-500 leading-relaxed'>
                            A sophisticated taupe suede wide-brim hat with a slim leather band, placed on a smooth, light gray background. The image is minimal and elegant, with soft lighting that enhances the hat's premium suede texture and modern, fashionable shape.5. Olive Green Leather Bucket HatA stylish olive green leather bucket hat with a subtle embossed logo, centered on a light gray background. The composition is clean and refined, with soft, diffused lighting that draws attention to the hat's luxurious material and unique design
                    </p>

                    <div className='mt-2 flex flex-col gap-2'>
                        <div className='flex items-center gap-3'>
                            <div className='flex gap-1 text-black'>
                                <FaStar /> <FaStar /> <FaStar /> <FaStar /> <FaStar />
                            </div>
                            <p className='text-xs font-medium tracking-tighter uppercase'>
                                4.8 AVG BY 156 REVIEWS
                            </p>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className='flex gap-2 mt-6 h-14'>
                        <button className='bg-black text-white w-full font-sans uppercase tracking-widest hover:bg-zinc-800 transition-colors'>
                            
                        </button>
                        <div className='bg-gray-100 h-full w-16 flex justify-center items-center cursor-pointer hover:bg-gray-200 transition-colors'>
                            <CiHeart size={30} />
                        </div>
                    </div>
                </div>

            </div>


            
        </div>
    );
};

export default Product_Dasbord;