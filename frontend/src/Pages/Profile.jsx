import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../Context/authContext';
import api from '../Context/Appcontext';

const Profile = () => {
    const { user, setUser, token } = useContext(AuthContext);
    const navigate = useNavigate();

    const [isEditing, setIsEditing] = useState(false);
    const [loading, setLoading] = useState(true);
    const [updateLoading, setUpdateLoading] = useState(false);
    
    // --- NEW: State for toggling the address list view ---
    const [showAddresses, setShowAddresses] = useState(false);

    // Form State
    const [userData, setUserData] = useState({
        name: '',
        phone: '',
        gender: 'Not Specified',
        dob: '',
        address: [] 
    });

    const loadUserProfileData = async () => {
        try {
            const { data } = await api.get('/auth/profile');
            if (data.success) {
                setUserData(data.user);
                setUser(data.user); 
            }
        } catch (error) {
            console.error("Error loading profile:", error);
        } finally {
            setLoading(false);
        }
    };

    const updateUserProfileData = async () => {
        setUpdateLoading(true);
        try {
            const { data } = await api.put('/auth/updateProfile', userData);

            if (data.success) {
                alert("Profile Updated Successfully!");
                setUser(data.user); 
                setIsEditing(false); 
            }
        } catch (error) {
            alert(error.response?.data?.message || "Update failed");
        } finally {
            setUpdateLoading(false);
        }
    };

    // --- NEW: Function to instantly remove an address ---
    const removeAddress = async (indexToRemove) => {
        // Filter out the address
        const updatedAddresses = userData.address.filter((_, index) => index !== indexToRemove);
        const updatedUserData = { ...userData, address: updatedAddresses };

        // Optimistically update UI
        setUserData(updatedUserData);

        try {
            // Send new array to the backend using your existing update API
            const { data } = await api.put('/auth/updateProfile', updatedUserData);
            if (data.success) {
                setUser(data.user); // Sync global context
            }
        } catch (error) {
            console.error("Failed to delete address:", error);
            alert("Failed to delete address. Please try again.");
            loadUserProfileData(); // Revert to old data if API fails
        }
    };

    useEffect(() => {
        if (token) {
            loadUserProfileData();
        } else {
            navigate('/login');
        }
    }, [token, navigate]);

    if (loading) {
        return (
            <div className='min-h-[60vh] flex items-center justify-center font-serif text-xl animate-pulse text-zinc-500'>
                Loading your details...
            </div>
        );
    }

    return (
        <div className="max-w-6xl mx-auto my-14 px-6 md:px-10">
            
            {/* Header */}
            <div className="flex justify-between items-end mb-10 border-b border-zinc-200 pb-6">
                <div>
                    <h1 className="text-4xl font-serif tracking-tight text-zinc-900 italic">My Account</h1>
                    <p className="text-sm text-zinc-500 mt-2">Manage your personal information and preferences.</p>
                </div>
                
                {/* Action Buttons */}
                {isEditing ? (
                    <div className='flex gap-3'>
                        <button
                            onClick={() => {
                                setIsEditing(false);
                                loadUserProfileData(); // Reset changes
                            }}
                            className="px-6 py-2.5 border border-zinc-300 rounded text-xs uppercase tracking-widest hover:bg-zinc-50 transition-all font-bold"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={updateUserProfileData}
                            disabled={updateLoading}
                            className="px-6 py-2.5 bg-black text-white rounded text-xs uppercase tracking-widest hover:bg-zinc-800 transition-all disabled:bg-zinc-400 font-bold shadow-lg"
                        >
                            {updateLoading ? "Saving..." : "Save Changes"}
                        </button>
                    </div>
                ) : (
                    <button
                        onClick={() => setIsEditing(true)}
                        className="px-8 py-2.5 bg-black text-white rounded text-xs uppercase tracking-widest hover:bg-zinc-800 transition-all font-bold shadow-lg"
                    >
                        Edit Profile
                    </button>
                )}
            </div>

            <div className="flex flex-col lg:flex-row gap-16">
                
                {/* LEFT SIDEBAR: Avatar & Quick Links */}
                <div className="flex flex-col items-center lg:items-start lg:w-1/4">
                    <div className="w-32 h-32 bg-zinc-100 text-zinc-800 text-5xl flex items-center justify-center rounded-full shadow-inner border border-zinc-200 mb-4 font-serif italic">
                        {userData?.name?.[0]?.toUpperCase()}
                    </div>
                    <h2 className="text-xl font-bold">{userData.name}</h2>
                    <p className='text-xs text-zinc-400 uppercase tracking-widest mt-1 mb-8'>
                        Member since {new Date(userData?.createdAt || Date.now()).getFullYear()}
                    </p>

                    {/* Dashboard Navigation */}
                    <div className="w-full flex flex-col gap-2 border-t border-zinc-100 pt-6">
                        <button onClick={() => navigate('/orders')} className="text-left py-2 text-sm text-zinc-600 hover:text-black hover:font-bold transition-all">Order History</button>
                        <button onClick={() => navigate('/favorites')} className="text-left py-2 text-sm text-zinc-600 hover:text-black hover:font-bold transition-all">My Favorites</button>
                        <button className="text-left py-2 text-sm font-bold text-black flex justify-between items-center">
                            Personal Information <span className="text-xs">→</span>
                        </button>
                    </div>
                </div>

                {/* RIGHT COLUMN: Information Grid */}
                <div className="flex-1">
                    <h3 className="text-lg font-serif italic mb-6">Personal Details</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-y-8 gap-x-12 bg-zinc-50 p-8 rounded border border-zinc-100">

                        {/* Full Name */}
                        <div className="flex flex-col gap-2">
                            <label className="text-[10px] uppercase text-zinc-500 font-bold tracking-widest">Full Name</label>
                            {isEditing ? (
                                <input
                                    type="text"
                                    className="border-b border-zinc-300 focus:border-black bg-transparent outline-none py-1 text-base transition-all"
                                    value={userData.name}
                                    onChange={(e) => setUserData({ ...userData, name: e.target.value })}
                                />
                            ) : (
                                <p className="text-base text-zinc-800 font-medium">{userData.name}</p>
                            )}
                        </div>

                        {/* Email */}
                        <div className="flex flex-col gap-2">
                            <label className="text-[10px] uppercase text-zinc-500 font-bold tracking-widest flex items-center gap-2">
                                Email Address <span className="text-[8px] bg-zinc-200 px-1.5 py-0.5 rounded text-zinc-600">Locked</span>
                            </label>
                            <p className="text-base text-zinc-500 cursor-not-allowed">{userData.email}</p>
                        </div>

                        {/* Phone Number */}
                        <div className="flex flex-col gap-2">
                            <label className="text-[10px] uppercase text-zinc-500 font-bold tracking-widest">Phone Number</label>
                            {isEditing ? (
                                <input
                                    type="text"
                                    className="border-b border-zinc-300 focus:border-black bg-transparent outline-none py-1 text-base transition-all"
                                    value={userData.phone}
                                    onChange={(e) => setUserData({ ...userData, phone: e.target.value })}
                                />
                            ) : (
                                <p className="text-base text-zinc-800">{userData.phone || "—"}</p>
                            )}
                        </div>

                        {/* Gender */}
                        <div className="flex flex-col gap-2">
                            <label className="text-[10px] uppercase text-zinc-500 font-bold tracking-widest">Gender</label>
                            {isEditing ? (
                                <select
                                    className="border-b border-zinc-300 focus:border-black bg-transparent outline-none py-1 text-base cursor-pointer"
                                    value={userData.gender}
                                    onChange={(e) => setUserData({ ...userData, gender: e.target.value })}
                                >
                                    <option value="Not Specified">Not Specified</option>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                    <option value="Other">Other</option>
                                </select>
                            ) : (
                                <p className="text-base text-zinc-800">{userData.gender || "Not Specified"}</p>
                            )}
                        </div>

                        {/* Date of Birth */}
                        <div className="flex flex-col gap-2">
                            <label className="text-[10px] uppercase text-zinc-500 font-bold tracking-widest">Date of Birth</label>
                            {isEditing ? (
                                <input
                                    type="date"
                                    className="border-b border-zinc-300 focus:border-black bg-transparent outline-none py-1 text-base transition-all"
                                    value={userData.dob || ''}
                                    onChange={(e) => setUserData({ ...userData, dob: e.target.value })}
                                />
                            ) : (
                                <p className="text-base text-zinc-800">{userData.dob ? new Date(userData.dob).toLocaleDateString() : "—"}</p>
                            )}
                        </div>

                    </div>

                    {/* --- UPDATED: Address Summary Section with Functionality --- */}
                    <div className="mt-12">
                        <div className="flex justify-between items-end mb-6 border-b border-zinc-100 pb-2">
                            <h3 className="text-lg font-serif italic">Saved Addresses</h3>
                        </div>
                        
                        <div className="bg-white border border-zinc-200 p-6 rounded flex justify-between items-center mb-4">
                            <div>
                                <p className="text-sm font-bold uppercase tracking-tight">Delivery Locations</p>
                                <p className="text-xs text-zinc-500 mt-1">
                                    You have {Array.isArray(userData.address) ? userData.address.length : 0} saved addresses for fast checkout.
                                </p>
                            </div>
                            
                            {/* Toggle Button */}
                            {Array.isArray(userData.address) && userData.address.length > 0 && (
                                <button 
                                    onClick={() => setShowAddresses(!showAddresses)}
                                    className="text-xs font-bold uppercase tracking-widest hover:underline text-black"
                                >
                                    {showAddresses ? "Hide" : "View All"}
                                </button>
                            )}
                        </div>

                        {/* Expandable Address List */}
                        {showAddresses && Array.isArray(userData.address) && (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                                {userData.address.map((addr, index) => (
                                    <div key={index} className="border border-zinc-200 p-5 rounded relative group hover:border-black transition-colors bg-zinc-50">
                                        
                                        <div className="flex justify-between items-start mb-2">
                                            <p className="text-sm font-bold uppercase tracking-tighter">
                                                {addr.firstName} {addr.lastName}
                                            </p>
                                            {index === 0 && (
                                                <span className="text-[9px] bg-black text-white px-2 py-0.5 rounded uppercase tracking-widest">Default</span>
                                            )}
                                        </div>
                                        
                                        <p className="text-xs text-zinc-600 mt-1">{addr.street}</p>
                                        <p className="text-xs text-zinc-500">{addr.city}, {addr.state} {addr.zipcode}</p>
                                        <p className="text-xs text-zinc-500 mt-2 font-medium">Ph: {addr.phone}</p>

                                        {/* Delete Button */}
                                        <button 
                                            onClick={() => removeAddress(index)}
                                            className="absolute top-4 right-4 text-[10px] text-red-500 opacity-0 group-hover:opacity-100 transition-opacity font-bold uppercase tracking-widest hover:underline"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Profile;