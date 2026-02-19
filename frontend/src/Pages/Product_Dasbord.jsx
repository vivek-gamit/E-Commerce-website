import React from 'react'
import hat_1 from '../assets/images/hat/hat_1.png'
import hat_2 from '../assets/images/hat/hat_2.png'
import hat_3 from '../assets/images/hat/hat_3.png'
import heart from '../assets/images/line-md_heart.png'
import { FaStar } from "react-icons/fa";
import { CiHeart } from "react-icons/ci";

const Product_Dasbord = () => {

    const products = [
        {
            id: 1,
            name: "Hat",
            mainImg: hat_1,
        },
        {
            id: 2,
            name: "Hat",
            mainImg: hat_1,
        },
        {
            id: 2,
            name: "Hat",
            mainImg: hat_2,
        },
        {
            id: 3,
            name: "Hat",
            mainImg: hat_3,
        },
    ];
    return (
        <div className="px-10 py-16">
            <div className='flex gap-3'>
                <img className='w-[599px] h-[574px]' src={hat_1} alt="hat_1" />

                <div className='grid grid-row-1 md:grid-row-3'>

                    {products.map((item) => (
                        <div key={item.id} className='group flex cursor-pointer'>
                            <div className=' relative overflow-hidden aspect-square rounded-sm '>

                                <img
                                    src={item.mainImg}
                                    className='inset-0 w-[104px] h-[104px]'
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

                    <h1 className='instrument-serif-regular-italic text-3xl'>Brim Hat</h1>
                    <span className='instrument-serif-regular'>₹1999</span>
                    <hr />
                    <p className='text-[16px] text-gray-400'>A sophisticated taupe suede wide-brim hat with a slim leather band, placed on a smooth, light gray background. The image is minimal and elegant, with soft lighting that enhances the hat’s premium suede texture and modern, fashionable shape. <br />5. Olive Green Leather Bucket Hat. A stylish olive green leather bucket hat with a subtle embossed logo, centered on a light gray background. The composition is clean and refined, with soft, diffused lighting that draws attention to the hat’s luxurious material and unique design</p>

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

                    <div className='flex gap-1 mt-5 h-[60px]'>
                        <div className='bg-black w-full'>black box</div>
                        <div className='bg-gray-100 h-full w-[60px] flex flex-col justify-center items-center gap-4'>
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
