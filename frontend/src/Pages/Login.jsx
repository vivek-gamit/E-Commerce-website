import React, { useState, useContext, useEffect } from 'react';
import api from '../Context/Appcontext'; // This is your Axios instance
import { AuthContext } from '../Context/authContext'; // This is your Context
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [state, setState] = useState('Sign Up');
    const [loading, setLoading] = useState(false);
    
    // Form States
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    
    const navigate = useNavigate();
    const { setToken, setUser } = useContext(AuthContext);

    // Clear fields when switching between Login and Sign Up
    useEffect(() => {
        setName('');
        setEmail('');
        setPassword('');
        setPhone('');
    }, [state]);

    const onSubmitHandler = async (event) => {
        event.preventDefault();
        setLoading(true);

        try {
            if (state === 'Sign Up') {
                // REGISTER API
                const { data } = await api.post('/auth/register', { name, email, password, phone });
                if (data.success) {
                    alert("Registration Successful! Please Login.");
                    setState('Login');
                }
            } else {
                // LOGIN API
                const { data } = await api.post('/auth/login', { email, password });
                
                if (data.success) {
                    // Update Global State immediately
                    setToken(data.token);
                    setUser(data.user);

                    // Persistent Storage
                    localStorage.setItem('token', data.token);
                    localStorage.setItem('user', JSON.stringify(data.user));
                    
                    navigate('/'); 
                }
            }
        } catch (error) {
            console.error(error);
            alert(error.response?.data?.message || "An error occurred. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-[90vh] flex items-center justify-center px-4 bg-gray-50">
            <form 
                onSubmit={onSubmitHandler} 
                className="flex flex-col items-center w-full sm:max-w-md m-auto gap-6 p-10 border border-gray-100 rounded-2xl shadow-xl bg-white"
            >
                <div className="flex flex-col items-center gap-2 mb-4">
                    <h2 className="text-4xl font-serif tracking-tight text-black">{state}</h2>
                    <div className="h-1 w-12 bg-black rounded-full"></div>
                </div>

                <p className="text-gray-400 text-sm tracking-wide uppercase font-medium">
                    {state === 'Sign Up' ? "Join the fashion world" : "Welcome back"}
                </p>

                <div className="w-full flex flex-col gap-4">
                    {state === 'Sign Up' && (
                        <>
                            <input 
                                type="text" 
                                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-1 focus:ring-black outline-none" 
                                placeholder="Full Name" 
                                onChange={(e)=>setName(e.target.value)} 
                                value={name} 
                                required 
                            />
                            <input 
                                type="text" 
                                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-1 focus:ring-black outline-none" 
                                placeholder="Phone Number" 
                                onChange={(e)=>setPhone(e.target.value)} 
                                value={phone} 
                                required 
                            />
                        </>
                    )}
                    
                    <input 
                        type="email" 
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-1 focus:ring-black outline-none" 
                        placeholder="Email Address" 
                        onChange={(e)=>setEmail(e.target.value)} 
                        value={email} 
                        required 
                    />
                    
                    <input 
                        type="password" 
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-1 focus:ring-black outline-none" 
                        placeholder="Password" 
                        onChange={(e)=>setPassword(e.target.value)} 
                        value={password} 
                        required 
                    />
                </div>

                <div className="w-full flex justify-between text-xs text-gray-500">
                    <span className="cursor-pointer hover:text-black">Forgot password?</span>
                    {state === 'Sign Up' 
                        ? <span onClick={() => setState('Login')} className="cursor-pointer text-black font-bold hover:underline">Login here</span>
                        : <span onClick={() => setState('Sign Up')} className="cursor-pointer text-black font-bold hover:underline">Create account</span>
                    }
                </div>

                <button 
                    disabled={loading}
                    type="submit" 
                    className="w-full bg-black text-white uppercase tracking-[0.2em] text-xs font-bold py-4 mt-2 rounded-lg hover:bg-zinc-800 active:scale-[0.98] transition-all disabled:bg-gray-400"
                >
                    {loading ? "Processing..." : (state === 'Sign Up' ? "Register" : "Login")}
                </button>
            </form>
        </div>
    );
};

export default Login;