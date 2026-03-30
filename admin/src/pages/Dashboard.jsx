import React from 'react';
import { IndianRupee, ShoppingBag, Users, Package, ArrowRight, TrendingUp } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const navigate = useNavigate();

    // NOTE: These are placeholder values. Later, you will fetch these from your backend!
    const stats = {
        revenue: "1,24,500",
        orders: "42",
        products: "128",
        users: "89"
    };

    const recentOrders = [
        { id: "ORD-8291", customer: "Vivek Gamit", amount: "4,999", status: "Order Placed", date: "Today, 10:23 AM" },
        { id: "ORD-8290", customer: "Rahul Sharma", amount: "1,299", status: "Packing", date: "Today, 09:15 AM" },
        { id: "ORD-8289", customer: "Priya Patel", amount: "8,450", status: "Shipped", date: "Yesterday" },
        { id: "ORD-8288", customer: "Amit Singh", amount: "500", status: "Delivered", date: "Yesterday" },
    ];

    return (
        <div className="p-8 max-w-7xl mx-auto">
            
            <div className="flex justify-between items-end mb-8">
                <div>
                    <h1 className="text-3xl font-bold uppercase tracking-tight text-zinc-900">Store Overview</h1>
                    <p className="text-sm text-zinc-500 mt-1">Here is what's happening with your store today.</p>
                </div>
            </div>

            {/* --- TOP ROW: KPI CARDS --- */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                {/* Revenue Card */}
                <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm hover:border-black transition-colors">
                    <div className="flex justify-between items-start mb-4">
                        <div className="bg-green-50 p-3 rounded-xl">
                            <IndianRupee size={24} className="text-green-600" />
                        </div>
                        <span className="flex items-center text-xs font-bold text-green-500 bg-green-50 px-2 py-1 rounded-full">
                            <TrendingUp size={12} className="mr-1" /> +12%
                        </span>
                    </div>
                    <p className="text-xs text-zinc-500 font-bold uppercase tracking-widest mb-1">Total Revenue</p>
                    <h3 className="text-3xl font-black text-zinc-900">₹{stats.revenue}</h3>
                </div>

                {/* Orders Card */}
                <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm hover:border-black transition-colors">
                    <div className="flex justify-between items-start mb-4">
                        <div className="bg-blue-50 p-3 rounded-xl">
                            <Package size={24} className="text-blue-600" />
                        </div>
                    </div>
                    <p className="text-xs text-zinc-500 font-bold uppercase tracking-widest mb-1">Total Orders</p>
                    <h3 className="text-3xl font-black text-zinc-900">{stats.orders}</h3>
                </div>

                {/* Products Card */}
                <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm hover:border-black transition-colors">
                    <div className="flex justify-between items-start mb-4">
                        <div className="bg-purple-50 p-3 rounded-xl">
                            <ShoppingBag size={24} className="text-purple-600" />
                        </div>
                    </div>
                    <p className="text-xs text-zinc-500 font-bold uppercase tracking-widest mb-1">Total Products</p>
                    <h3 className="text-3xl font-black text-zinc-900">{stats.products}</h3>
                </div>

                {/* Users Card */}
                <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm hover:border-black transition-colors">
                    <div className="flex justify-between items-start mb-4">
                        <div className="bg-orange-50 p-3 rounded-xl">
                            <Users size={24} className="text-orange-600" />
                        </div>
                    </div>
                    <p className="text-xs text-zinc-500 font-bold uppercase tracking-widest mb-1">Total Customers</p>
                    <h3 className="text-3xl font-black text-zinc-900">{stats.users}</h3>
                </div>
            </div>

            {/* --- MIDDLE SECTION: RECENT ORDERS --- */}
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
                <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                    <h2 className="text-lg font-bold uppercase tracking-tight">Recent Orders</h2>
                    <button 
                        onClick={() => navigate('/orders')}
                        className="text-xs font-bold text-zinc-500 hover:text-black flex items-center gap-1 uppercase tracking-widest"
                    >
                        View All <ArrowRight size={14} />
                    </button>
                </div>
                
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm text-zinc-600">
                        <thead className="bg-gray-50 text-xs uppercase tracking-widest font-bold text-zinc-500">
                            <tr>
                                <th className="px-6 py-4">Order ID</th>
                                <th className="px-6 py-4">Customer</th>
                                <th className="px-6 py-4">Amount</th>
                                <th className="px-6 py-4">Date</th>
                                <th className="px-6 py-4">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {recentOrders.map((order, index) => (
                                <tr key={index} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4 font-medium text-zinc-900">{order.id}</td>
                                    <td className="px-6 py-4">{order.customer}</td>
                                    <td className="px-6 py-4 font-bold text-zinc-900">₹{order.amount}</td>
                                    <td className="px-6 py-4 text-xs">{order.date}</td>
                                    <td className="px-6 py-4">
                                        <span className={`px-3 py-1 text-[10px] font-bold uppercase tracking-widest rounded-full 
                                            ${order.status === 'Order Placed' ? 'bg-yellow-50 text-yellow-600' : 
                                              order.status === 'Shipped' ? 'bg-blue-50 text-blue-600' : 
                                              order.status === 'Delivered' ? 'bg-green-50 text-green-600' : 
                                              'bg-zinc-100 text-zinc-600'}`}
                                        >
                                            {order.status}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

        </div>
    );
};

export default Dashboard;