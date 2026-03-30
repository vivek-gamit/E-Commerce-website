import React from 'react';
import { useNavigate } from 'react-router-dom';

const Blog = () => {
    const navigate = useNavigate();

    // Dummy data - you can move this to your database later!
    const posts = [
        {
            id: 1,
            title: "The Essential Summer Wardrobe",
            date: "March 15, 2026",
            category: "Style Guide",
            image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80"
        },
        {
            id: 2,
            title: "Behind the Design: The Taupe Bag",
            date: "March 02, 2026",
            category: "Behind the Scenes",
            image: "https://images.unsplash.com/photo-1584916201218-f4242ceb4809?auto=format&fit=crop&q=80"
        },
        {
            id: 3,
            title: "Sustainable Fashion: Our Promise",
            date: "February 24, 2026",
            category: "Sustainability",
            image: "https://images.unsplash.com/photo-1604176354204-9268737828e4?auto=format&fit=crop&q=80"
        }
    ];

    return (
        <div className="px-6 lg:px-10 py-16 max-w-7xl mx-auto min-h-screen">
            <div className="text-center mb-16">
                <p className="text-[10px] uppercase tracking-[0.3em] font-bold text-zinc-500 mb-4">Editorials</p>
                <h1 className="text-5xl md:text-6xl font-serif italic text-zinc-900">The Journal</h1>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                {posts.map((post) => (
                    <div key={post.id} className="group cursor-pointer flex flex-col gap-4">
                        <div className="aspect-[4/3] overflow-hidden bg-zinc-100 rounded-sm relative">
                            <div className="absolute top-4 left-4 bg-white px-3 py-1 text-[9px] font-bold uppercase tracking-widest z-10 shadow-sm">
                                {post.category}
                            </div>
                            <img 
                                src={post.image} 
                                alt={post.title} 
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                            />
                        </div>
                        <div>
                            <p className="text-[10px] text-zinc-400 uppercase tracking-widest font-bold mb-2">{post.date}</p>
                            <h2 className="text-2xl font-serif italic text-zinc-900 group-hover:underline underline-offset-4 decoration-1 decoration-zinc-300">
                                {post.title}
                            </h2>
                            <button className="text-xs font-bold uppercase tracking-widest mt-4 flex items-center gap-2 hover:text-zinc-500 transition-colors">
                                Read Article <span>→</span>
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Blog;