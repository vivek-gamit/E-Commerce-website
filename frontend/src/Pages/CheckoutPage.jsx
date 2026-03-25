import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../Context/authContext';

const CheckoutPage = () => {
    const navigate = useNavigate();
    const { token } = useContext(AuthContext);

    // --- 1. State Management ---
    const [cartItems, setCartItems] = useState([]);
    const [subtotal, setSubtotal] = useState(0);
    const [loading, setLoading] = useState(true);

    const [formData, setFormData] = useState({
        firstName: '', lastName: '', email: '',
        street: '', city: '', state: '',
        zipcode: '', country: '', phone: ''
    });

    // --- 2. Fetch Cart Data on Page Load ---
    useEffect(() => {
        const fetchCheckoutData = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/cart/getCart', { withCredentials: true });
                if (response.data.success) {
                    const items = response.data.cart.items || [];
                    setCartItems(items);
                    
                    // Calculate subtotal from database items
                    const total = items.reduce((acc, item) => acc + (item.price * item.quantity), 0);
                    setSubtotal(total);
                }
            } catch (error) {
                console.error("Checkout Data Fetch Error:", error);
            } finally {
                setLoading(false);
            }
        };

        if (token) {
            fetchCheckoutData();
        } else {
            // If user isn't logged in, they shouldn't be here
            navigate('/login');
        }
    }, [token, navigate]);

    // --- 3. Input Handlers ---
    const onChangeHandler = (event) => {
        const { name, value } = event.target;
        setFormData(data => ({ ...data, [name]: value }));
    };

    // --- 4. Place Order Logic ---
    const onSubmitHandler = async (event) => {
        event.preventDefault();
        
        if (cartItems.length === 0) {
            alert("Your cart is empty!");
            return navigate('/cartpage');
        }

        try {
            // Structure the items to match your Order Model exactly
            const orderItems = cartItems.map(item => ({
                productId: item.productId,
                name: item.name,
                price: item.price,
                quantity: item.quantity,
                image: item.image
            }));

            const orderData = {
                address: formData,
                items: orderItems,
                amount: subtotal + 50, // subtotal + delivery fee
            };

            const response = await axios.post('http://localhost:3000/api/order/place', orderData, { withCredentials: true });

            if (response.data.success) {
                alert("Order Placed Successfully!");
                navigate('/'); // Or navigate to an "Orders" history page
            }
        } catch (error) {
            console.error("Order Placement Error:", error);
            alert(error.response?.data?.message || "Failed to place order.");
        }
    };

    if (loading) {
        return <div className='p-20 text-center font-serif text-2xl italic'>Validating your bag...</div>;
    }

    return (
        <form onSubmit={onSubmitHandler} className='flex flex-col sm:flex-row justify-between gap-12 pt-14 min-h-[80vh] border-t px-10'>
            
            {/* LEFT SIDE: Delivery Information */}
            <div className='flex flex-col gap-4 w-full sm:max-w-[480px]'>
                <div className='text-xl sm:text-2xl my-3 italic font-serif'>Delivery Information</div>
                <div className='flex gap-3'>
                    <input required onChange={onChangeHandler} name='firstName' value={formData.firstName} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='First name' />
                    <input required onChange={onChangeHandler} name='lastName' value={formData.lastName} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='Last name' />
                </div>
                <input required onChange={onChangeHandler} name='email' value={formData.email} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="email" placeholder='Email address' />
                <input required onChange={onChangeHandler} name='street' value={formData.street} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='Street' />
                <div className='flex gap-3'>
                    <input required onChange={onChangeHandler} name='city' value={formData.city} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='City' />
                    <input required onChange={onChangeHandler} name='state' value={formData.state} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='State' />
                </div>
                <div className='flex gap-3'>
                    <input required onChange={onChangeHandler} name='zipcode' value={formData.zipcode} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="number" placeholder='Zipcode' />
                    <input required onChange={onChangeHandler} name='country' value={formData.country} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='Country' />
                </div>
                <input required onChange={onChangeHandler} name='phone' value={formData.phone} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="number" placeholder='Phone' />
            </div>

            {/* RIGHT SIDE: Cart Total & Payment Button */}
            <div className='mt-8 flex-1'>
                <div className='min-w-80 bg-gray-50 p-8 rounded-xl border border-gray-100'>
                    <div className='text-2xl mb-6 font-serif italic border-b pb-4'>Cart Total</div>
                    
                    <div className='flex flex-col gap-3'>
                        <div className='flex justify-between text-gray-600'>
                            <p>Subtotal</p>
                            <p>₹{subtotal.toLocaleString()}.00</p>
                        </div>
                        <div className='flex justify-between text-gray-600'>
                            <p>Shipping Fee</p>
                            <p>₹50.00</p>
                        </div>
                        <div className='flex justify-between font-bold text-xl pt-4 border-t'>
                            <p>Total</p>
                            <p>₹{(subtotal + 50).toLocaleString()}.00</p>
                        </div>
                    </div>

                    <div className='mt-10'>
                        <div className='text-sm text-gray-400 mb-4 uppercase tracking-widest'>Payment Method</div>
                        <div className='flex items-center gap-3 border p-3 bg-white rounded cursor-default'>
                            <div className='w-4 h-4 border-4 border-black rounded-full'></div>
                            <p className='text-gray-700 font-medium uppercase text-xs'>Cash on Delivery (COD)</p>
                        </div>
                    </div>

                    <button type='submit' className='bg-black text-white px-16 py-4 text-sm mt-8 w-full uppercase tracking-widest hover:bg-zinc-800 transition-all font-bold'>
                        Place Order
                    </button>
                </div>
            </div>
        </form>
    );
};

export default CheckoutPage;