import React, { useContext } from 'react'
import { AuthContext } from '../context/authcontext'
import { User, Mail, ShieldCheck, Calendar } from 'lucide-react'

const Profile = () => {
  const { user } = useContext(AuthContext);

  // Fallback data if user object isn't fully populated yet
  const adminData = {
    name: user?.name || "System Administrator",
    email: user?.email || "admin@fashion.com",
    role: "Super Admin",
    joined: "March 2026"
  }

  return (
    <div className='max-w-4xl mx-auto'>
      <div className='mb-8'>
        <h2 className='text-2xl font-bold tracking-tight text-black uppercase'>Account Overview</h2>
        <p className='text-sm text-gray-400'>Manage your administrator profile and security settings.</p>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
        
        {/* Left Side: Avatar & Status */}
        <div className='bg-white p-8 rounded-2xl border border-gray-100 shadow-sm flex flex-col items-center text-center'>
          <div className='w-24 h-24 bg-black text-white rounded-full flex items-center justify-center text-3xl font-bold mb-4 shadow-lg'>
            {adminData.name[0]}
          </div>
          <h3 className='font-bold text-lg'>{adminData.name}</h3>
          <p className='text-xs font-bold text-green-500 bg-green-50 px-3 py-1 rounded-full uppercase mt-2'>
            Active Session
          </p>
        </div>

        {/* Right Side: Details Card */}
        <div className='md:col-span-2 bg-white p-8 rounded-2xl border border-gray-100 shadow-sm'>
          <div className='space-y-6'>
            
            <div className='flex items-center gap-4'>
              <div className='p-3 bg-gray-50 rounded-xl text-gray-400'>
                <Mail size={20} />
              </div>
              <div>
                <p className='text-[10px] font-bold text-gray-400 uppercase tracking-widest'>Email Address</p>
                <p className='font-semibold'>{adminData.email}</p>
              </div>
            </div>

            <div className='flex items-center gap-4'>
              <div className='p-3 bg-gray-50 rounded-xl text-gray-400'>
                <ShieldCheck size={20} />
              </div>
              <div>
                <p className='text-[10px] font-bold text-gray-400 uppercase tracking-widest'>Access Level</p>
                <p className='font-semibold text-zinc-700'>{adminData.role}</p>
              </div>
            </div>

            <div className='flex items-center gap-4'>
              <div className='p-3 bg-gray-50 rounded-xl text-gray-400'>
                <Calendar size={20} />
              </div>
              <div>
                <p className='text-[10px] font-bold text-gray-400 uppercase tracking-widest'>Member Since</p>
                <p className='font-semibold'>{adminData.joined}</p>
              </div>
            </div>

          </div>

          <hr className='my-8 border-gray-50' />

          <div className='flex gap-4'>
            <button className='px-6 py-2 bg-black text-white text-xs font-bold uppercase tracking-widest rounded-lg hover:bg-zinc-800 transition-all'>
              Edit Profile
            </button>
            <button className='px-6 py-2 border border-gray-200 text-xs font-bold uppercase tracking-widest rounded-lg hover:bg-gray-50 transition-all'>
              Change Password
            </button>
          </div>
        </div>

      </div>
    </div>
  )
}

export default Profile