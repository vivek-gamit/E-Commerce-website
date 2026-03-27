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
    
    // --- 1. Define states for address history ---
    const [addressList, setAddressList] = useState([]); 

    const [formData, setFormData] = useState({
        firstName: '', lastName: '', email: '',
        street: '', city: '', state: '',
        zipcode: '', country: '', phone: ''
    });

    useEffect(() => {
        const fetchCheckoutAndProfileData = async () => {
            try {
                // Handle Order Items
                if (location.state && location.state.items) {
                    setCartItems(location.state.items);
                    setSubtotal(location.state.total);
                } else {
                    const cartRes = await axios.get('http://localhost:3000/api/cart/getCart', { withCredentials: true });
                    if (cartRes.data.success) {
                        const items = cartRes.data.cart.items || [];
                        setCartItems(items);
                        const total = items.reduce((acc, item) => acc + (item.price * item.quantity), 0);
                        setSubtotal(total);
                    }
                }

                // --- 2. Fetch User Profile to get saved address list ---
                const userRes = await axios.get('http://localhost:3000/api/auth/profile', { withCredentials: true });
                
                if (userRes.data.success) {
                    // FIXED: Your backend model uses 'address' for the array, not 'addresses'
                    const fetchedAddressData = userRes.data.user.address;
                    let finalAddressList = [];

                    // Check if it's the new Array format
                    if (Array.isArray(fetchedAddressData)) {
                        finalAddressList = fetchedAddressData;
                    } 
                    // Fallback just in case you have old test users with an Object format
                    else if (fetchedAddressData && fetchedAddressData.street) {
                        finalAddressList = [fetchedAddressData];
                    }

                    // Filter out any accidentally saved blank/empty addresses
                    const cleanList = finalAddressList.filter(addr => addr && addr.street);
                    
                    setAddressList(cleanList);

                    // Auto-fill form with the most recent valid address if available
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

        if (token) {
            fetchCheckoutAndProfileData();
        } else {
            navigate('/login');
        }
    }, [token, navigate, location.state]);

    // Handler for the Dropdown Selection
    const handleSelectAddress = (e) => {
        const selectedIndex = e.target.value;
        if (selectedIndex === "new") {
            // Clear the form so user can type a new one
            setFormData({
                firstName: '', lastName: '', email: '',
                street: '', city: '', state: '',
                zipcode: '', country: '', phone: ''
            });
        } else {
            // Fill form with the selected address
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
                items: cartItems.map(item => ({
                    productId: item.productId,
                    name: item.name,
                    price: item.price,
                    quantity: item.quantity,
                    image: item.image
                })),
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

    if (loading) {
        return <div className='p-20 text-center font-serif text-2xl italic'>Checking your profile...</div>;
    }

    return (
        <form onSubmit={onSubmitHandler} className='flex flex-col sm:flex-row justify-between gap-12 pt-14 min-h-[80vh] border-t px-10'>

            {/* LEFT SIDE: Delivery Information */}
            <div className='flex flex-col gap-4 w-full sm:max-w-[480px]'>
                <div className='flex justify-between items-center mb-3'>
                    <div className='text-xl sm:text-2xl italic font-serif'>Delivery Information</div>
                    
                    {/* --- FIXED: Address List Dropdown --- */}
                    {addressList.length > 0 && (
                        <select 
                            onChange={handleSelectAddress}
                            className='text-[10px] border border-zinc-300 p-1.5 uppercase tracking-tighter outline-none focus:border-black cursor-pointer bg-zinc-50 rounded max-w-[200px]'
                        >
                            {addressList.map((addr, index) => (
                                <option key={index} value={index}>
                                    {index === 0 ? "Default: " : "Saved: "} 
                                    {addr.street ? addr.street.substring(0, 15) : "Address"}...
                                </option>
                            ))}
                            <option value="new">+ Use Different Address</option>
                        </select>
                    )}
                </div>

                {/* Form Inputs */}
                <div className='flex gap-3'>
                    <input required onChange={onChangeHandler} name='firstName' value={formData.firstName} className='border border-gray-300 rounded py-1.5 px-3.5 w-full outline-none focus:border-black' type="text" placeholder='First name' />
                    <input required onChange={onChangeHandler} name='lastName' value={formData.lastName} className='border border-gray-300 rounded py-1.5 px-3.5 w-full outline-none focus:border-black' type="text" placeholder='Last name' />
                </div>
                <input required onChange={onChangeHandler} name='email' value={formData.email} className='border border-gray-300 rounded py-1.5 px-3.5 w-full outline-none focus:border-black' type="email" placeholder='Email address' />
                <input required onChange={onChangeHandler} name='street' value={formData.street} className='border border-gray-300 rounded py-1.5 px-3.5 w-full outline-none focus:border-black' type="text" placeholder='Street' />
                
                <div className='flex gap-3'>
                    <input required onChange={onChangeHandler} name='city' value={formData.city} className='border border-gray-300 rounded py-1.5 px-3.5 w-full outline-none focus:border-black' type="text" placeholder='City' />
                    <input required onChange={onChangeHandler} name='state' value={formData.state} className='border border-gray-300 rounded py-1.5 px-3.5 w-full outline-none focus:border-black' type="text" placeholder='State' />
                </div>
                
                <div className='flex gap-3'>
                    <input required onChange={onChangeHandler} name='zipcode' value={formData.zipcode} className='border border-gray-300 rounded py-1.5 px-3.5 w-full outline-none focus:border-black' type="number" placeholder='Zipcode' />
                    <input required onChange={onChangeHandler} name='country' value={formData.country} className='border border-gray-300 rounded py-1.5 px-3.5 w-full outline-none focus:border-black' type="text" placeholder='Country' />
                </div>
                <input required onChange={onChangeHandler} name='phone' value={formData.phone} className='border border-gray-300 rounded py-1.5 px-3.5 w-full outline-none focus:border-black' type="number" placeholder='Phone' />

                {/* Visual indicator of the selected choice */}
                {addressList.length > 0 && formData.street === addressList[0]?.street && (
                    <div className='bg-green-50 text-green-700 px-3 py-2 text-[10px] font-bold rounded border border-green-100 uppercase tracking-widest mt-2'>
                        ✓ Saved information applied
                    </div>
                )}
            </div>

            {/* RIGHT SIDE: Order Summary */}
            <div className='mt-8 flex-1'>
                <div className='min-w-80 bg-zinc-50 p-8 rounded-sm border border-zinc-100'>
                    <div className='text-2xl mb-6 font-serif italic border-b pb-4'>Order Summary</div>

                    <div className='mb-6 max-h-48 overflow-y-auto pr-2'>
                        {cartItems.map((item, index) => (
                            <div key={index} className='flex items-center gap-4 mb-3 bg-white p-2 rounded shadow-sm'>
                                <img src={item.image} className='w-12 h-12 object-cover rounded' alt={item.name} />
                                <div className='text-xs flex-1'>
                                    <p className='font-bold uppercase tracking-tighter truncate w-32'>{item.name}</p>
                                    <p className='text-gray-500'>Qty: {item.quantity}</p>
                                </div>
                                <p className='text-xs font-bold'>₹{item.price * item.quantity}</p>
                            </div>
                        ))}
                    </div>

                    <div className='flex flex-col gap-3 text-sm'>
                        <div className='flex justify-between text-gray-600'>
                            <p>Subtotal</p>
                            <p>₹{subtotal.toLocaleString()}.00</p>
                        </div>
                        <div className='flex justify-between text-gray-600'>
                            <p>Shipping Fee</p>
                            <p>₹50.00</p>
                        </div>
                        <div className='flex justify-between font-bold text-xl pt-4 border-t border-zinc-200 mt-2'>
                            <p>Total</p>
                            <p>₹{(subtotal + 50).toLocaleString()}.00</p>
                        </div>
                    </div>

                    <div className='mt-10'>
                        <div className='text-[10px] text-gray-400 mb-4 uppercase tracking-[0.2em] font-bold'>Payment Method</div>
                        <div className='flex items-center gap-3 border p-4 bg-white rounded cursor-default border-zinc-200'>
                            <div className='w-3 h-3 border-2 border-black rounded-full bg-black'></div>
                            <p className='text-gray-700 font-bold uppercase text-[10px] tracking-widest'>Cash on Delivery (COD)</p>
                        </div>
                    </div>

                    <button type='submit' className='bg-black text-white px-16 py-4 text-xs mt-8 w-full uppercase tracking-[0.3em] hover:bg-zinc-800 transition-all font-bold shadow-lg'>
                        Place Order
                    </button>
                </div>
            </div>
        </form>
    );
};

export default CheckoutPage;