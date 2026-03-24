import React, { useEffect, useState, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FaStar } from "react-icons/fa";
import { CiHeart } from "react-icons/ci";
import { LuDot } from "react-icons/lu";
import axios from 'axios';
import { AuthContext } from '../Context/authContext';

const Product_Dasbord = () => {
    const navigate = useNavigate();
    const { id } = useParams(); // This is the MongoDB _id from the URL
    const { token } = useContext(AuthContext);

    // --- State Management ---
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true); // Loading the product from DB
    const [cartLoading, setCartLoading] = useState(false); // Loading for Add to Cart button

    console.log(product);
    

    // --- Fetch Product from Database ---
    useEffect(() => {
        const fetchProductData = async () => {
            try {
                // Ensure this matches your GET API: http://localhost:3000/api/product/:id
                const response = await axios.get(`http://localhost:3000/api/product/${id}`);
                
                
                if (response.data.success) {
                    setProduct(response.data.product);
                }
            } catch (error) {
                console.error("Error fetching product details:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchProductData();
    }, [id]);

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
                {
                    productId: product._id, // Sending the real MongoDB ObjectId
                    price: product.price,
                    quantity: 1
                }, 
                { withCredentials: true }
            );

            if (response.data) {
                navigate('/cartpage');
            }
        } catch (error) {
            console.error("Cart API Error:", error);
            alert(error.response?.data?.message || "Failed to add item to cart.");
        } finally {
            setCartLoading(false);
        }
    };

    if (loading) {
        return <div className='p-20 text-center font-serif text-2xl'>Loading Product...</div>;
    }

    if (!product) {
        return <div className='p-20 text-center font-serif text-2xl'>Product not found in Database</div>;
    }

    return (
        <div className="px-10 py-16">
            <div className='flex flex-col md:flex-row gap-10'>
                {/* Left: Main Image */}
                <div className='shrink-0'>
                    <img
                        className='w-full md:w-140 h-auto aspect-square object-cover shadow-sm'
                        src={product.images && product.images[0]} // Using the images array from DB
                        alt={product.name}
                    />
                </div>

                {/* Middle: Thumbnails (if any) */}
                <div className='flex md:flex-col gap-3'>
                    {product.images && product.images.map((img, index) => (
                        <div key={index} className='cursor-pointer border hover:border-black'>
                            <img src={img} className='w-24 h-24 object-cover' alt={`${product.name} ${index}`} />
                        </div>
                    ))}
                </div>

                {/* Right: Product Details */}
                <div className='flex flex-col flex-1 gap-4'>
                    <nav className='flex gap-1 items-center text-gray-400'>
                        <span>Home</span> <LuDot className='text-xl' /> 
                        <span>Shop</span><LuDot className='text-xl' />
                        <span className='text-black'>{product.category}</span>
                    </nav>

                    <h1 className='instrument-serif-regular-italic text-5xl italic'>{product.name}</h1>
                    <span className='text-2xl font-semibold'>₹{product.price}</span>

                    <hr className='border-gray-200' />

                    <p className='text-[16px] text-gray-500 leading-relaxed'>
                        {product.description || `Experience the perfect blend of style and comfort with our ${product.name}.`}
                    </p>

                    <div className='flex items-center gap-3'>
                        <div className='flex gap-1 text-black'>
                            {[...Array(5)].map((_, i) => <FaStar key={i} />)}
                        </div>
                        <p className='text-xs font-medium uppercase'>4.8 AVG BY 156 REVIEWS</p>
                    </div>

                    {/* Action Buttons */}
                    <div className='flex flex-col gap-3 mt-4'>
                        <div className='flex gap-2 h-14'>
                            <button 
                                onClick={handleAddToCart}
                                disabled={cartLoading}
                                className='bg-black text-white w-full uppercase tracking-widest hover:bg-zinc-800 transition-colors disabled:bg-zinc-500'
                            >
                                {cartLoading ? 'Adding...' : 'Add to Cart'}
                            </button>
                            <div className='bg-gray-100 h-full w-16 flex justify-center items-center cursor-pointer hover:bg-gray-200'>
                                <CiHeart size={30} />
                            </div>
                        </div>

                        <button onClick={() => navigate(`/checkoutPage`)} className='h-14 border border-black uppercase tracking-widest hover:bg-black hover:text-white transition-all'>
                            Buy now
                        </button>
                    </div>

                    {/* Meta Info */}
                    <div className='mt-8 flex flex-col gap-8 pt-8 border-t border-gray-100'>
                        <div className='flex flex-col gap-2'>
                            <h3 className='text-xl'>Shipping Information</h3>
                            <p className='text-gray-500 text-sm'>Standard delivery within 5–10 business days.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Product_Dasbord;