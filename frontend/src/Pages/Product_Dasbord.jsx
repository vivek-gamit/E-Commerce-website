import React, { useEffect, useState, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FaStar, FaHeart } from "react-icons/fa";
import { CiHeart } from "react-icons/ci";
import { LuDot } from "react-icons/lu";
import axios from 'axios';
import { AuthContext } from '../Context/authContext';

const Product_Dasbord = () => {
    const navigate = useNavigate();
    const { id } = useParams(); 
    const { token } = useContext(AuthContext);

    // --- State Management ---
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [cartLoading, setCartLoading] = useState(false);
    const [isFavorite, setIsFavorite] = useState(false);
    
    // --- NEW: State for FAQ Accordion ---
    const [openFAQ, setOpenFAQ] = useState(null);

    // --- Fetch Product and Favorite Status ---
    useEffect(() => {
        const fetchProductData = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/api/product/${id}`);
                if (response.data.success) {
                    setProduct(response.data.product);
                }

                if (token) {
                    const res = await axios.get('http://localhost:3000/api/auth/profile', { withCredentials: true });
                    if (res.data.success && res.data.user.favorites) {
                        setIsFavorite(res.data.user.favorites.includes(id));
                    }
                }
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchProductData();
    }, [id, token]); 

    // --- Add to Cart Logic ---
    const handleAddToCart = async () => {
        if (!token) {
            alert("Please login to manage your cart.");
            return navigate('/login');
        }

        setCartLoading(true);
        try {
            const response = await axios.post(
                'http://localhost:3000/api/cart/add',
                { productId: product._id, price: product.price, quantity: 1 },
                { withCredentials: true }
            );

            if (response.data.success) {
                navigate('/cartpage');
            }
        } catch (error) {
            console.error("Cart API Error:", error);
            alert(error.response?.data?.message || "Failed to add item to cart.");
        } finally {
            setCartLoading(false);
        }
    };

    // --- Buy Now Logic (Direct Checkout) ---
    const handleBuyNow = () => {
        if (!token) {
            alert("Please login to continue.");
            return navigate('/login');
        }

        const directBuyItem = {
            productId: product._id,
            name: product.name,
            price: product.price,
            quantity: 1,
            image: product.images && product.images[0]
        };

        navigate('/checkoutPage', { 
            state: { items: [directBuyItem], total: product.price } 
        });
    };

    // --- Toggle Favorite Logic ---
    const handleToggleFavorite = async () => {
        if (!token) {
            alert("Please login to save favorites.");
            return navigate('/login');
        }

        setIsFavorite(!isFavorite);

        try {
            const response = await axios.post(
                'http://localhost:3000/api/cart/favorite', // Assuming this is your actual route
                { productId: product._id },
                { withCredentials: true }
            );

            if (!response.data.success) {
                setIsFavorite(!isFavorite);
                console.error("Failed to toggle favorite on server.");
            }
        } catch (error) {
            setIsFavorite(!isFavorite); 
            console.error("Toggle Favorite Error:", error);
        }
    };

    if (loading) return <div className='p-20 text-center font-serif text-2xl'>Loading Product...</div>;
    if (!product) return <div className='p-20 text-center font-serif text-2xl'>Product not found</div>;

    return (
        <div className="px-6 lg:px-10 py-16 bg-white">
            
            {/* Top Section: Product Details */}
            <div className='flex flex-col lg:flex-row gap-12'>
                
                {/* Left: Main Image */}
                <div className='shrink-0'>
                    <img
                        className='w-full lg:w-[500px] h-auto aspect-square object-cover bg-zinc-100'
                        src={product.images && product.images[0]}
                        alt={product.name}
                    />
                </div>

                {/* Middle: Thumbnails */}
                <div className='flex lg:flex-col gap-3 overflow-x-auto lg:overflow-visible'>
                    {product.images && product.images.map((img, index) => (
                        <div key={index} className='cursor-pointer border border-transparent hover:border-black transition-colors shrink-0'>
                            <img src={img} className='w-20 h-20 lg:w-24 lg:h-24 object-cover bg-zinc-50' alt={`${product.name} ${index}`} />
                        </div>
                    ))}
                </div>

                {/* Right: Product Details & Meta */}
                <div className='flex flex-col flex-1 gap-5'>
                    <nav className='flex gap-1 items-center text-xs text-zinc-500 tracking-widest uppercase'>
                        <span>Home</span> <LuDot />
                        <span>All Products</span> <LuDot />
                        <span>{product.category || "Shop"}</span>
                    </nav>

                    <div>
                        <h1 className='font-serif text-4xl italic text-zinc-900 mb-2'>{product.name}</h1>
                        <span className='text-xl font-medium'>₹{product.price}</span>
                    </div>

                    <hr className='border-zinc-200 my-2' />

                    <p className='text-sm text-zinc-500 leading-relaxed'>
                        {product.description || `A sophisticated ${product.name} placed on a smooth background. The design is minimal and elegant, enhancing its premium texture and modern shape.`}
                    </p>

                    <div className='flex items-center gap-3'>
                        <div className='flex gap-1 text-black text-sm'>
                            {[...Array(5)].map((_, i) => <FaStar key={i} />)}
                        </div>
                        <p className='text-[10px] font-bold uppercase tracking-widest'>4.8 AVG BY 156 REVIEWS</p>
                    </div>

                    {/* Action Buttons */}
                    <div className='flex flex-col gap-3 mt-4'>
                        <div className='flex gap-2 h-14'>
                            <button
                                onClick={handleAddToCart}
                                disabled={cartLoading}
                                className='bg-black text-white w-full text-xs font-bold uppercase tracking-widest hover:bg-zinc-800 transition-colors disabled:bg-zinc-500'
                            >
                                {cartLoading ? 'Adding...' : 'Add to Cart'}
                            </button>
                        </div>

                        <div className='flex gap-2 h-14'>
                            <button 
                                onClick={handleBuyNow} 
                                className='w-full h-14 border border-zinc-200 bg-white text-xs font-bold uppercase tracking-widest text-black hover:border-black transition-colors'
                            >
                                Buy now
                            </button>

                            <div 
                                onClick={handleToggleFavorite}
                                className='bg-zinc-50 h-full w-16 flex justify-center items-center cursor-pointer hover:bg-zinc-100 transition-colors border border-zinc-200'
                            >
                                {isFavorite ? (
                                    <FaHeart size={20} className="text-red-500 transition-transform active:scale-75" />
                                ) : (
                                    <CiHeart size={24} className="text-zinc-600 transition-transform active:scale-75" />
                                )}
                            </div>
                        </div>
                    </div>

                    {/* UPDATED: Meta Info (Matches Image) */}
                    <div className='mt-8 flex flex-col gap-6 pt-8 border-t border-zinc-200'>
                        <div className='flex flex-col gap-2'>
                            <h3 className='text-sm font-semibold text-zinc-900'>Shipping Information</h3>
                            <p className='text-zinc-500 text-xs leading-relaxed'>Shipping times vary depending on your location, but most orders are delivered within 5-10 business days. Once your order is shipped, you'll receive a confirmation email with a tracking number.</p>
                        </div>
                        <div className='flex flex-col gap-2'>
                            <h3 className='text-sm font-semibold text-zinc-900'>Material</h3>
                            <p className='text-zinc-500 text-xs leading-relaxed'>We work only with trusted suppliers to ensure our materials are environmentally responsible and meet international quality standards.</p>
                        </div>
                        <div className='flex flex-col gap-2'>
                            <h3 className='text-sm font-semibold text-zinc-900'>Source of clearance</h3>
                            <p className='text-zinc-500 text-xs leading-relaxed'>These products may include end-of-season items, overstock, or final remaining units. Every item is completely brand-new and has been fully inspected before shipping.</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* --- NEW: Commonly Asked Questions Accordion --- */}
            <div className="mt-32 max-w-3xl mx-auto px-4">
                <h2 className="text-3xl font-serif italic text-center mb-10 text-zinc-900">Commonly asked question about this</h2>
                <div className="flex flex-col border-t border-zinc-200">
                    {[
                        { q: "What materials are used in Luströ accessories?", a: "We use premium, ethically sourced materials to ensure longevity and a luxurious feel." },
                        { q: "How are Fashion accessories made?", a: "Each piece is carefully crafted by expert artisans with strict quality control." },
                        { q: "Where do you source your materials?", a: "We partner with trusted international suppliers who meet our strict environmental standards." },
                        { q: "How should I care for my accessory?", a: "Wipe with a damp cloth and store in a cool, dry place away from direct sunlight." },
                        { q: "Do products come with a warranty?", a: "Yes, all products come with a standard 1-year manufacturing warranty." }
                    ].map((faq, index) => (
                        <div key={index} className="border-b border-zinc-200">
                            <button
                                onClick={() => setOpenFAQ(openFAQ === index ? null : index)}
                                className="w-full flex justify-between items-center py-5 text-left text-sm font-semibold text-zinc-800 hover:text-black transition-colors"
                            >
                                {faq.q}
                                <span className="text-xl font-light text-zinc-400">{openFAQ === index ? '−' : '+'}</span>
                            </button>
                            {openFAQ === index && (
                                <div className="pb-5 text-sm text-zinc-500 leading-relaxed pr-8">
                                    {faq.a}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            {/* --- NEW: Popular Products Grid --- */}
            <div className="mt-32 mb-10">
                <h2 className="text-3xl font-serif italic mb-8 text-zinc-900">Popular Products</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Placeholder for 3 items - map your actual products here later! */}
                    {[1, 2, 3].map((item) => (
                        <div key={item} className="group cursor-pointer">
                            <div className="relative bg-zinc-100 aspect-square mb-4 overflow-hidden">
                                <div className="absolute top-4 left-4 bg-white px-3 py-1 text-[9px] font-bold uppercase tracking-widest z-10 shadow-sm">
                                    Popular
                                </div>
                                <button className="absolute top-4 right-4 bg-white p-2 rounded-full z-10 hover:scale-110 transition-transform shadow-sm">
                                    <CiHeart size={18} className="text-zinc-600" />
                                </button>
                                {/* Replace with your actual product images */}
                                <img src={`https://via.placeholder.com/400?text=Product+${item}`} alt="Product" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                            </div>
                            <div className="flex justify-between items-center px-1">
                                <h3 className="text-sm font-serif text-zinc-800">Taupe Bag</h3>
                                <p className="text-sm text-zinc-600 font-medium">4,999₹ IND</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

        </div>
    );
};

export default Product_Dasbord;