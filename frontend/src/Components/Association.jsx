import React from 'react'
import eve_img from '../assets/images/gallery_items/Eve.png'
import jatin_img from '../assets/images/gallery_items/jatin.png'
import nia_img from '../assets/images/gallery_items/Nia.png'
import swapnil_img from '../assets/images/gallery_items/Swapnil_Solanki.png'
import vijay_img from '../assets/images/gallery_items/Vijay.png'
import rolex_img from '../assets/images/gallery_items/Rolex.png'


const Association = () => {

    const galleryItems = [
        { id: 1, name: "Eve", img: eve_img },
        { id: 2, name: "Nia", img: nia_img },
        { id: 3, name: "Jatin", img: jatin_img },
        { id: 4, name: "Swapnil__Solanki", img: swapnil_img },
        { id: 5, name: "Vijay", img: vijay_img },
        { id: 6, name: "Rolex", img: rolex_img },
    ];
    return (
        <div className=' mb-30'>
            <div className='flex justify-between mb-10 items-baseline px-10 py-16'>
                <h2 className='instrument-serif-regular-italic text-4xl leading-none'>As Seen On Community</h2>
                <p className='text-xs md:text-sm uppercase tracking-widest text-right leading-relaxed'>
                    DISCOVER HOW FASHION IS STYLED AND CELEBRATED <br />BY OUR GLOBAL COMMUNITY
                </p>
            </div>

            <div className="w-full overflow-x-hidden">
                <div className='flex whitespace-nowrap marquee-content items-start gap-5'>

                    {[...galleryItems, ...galleryItems, ...galleryItems].map((item, index) => (
                        <div
                            key={index}
                            className={`relative group shrink-0 transition-all duration-500 
                             ${index % 2 !== 0 ? 'mt-20' : 'mt-0'}`
                            }
                        >

                            <img
                                src={item.img}
                                alt={item.name}
                                className='h-102.5 w-auto rounded-sm object-cover block'
                            />


                            <div className='absolute bottom-4 left-4 '>
                                <span className='text-white instrument-serif-regular bg-black/20 px-2 py-1 rounded-sm'>
                                    @{item.name}
                                </span>
                            </div>
                        </div>


                    ))}
                </div>
            </div>
        </div>
    )
}

export default Association
