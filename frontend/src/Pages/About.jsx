import React from 'react';

const About = () => {
    return (
        <div className="px-6 lg:px-10 py-16 max-w-7xl mx-auto min-h-screen">
            <div className="text-center mb-16">
                <p className="text-[10px] uppercase tracking-[0.3em] font-bold text-zinc-500 mb-4">Who We Are</p>
                <h1 className="text-5xl md:text-6xl font-serif italic text-zinc-900">Our Story</h1>
            </div>

            <div className="flex flex-col md:flex-row gap-16 items-center mb-24">
                {/* Left Side: Image */}
                <div className="w-full md:w-1/2">
                    <div className="aspect-[4/5] bg-zinc-100 overflow-hidden rounded-sm">
                        {/* Replace with your own brand image */}
                        <img 
                            src="https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?auto=format&fit=crop&q=80" 
                            alt="Brand Story" 
                            className="w-full h-full object-cover hover:scale-105 transition-transform duration-1000"
                        />
                    </div>
                </div>

                {/* Right Side: Text */}
                <div className="w-full md:w-1/2 flex flex-col gap-6">
                    <h2 className="text-3xl font-serif italic text-zinc-900">Defining style without limits.</h2>
                    <p className="text-sm text-zinc-600 leading-relaxed">
                        Born from a desire to bridge the gap between contemporary luxury and everyday wear, we started with a simple philosophy: fashion should be an effortless extension of your personality.
                    </p>
                    <p className="text-sm text-zinc-600 leading-relaxed">
                        Every piece in our collection is curated with meticulous attention to detail, sourcing only the finest materials from trusted artisans globally. We believe in creating pieces that don't just fill a wardrobe, but build a legacy.
                    </p>
                    
                    <div className="grid grid-cols-2 gap-8 mt-8 border-t border-zinc-200 pt-8">
                        <div>
                            <h3 className="text-[10px] font-bold uppercase tracking-widest mb-2">Quality</h3>
                            <p className="text-xs text-zinc-500">Uncompromising materials and expert craftsmanship.</p>
                        </div>
                        <div>
                            <h3 className="text-[10px] font-bold uppercase tracking-widest mb-2">Sustainability</h3>
                            <p className="text-xs text-zinc-500">Ethically sourced and environmentally conscious.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;