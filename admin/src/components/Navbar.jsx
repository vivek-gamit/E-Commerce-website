import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext} from '../context/authcontext'
import { User, LogOut, ShieldCheck } from 'lucide-react'

const Navbar = () => {
    const navigate = useNavigate();
    const { user, setUser, setToken } = useContext(AuthContext);
    const [showMenu, setShowMenu] = useState(false);

    const logout = () => {
        setToken('');
        setUser(null);
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/login');
    };

    return (
        <nav className='flex justify-between items-center px-8 h-20 bg-white border-b border-gray-100 sticky top-0 z-[1000]'>
            
            {/* Logo & Admin Badge */}
            <div className='flex items-center gap-3 cursor-pointer' onClick={() => navigate('/')}>
                <div className='flex flex-col'>
                    <h1 className='text-2xl font-bold tracking-tighter leading-none'>FASHION</h1>
                    <span className='text-[9px] uppercase tracking-[0.4em] text-gray-400 font-black mt-1'>
                        Admin Console
                    </span>
                </div>
                <div className='hidden sm:flex items-center gap-1 bg-zinc-50 px-2 py-1 rounded border border-zinc-100'>
                    <ShieldCheck size={12} className='text-zinc-400' />
                    <span className='text-[10px] font-bold text-zinc-500 uppercase'>Secure</span>
                </div>
            </div>

            {/* Right Side: User Profile & Actions */}
            <div className='flex items-center gap-4'>
                <div className='text-right hidden md:block'>
                    <p className='text-sm font-bold text-black leading-none'>{user?.name || "Admin User"}</p>
                    <p className='text-[10px] text-green-500 font-bold uppercase tracking-wider mt-1'>Online</p>
                </div>

                {/* Profile Dropdown Container */}
                <div 
                    className='relative'
                    onMouseEnter={() => setShowMenu(true)}
                    onMouseLeave={() => setShowMenu(false)}
                >
                    {/* Avatar Button */}
                    <button className='w-10 h-10 rounded-full bg-black text-white flex items-center justify-center text-sm font-bold hover:bg-zinc-800 transition-colors shadow-sm'>
                        {user?.name ? user.name[0].toUpperCase() : <User size={18} />}
                    </button>

                    {/* Simple Dropdown (No complex animation) */}
                    {showMenu && (
                        <div className='absolute right-0 top-full pt-2 w-48'>
                            <div className='bg-white border border-gray-100 rounded-xl shadow-xl py-2 overflow-hidden'>
                                <div className='px-4 py-2 border-b border-gray-50 mb-1'>
                                    <p className='text-[10px] text-gray-400 font-bold uppercase tracking-widest'>Role</p>
                                    <p className='text-xs font-semibold text-zinc-700 capitalize'>{user?.role || "Administrator"}</p>
                                </div>
                                
                                <button 
                                    onClick={() => navigate('/profile')}
                                    className='w-full text-left px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 flex items-center gap-2'
                                >
                                    <User size={14} /> Profile Settings
                                </button>
                                
                                <button 
                                    onClick={logout}
                                    className='w-full text-left px-4 py-2 text-sm text-red-500 font-medium hover:bg-red-50 flex items-center gap-2 mt-1'
                                >
                                    <LogOut size={14} /> Sign Out
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    )
}

export default Navbar