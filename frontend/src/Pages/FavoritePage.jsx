import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../Context/authContext';
import { FaHeart } from "react-icons/fa";

const FavoritesPage = () => {
    const navigate = useNavigate();
    const { token } = useContext(AuthContext);
    
    const [favorites, setFavorites] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchFavorites = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/cart/MyWishlist', { 
                    withCredentials: true 
                });
                
                if (response.data.success) {
                    setFavorites(response.data.favorites);
                }
            } catch (error) {
                console.error("Error fetching favorites:", error);
            } finally {
                setLoading(false);
            }
        };

        if (token) {
            fetchFavorites();
        } else {
            navigate('/login');
        }
    }, [token, navigate]);

    // Function to remove item directly from the favorites page
    const handleRemoveFavorite = async (productId) => {
        try {
            // Instantly remove from UI for a snappy experience
            setFavorites(prev => prev.filter(item => item._id !== productId));

            await axios.post(
                'http://localhost:3000/api/auth/favorite', 
                { productId },
                { withCredentials: true }
            );
        } catch (error) {
            console.error("Error removing favorite:", error);
            // If it fails, you might want to refresh the list here
        }
    };

    if (loading) {
        return <div className='p-20 text-center font-serif text-2xl'>Loading your favorites...</div>;
    }

    return (
        <div className="px-10 py-16 min-h-[70vh]">
            <h1 className="text-4xl font-serif italic mb-2">Your Favorites</h1>
            <p className="text-gray-500 mb-10">Items you've loved, saved all in one place.</p>

            {favorites.length === 0 ? (
                <div className="text-center py-20 bg-gray-50 rounded border border-gray-100">
                    <h2 className="text-2xl font-serif italic mb-4">Your wishlist is currently empty</h2>
                    <button 
                        onClick={() => navigate('/collections')} 
                        className="bg-black text-white px-8 py-3 rounded uppercase tracking-widest text-xs hover:bg-gray-800 transition-colors"
                    >
                        Explore Collections
                    </button>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                    {favorites.map((product) => (
                        <div key={product._id} className="group relative border border-transparent hover:border-gray-200 transition-all p-3 rounded">
                            
                            {/* Product Image */}
                            <div className="relative w-full aspect-square overflow-hidden bg-gray-100 rounded mb-4 cursor-pointer" onClick={() => navigate(`/product/${product._id}`)}>
                                <img 
                                    src={product.images && product.images[0]} 
                                    alt={product.name} 
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                />
                            </div>

                            {/* Remove Button (Heart) */}
                            <button 
                                onClick={() => handleRemoveFavorite(product._id)}
                                className="absolute top-6 right-6 bg-white p-2 rounded-full shadow-sm hover:scale-110 transition-transform"
                                title="Remove from favorites"
                            >
                                <FaHeart className="text-red-500" size={16} />
                            </button>

                            {/* Product Info */}
                            <div className="cursor-pointer" onClick={() => navigate(`/product/${product._id}`)}>
                                <h3 className="text-sm font-bold uppercase tracking-tight truncate">{product.name}</h3>
                                <p className="text-gray-500 text-sm mt-1">₹{product.price}</p>
                            </div>
                            
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default FavoritesPage;