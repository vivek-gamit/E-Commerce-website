import React from 'react';

const Contact = () => {
    
    // Shared input styling to match your checkout page
    const inputClasses = "border border-zinc-200 rounded-sm py-3 px-4 w-full outline-none focus:border-zinc-800 text-sm transition-colors bg-white";

    const onSubmitHandler = (e) => {
        e.preventDefault();
        alert("Thank you for your message. Our team will get back to you within 24 hours.");
        // You can link this to an email API or your backend later!
    };

    return (
        <div className="px-6 lg:px-10 py-16 max-w-7xl mx-auto min-h-screen">
            <div className="text-center mb-16">
                <p className="text-[10px] uppercase tracking-[0.3em] font-bold text-zinc-500 mb-4">Reach Out</p>
                <h1 className="text-5xl md:text-6xl font-serif italic text-zinc-900">Get in Touch</h1>
            </div>

            <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">
                
                {/* Left Side: Contact Information */}
                <div className="lg:w-1/3 flex flex-col gap-10">
                    <div>
                        <h3 className="text-xl font-serif italic mb-4">Customer Care</h3>
                        <p className="text-sm text-zinc-500 leading-relaxed mb-4">
                            Have a question about an order, fit, or styling? Our team is available Monday through Friday, 9am - 6pm EST.
                        </p>
                        <a href="mailto:support@fashion.com" className="text-sm font-bold border-b border-black pb-0.5 hover:text-zinc-600 hover:border-zinc-600 transition-colors">
                            support@fashion.com
                        </a>
                    </div>

                    <div className="border-t border-zinc-200 pt-10">
                        <h3 className="text-xl font-serif italic mb-4">Headquarters</h3>
                        <div className="text-sm text-zinc-500 leading-relaxed">
                            <p>Fashion Brand Studio</p>
                            <p>123 Style Avenue, Suite 400</p>
                            <p>New York, NY 10001</p>
                        </div>
                        <p className="text-sm font-bold mt-4">+1 (555) 123-4567</p>
                    </div>
                </div>

                {/* Right Side: Contact Form */}
                <div className="lg:w-2/3 bg-zinc-50 p-8 md:p-10 rounded-sm border border-zinc-100">
                    <form onSubmit={onSubmitHandler} className="flex flex-col gap-5">
                        <div className="flex flex-col md:flex-row gap-5">
                            <input required type="text" placeholder="First Name" className={inputClasses} />
                            <input required type="text" placeholder="Last Name" className={inputClasses} />
                        </div>
                        
                        <input required type="email" placeholder="Email Address" className={inputClasses} />
                        
                        <input required type="text" placeholder="Order Number (Optional)" className={inputClasses} />
                        
                        <textarea 
                            required 
                            placeholder="How can we help you?" 
                            rows="5"
                            className={`${inputClasses} resize-none`}
                        ></textarea>

                        <button 
                            type="submit" 
                            className="bg-black text-white px-8 py-4 mt-4 w-full md:w-auto self-start uppercase tracking-widest text-xs font-bold hover:bg-zinc-800 transition-colors shadow-lg"
                        >
                            Send Message
                        </button>
                    </form>
                </div>

            </div>
        </div>
    );
};

export default Contact;