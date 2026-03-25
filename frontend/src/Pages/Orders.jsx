import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../Context/authContext';

const Orders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const { token } = useContext(AuthContext);

    const fetchOrders = async () => {
        try {
            const response = await axios.get('http://localhost:3000/api/order/myOrders', { withCredentials: true });
            if (response.data.success) {
                // We flatten the items so each product shows as its own row
                let allOrdersItem = [];
                response.data.orders.map((order) => {
                    order.items.map((item) => {
                        item['status'] = order.status;
                        item['payment'] = order.payment;
                        item['paymentMethod'] = order.paymentMethod;
                        item['date'] = order.date;
                        allOrdersItem.push(item);
                    });
                });
                setOrders(allOrdersItem.reverse());
            }
        } catch (error) {
            console.error("Order Fetch Error", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (token) fetchOrders();
    }, [token]);

    if (loading) return <div className='p-20 text-center font-serif text-2xl italic'>Loading your history...</div>;

    return (
        <div className='px-10 py-16 border-t'>
            <div className='text-3xl font-serif italic mb-8'>My Orders</div>

            <div className='flex flex-col gap-6'>
                {orders.length === 0 ? (
                    <p className='text-gray-500'>You haven't placed any orders yet.</p>
                ) : (
                    orders.map((item, index) => (
                        <div key={index} className='py-4 border-t border-b text-gray-700 flex flex-col md:flex-row md:items-center md:justify-between gap-4'>
                            <div className='flex items-start gap-6 text-sm'>
                                <img className='w-16 sm:w-20 object-cover rounded' src={item.image} alt={item.name} />
                                <div>
                                    <p className='sm:text-base font-bold uppercase tracking-tight'>{item.name}</p>
                                    <div className='flex items-center gap-3 mt-1 text-base text-gray-700'>
                                        <p>₹{item.price}</p>
                                        <p>Quantity: {item.quantity}</p>
                                    </div>
                                    <p className='mt-1 text-xs text-gray-400'>Date: <span className='text-gray-500'>{new Date(item.date).toDateString()}</span></p>
                                    <p className='mt-1 text-xs text-gray-400'>Payment: <span className='text-gray-500'>{item.paymentMethod}</span></p>
                                </div>
                            </div>
                            <div className='md:w-1/2 flex justify-between items-center'>
                                <div className='flex items-center gap-2'>
                                    <p className='min-w-2 h-2 rounded-full bg-green-500'></p>
                                    <p className='text-sm md:text-base'>{item.status}</p>
                                </div>
                                <button onClick={fetchOrders} className='border px-4 py-2 text-sm font-medium rounded-sm hover:bg-black hover:text-white transition-all'>
                                    Track Order
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default Orders;