import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../Context/authContext';
import api from '../Context/Appcontext'; // Your Axios instance

const Profile = () => {
    const { user, setUser, token } = useContext(AuthContext);

    
    const [isEditing, setIsEditing] = useState(false);
    const [loading, setLoading] = useState(true);
    const [updateLoading, setUpdateLoading] = useState(false);

    // Form State
    const [userData, setUserData] = useState({
        name: '',
        phone: '',
        address: '',
        gender: 'Not Specified',
        dob: ''
    });

   
    const loadUserProfileData = async () => {
        try {
            const { data } = await api.get('/auth/profile');
            if (data.success) {
                setUserData(data.user);
                setUser(data.user); // Sync Global Context
            }
        } catch (error) {
            console.error("Error loading profile:", error);
        } finally {
            setLoading(false);
        }
    };

    // Update Profile Data in Backend
    const updateUserProfileData = async () => {
        setUpdateLoading(true);
        try {
            const { data } = await api.put('/auth/update-profile', userData);

            if (data.success) {
                alert("Profile Updated Successfully!");
                setUser(data.user); // Update Global Context with new data
                setIsEditing(false); // Switch back to view mode
            }
        } catch (error) {
            alert(error.response?.data?.message || "Update failed");
        } finally {
            setUpdateLoading(false);
        }
    };

    useEffect(() => {
        if (token) {
            loadUserProfileData();
        }
    }, [token]);

    if (loading) {
        return (
            <div className='min-h-[60vh] flex items-center justify-center font-serif text-xl animate-pulse'>
                Loading your wardrobe...
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto my-10 p-4 md:p-8 bg-white rounded-2xl border border-gray-100 shadow-sm">
            <div className="flex justify-between items-center mb-10 border-b pb-6">
                <h1 className="text-4xl font-serif tracking-tight text-zinc-900">My Profile</h1>

                {isEditing ? (
                    <div className='flex gap-3'>
                        <button
                            onClick={() => setIsEditing(false)}
                            className="px-6 py-2 border border-gray-200 rounded-full text-sm hover:bg-gray-50 transition-all"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={updateUserProfileData}
                            disabled={updateLoading}
                            className="px-6 py-2 bg-black text-white rounded-full text-sm hover:bg-zinc-800 transition-all disabled:bg-zinc-400"
                        >
                            {updateLoading ? "Saving..." : "Save Changes"}
                        </button>
                    </div>
                ) : (
                    <button
                        onClick={() => setIsEditing(true)}
                        className="px-8 py-2 border border-black rounded-full text-sm font-medium hover:bg-black hover:text-white transition-all active:scale-95"
                    >
                        Edit Profile
                    </button>
                )}
            </div>

            <div className="flex flex-col md:flex-row gap-12">
                {/* Avatar Column */}
                <div className="flex flex-col items-center gap-4">
                    <div className="w-40 h-40 bg-zinc-900 text-white text-5xl flex items-center justify-center rounded-full shadow-2xl border-4 border-white">
                        {userData?.name?.[0]}
                    </div>
                    <p className='text-xs text-gray-400 uppercase tracking-tighter'>Member since {new Date(userData?.createdAt).getFullYear()}</p>
                </div>

                {/* Information Grid */}
                <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-y-8 gap-x-12">

                    {/* Full Name */}
                    <div className="flex flex-col gap-2">
                        <label className="text-[10px] uppercase text-gray-400 font-bold tracking-widest">Full Name</label>
                        {isEditing ? (
                            <input
                                type="text"
                                className="border-b-2 border-gray-100 focus:border-black outline-none py-1 text-lg transition-all"
                                value={userData.name}
                                onChange={(e) => setUserData({ ...userData, name: e.target.value })}
                            />
                        ) : (
                            <p className="text-lg text-zinc-800 font-medium">{userData.name}</p>
                        )}
                    </div>

                    {/* Email (Non-editable for security) */}
                    <div className="flex flex-col gap-2 opacity-60">
                        <label className="text-[10px] uppercase text-gray-400 font-bold tracking-widest">Email Address</label>
                        <p className="text-lg text-zinc-500 cursor-not-allowed">{userData.email}</p>
                    </div>

                    {/* Phone Number */}
                    <div className="flex flex-col gap-2">
                        <label className="text-[10px] uppercase text-gray-400 font-bold tracking-widest">Phone Number</label>
                        {isEditing ? (
                            <input
                                type="text"
                                className="border-b-2 border-gray-100 focus:border-black outline-none py-1 text-lg transition-all"
                                value={userData.phone}
                                onChange={(e) => setUserData({ ...userData, phone: e.target.value })}
                            />
                        ) : (
                            <p className="text-lg text-zinc-800">{userData.phone || "Click edit to add"}</p>
                        )}
                    </div>

                    {/* Gender */}
                    <div className="flex flex-col gap-2">
                        <label className="text-[10px] uppercase text-gray-400 font-bold tracking-widest">Gender</label>
                        {isEditing ? (
                            <select
                                className="border-b-2 border-gray-100 focus:border-black outline-none py-1 text-lg bg-transparent"
                                value={userData.gender}
                                onChange={(e) => setUserData({ ...userData, gender: e.target.value })}
                            >
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Other">Other</option>
                            </select>
                        ) : (
                            <p className="text-lg text-zinc-800">{userData.gender}</p>
                        )}
                    </div>

                    {/* Address */}
                    <div className="flex flex-col gap-2 md:col-span-2">
                        <label className="text-[10px] uppercase text-gray-400 font-bold tracking-widest">Delivery Address</label>
                        {isEditing ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                <input
                                    placeholder="Line 1"
                                    className="border p-2 rounded"
                                    value={userData.address?.line1 || ''}
                                    onChange={(e) => setUserData({ ...userData, address: { ...userData.address, line1: e.target.value } })}
                                />
                                <input
                                    placeholder="City"
                                    className="border p-2 rounded"
                                    value={userData.address?.city || ''}
                                    onChange={(e) => setUserData({ ...userData, address: { ...userData.address, city: e.target.value } })}
                                />
                                {/* Add more inputs for state and pincode as needed */}
                            </div>
                        ) : (
                            <p className="text-lg text-zinc-800 leading-relaxed">
                                {`${userData.address?.line1}, ${userData.address?.city}, ${userData.address?.state} - ${userData.address?.pincode}`}
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;