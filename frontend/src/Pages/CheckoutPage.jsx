import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../Context/authContext';

const CheckoutPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { token } = useContext(AuthContext);

    const [cartItems, setCartItems] = useState([]);
    const [subtotal, setSubtotal] = useState(0);
    const [loading, setLoading] = useState(true);
    const [addressList, setAddressList] = useState([]); 

    const [formData, setFormData] = useState({
        firstName: '', lastName: '', email: '',
        street: '', city: '', state: '',
        zipcode: '', country: '', phone: ''
    });

    useEffect(() => {
        const fetchCheckoutAndProfileData = async () => {
            try {
                if (location.state && location.state.items) {
                    setCartItems(location.state.items);
                    setSubtotal(location.state.total);
                } else {
                    const cartRes = await axios.get('http://localhost:3000/api/cart/getCart', { withCredentials: true });
                    if (cartRes.data.success) {
                        const items = cartRes.data.cart.items || [];
                        setCartItems(items);
                        setSubtotal(items.reduce((acc, item) => acc + (item.price * item.quantity), 0));
                    }
                }

                const userRes = await axios.get('http://localhost:3000/api/auth/profile', { withCredentials: true });
                if (userRes.data.success) {
                    const fetchedAddressData = userRes.data.user.address;
                    let finalAddressList = [];

                    if (Array.isArray(fetchedAddressData)) {
                        finalAddressList = fetchedAddressData;
                    } else if (fetchedAddressData && fetchedAddressData.street) {
                        finalAddressList = [fetchedAddressData];
                    }

                    const cleanList = finalAddressList.filter(addr => addr && addr.street);
                    setAddressList(cleanList);

                    if (cleanList.length > 0) {
                        setFormData(prev => ({ ...prev, ...cleanList[0] }));
                    }
                }
            } catch (error) {
                console.error("Initialization Error:", error);
            } finally {
                setLoading(false);
            }
        };

        if (token) fetchCheckoutAndProfileData();
        else navigate('/login');
    }, [token, navigate, location.state]);

    const handleSelectAddress = (e) => {
        const selectedIndex = e.target.value;
        if (selectedIndex === "new") {
            setFormData({ firstName: '', lastName: '', email: '', street: '', city: '', state: '', zipcode: '', country: '', phone: '' });
        } else {
            setFormData(addressList[selectedIndex]);
        }
    };

    const onChangeHandler = (event) => {
        const { name, value } = event.target;
        setFormData(data => ({ ...data, [name]: value }));
    };

    const onSubmitHandler = async (event) => {
        event.preventDefault();
        if (cartItems.length === 0) {
            alert("Your bag is empty!");
            return navigate('/cartpage');
        }

        try {
            const orderData = {
                address: formData,
                items: cartItems,
                amount: subtotal + 50,
            };

            const response = await axios.post('http://localhost:3000/api/order/place', orderData, { withCredentials: true });
            if (response.data.success) {
                alert("Order Placed Successfully!");
                navigate('/profile');
            }
        } catch (error) {
            console.error("Order Placement Error:", error);
            alert(error.response?.data?.message || "Failed to place order.");
        }
    };

    if (loading) return <div className='p-20 text-center font-serif text-2xl italic text-zinc-500'>Preparing checkout...</div>;

    const inputClasses = "border border-zinc-200 rounded-sm py-3 px-4 w-full outline-none focus:border-zinc-800 text-sm transition-colors bg-white";

    return (
        <div className="bg-zinc-50 min-h-screen pb-20">
            <form onSubmit={onSubmitHandler} className='max-w-7xl mx-auto flex flex-col lg:flex-row gap-16 pt-16 px-6 lg:px-10'>

                {/* LEFT SIDE: Delivery Information */}
                <div className='flex-1 flex flex-col gap-5'>
                    <div className='flex justify-between items-center mb-4 border-b border-zinc-200 pb-4'>
                        <h2 className='text-3xl italic font-serif text-zinc-900'>Delivery Information</h2>
                        
                        {addressList.length > 0 && (
                            <select 
                                onChange={handleSelectAddress}
                                className='text-[10px] border border-zinc-200 py-2 px-3 uppercase tracking-widest outline-none focus:border-black cursor-pointer bg-white rounded-sm'
                            >
                                {addressList.map((addr, index) => (
                                    <option key={index} value={index}>
                                        {index === 0 ? "Default: " : "Saved: "} {addr.street ? addr.street.substring(0, 15) : "Address"}...
                                    </option>
                                ))}
                                <option value="new">+ New Address</option>
                            </select>
                        )}
                    </div>

                    <div className='flex gap-4'>
                        <input required onChange={onChangeHandler} name='firstName' value={formData.firstName} className={inputClasses} type="text" placeholder='First name' />
                        <input required onChange={onChangeHandler} name='lastName' value={formData.lastName} className={inputClasses} type="text" placeholder='Last name' />
                    </div>
                    <input required onChange={onChangeHandler} name='email' value={formData.email} className={inputClasses} type="email" placeholder='Email address' />
                    <input required onChange={onChangeHandler} name='street' value={formData.street} className={inputClasses} type="text" placeholder='Street address' />
                    
                    <div className='flex gap-4'>
                        <input required onChange={onChangeHandler} name='city' value={formData.city} className={inputClasses} type="text" placeholder='City' />
                        <input required onChange={onChangeHandler} name='state' value={formData.state} className={inputClasses} type="text" placeholder='State / Province' />
                    </div>
                    
                    <div className='flex gap-4'>
                        <input required onChange={onChangeHandler} name='zipcode' value={formData.zipcode} className={inputClasses} type="number" placeholder='Postal Code' />
                        <input required onChange={onChangeHandler} name='country' value={formData.country} className={inputClasses} type="text" placeholder='Country' />
                    </div>
                    <input required onChange={onChangeHandler} name='phone' value={formData.phone} className={inputClasses} type="text" placeholder='Phone number' />

                    {addressList.length > 0 && formData.street === addressList[0]?.street && (
                        <p className='text-[10px] text-zinc-500 uppercase tracking-widest mt-2'>✓ Using saved default address</p>
                    )}
                </div>

                {/* RIGHT SIDE: Order Summary */}
                <div className='w-full lg:w-[450px] shrink-0'>
                    <div className='bg-white border border-zinc-200 p-8 rounded-sm shadow-sm'>
                        <h2 className='text-3xl mb-8 font-serif italic text-zinc-900'>Order Summary</h2>

                        <div className='mb-8 max-h-64 overflow-y-auto pr-2 flex flex-col gap-4'>
                            {cartItems.map((item, index) => (
                                <div key={index} className='flex items-center gap-4'>
                                    <img src={item.image} className='w-16 h-16 object-cover rounded-sm bg-zinc-100' alt={item.name} />
                                    <div className='text-sm flex-1'>
                                        <p className='font-serif italic text-zinc-900'>{item.name}</p>
                                        <p className='text-zinc-500 text-xs mt-0.5'>Qty: {item.quantity}</p>
                                    </div>
                                    <p className='text-sm font-medium'>₹{item.price * item.quantity}</p>
                                </div>
                            ))}
                        </div>

                        <div className='flex flex-col gap-4 text-sm border-t border-zinc-100 pt-6'>
                            <div className='flex justify-between text-zinc-600'>
                                <p>Subtotal</p>
                                <p>₹{subtotal.toLocaleString()}.00</p>
                            </div>
                            <div className='flex justify-between text-zinc-600'>
                                <p>Shipping Fee</p>
                                <p>₹50.00</p>
                            </div>
                            <div className='flex justify-between font-bold text-lg pt-4 border-t border-zinc-200 mt-2 text-zinc-900'>
                                <p>Total</p>
                                <p>₹{(subtotal + 50).toLocaleString()}.00</p>
                            </div>
                        </div>

                        <div className='mt-10'>
                            <p className='text-[10px] text-zinc-400 mb-3 uppercase tracking-widest font-bold'>Payment Method</p>
                            <label className='flex items-center gap-3 border border-zinc-200 p-4 rounded-sm cursor-pointer hover:border-zinc-300 transition-colors'>
                                <input type="radio" checked readOnly className="accent-black w-4 h-4" />
                                <span className='text-zinc-800 font-bold uppercase text-[10px] tracking-widest'>Cash on Delivery (COD)</span>
                            </label>
                        </div>

                        <button type='submit' className='bg-black text-white px-8 py-4 mt-8 w-full uppercase tracking-widest text-xs font-bold hover:bg-zinc-800 transition-colors'>
                            Place Order
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default CheckoutPage;