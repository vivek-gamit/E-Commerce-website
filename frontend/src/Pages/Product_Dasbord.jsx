import React from 'react'
import heart from '../assets/images/line-md_heart.png'
import { FaStar } from "react-icons/fa";
import { CiHeart } from "react-icons/ci";
import { products } from '../assets/assets'
import { useParams } from 'react-router-dom'
import { small_cards } from '../assets/assets';

const Product_Dasbord = () => {

    const { id } = useParams();
    const displayProduct = products.find(item => item.id === Number(id))

    if (!displayProduct) {
        return <div className='p-10 text-center'>Product not found</div>
    }
    const {category} = useParams();
    const relatedProducts = category
        ? small_cards.filter(item => item.category === category)
        : [];

    if (!relatedProducts) return <div>Product not found</div>;

    return (
        <div className="px-10 py-16">
            <div className='flex gap-3'>
                <img className='w-149.75 h-143.5' src={displayProduct.mainImg} alt="hat_1" />

                <div className='grid grid-row-1 md:grid-row-3'>

                    {relatedProducts.map((item) => (
                        <div key={item.id} className='group flex cursor-pointer'>
                            <div className=' relative overflow-hidden aspect-square rounded-sm '>

                                <img
                                    src={item.mainImg}
                                    className='inset-0 w-26 h-26'
                                    alt={item.name}
                                />
                            </div>
                        </div>
                    ))}
                </div>

                <div className='flex flex-col ml-25 gap-2'>
                    <ul className='flex gap-1.5 instrument-serif-regular text-[16px]'>
                        <li>Home</li>
                        <li>All Product</li>
                        <li>Shop</li>
                        <li>Trendy</li>
                    </ul>

                    <h1 className='instrument-serif-regular-italic text-3xl'>{displayProduct.name}</h1>
                    <span className='instrument-serif-regular'>₹1999</span>
                    <hr />
                    <p className='text-[16px] text-gray-400'>A sophisticated taupe suede wide-brim hat with a slim leather band, placed on a smooth, light gray background. The image is minimal and elegant, with soft lighting that enhances the hat's premium suede texture and modern, fashionable shape. <br />5. Olive Green Leather Bucket Hat. A stylish olive green leather bucket hat with a subtle embossed logo, centered on a light gray background. The composition is clean and refined, with soft, diffused lighting that draws attention to the hat's luxurious material and unique design</p>

                    <div className='mt-3 w-full flex justify-center flex-col'>
                        {/* justify-center above centers the whole block on the page */}

                        <div className='flex items-center gap-2'>
                            {/* items-center aligns the stars and text vertically */}
                            <div className='flex gap-1'>
                                <FaStar className="text-black" />
                                <FaStar className="text-black" />
                                <FaStar className="text-black" />
                                <FaStar className="text-black" />
                                <FaStar className="text-black" />
                            </div>

                            <p className='text-sm font-medium'>4.8 AVG BY 156 REVIEWS</p>
                        </div>
                    </div>

                    <div className='flex gap-1 mt-5 h-15'>
                        <div className='bg-black w-full'>black box</div>
                        <div className='bg-gray-100 h-full w-15 flex flex-col justify-center items-center gap-4'>
                            {/* Added size and color to make them stand out */}
                            <CiHeart size={35} className="" />

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Product_Dasbord
