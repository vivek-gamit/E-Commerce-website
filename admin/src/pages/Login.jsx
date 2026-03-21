import React, { useState, useContext } from 'react'
import axios from 'axios'
import { AuthContext } from '../context/authcontext'
import { toast } from 'react-toastify'

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const { setToken, backendUrl } = useContext(AuthContext)

    const onSubmitHandler = async (e) => {
        try {
            e.preventDefault();
            const response = await axios.post(backendUrl +'/api/admin/adminlogin', { email, password })
            
            if (response.data.success) {
                setToken(response.data.token)
                toast.success("Access Granted: Welcome Admin")
            } else {
                toast.error(response.data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    return (
        <div className='min-h-screen flex items-center justify-center bg-gray-50'>
            <div className='bg-white shadow-2xl rounded-2xl px-10 py-12 max-w-md w-full border border-gray-100'>
                <h1 className='text-3xl font-bold tracking-tighter mb-2 text-center'>FASHION</h1>
                <p className='text-xs text-center text-gray-400 uppercase tracking-[0.3em] mb-8'>Admin Portal</p>
                
                <form onSubmit={onSubmitHandler}>
                    <div className='mb-4'>
                        <p className='text-xs font-bold uppercase mb-2 text-gray-700'>Email Address</p>
                        <input onChange={(e)=>setEmail(e.target.value)} value={email} className='rounded-lg w-full px-4 py-3 border border-gray-200 outline-none focus:border-black transition-all' type="email" placeholder='admin@fashion.com' required />
                    </div>
                    <div className='mb-6'>
                        <p className='text-xs font-bold uppercase mb-2 text-gray-700'>Password</p>
                        <input onChange={(e)=>setPassword(e.target.value)} value={password} className='rounded-lg w-full px-4 py-3 border border-gray-200 outline-none focus:border-black transition-all' type="password" placeholder='Enter password' required />
                    </div>
                    <button type='submit' className='mt-2 w-full py-3 px-4 rounded-lg bg-black text-white font-bold uppercase tracking-widest hover:bg-zinc-800 active:scale-95 transition-all'>
                        Login to Console
                    </button>
                </form>
            </div>
        </div>
    )
}

export default Login