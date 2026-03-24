import { createContext, useState } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const navigate = useNavigate();

    // Read token from cookies instead of localStorage
    const [token, setToken] = useState(Cookies.get('token') || "");
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')) || null);

    // Function to handle login (to be called from your Login page)
    const login = (newToken, userData) => {
        // Set cookie (expires in 7 days)
        Cookies.set('token', newToken, { expires: 7, secure: true, sameSite: 'strict' });
        localStorage.setItem('user', JSON.stringify(userData));
        
        setToken(newToken);
        setUser(userData);
    };

    // Function to handle logout
    const logout = () => {
        Cookies.remove('token'); // Remove from cookies
        localStorage.removeItem('user');
        
        setToken("");
        setUser(null);
        navigate('/login');
    };

    return (
        <AuthContext.Provider value={{ token, setToken, user, setUser, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};