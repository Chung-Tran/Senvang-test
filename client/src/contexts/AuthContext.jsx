// src/contexts/AuthContext.jsx
import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    // Trong môi trường thật, bạn sẽ lưu JWT vào localStorage
    // localStorage.setItem('token', token);
    // const [token, setToken] = useState(localStorage.getItem('token'));

    const [token, setToken] = useState('demo-jwt-token'); // Mock JWT token
    const [user, setUser] = useState({
        id: 1,
        name: 'Admin User',
        email: 'admin@example.com',
        role: 'admin'
    });

    const login = (userData, authToken) => {
        setUser(userData);
        setToken(authToken);
        // localStorage.setItem('token', authToken);
    };

    const logout = () => {
        setUser(null);
        setToken(null);
        // localStorage.removeItem('token');
    };

    const isAuthenticated = !!token;

    const value = {
        user,
        token,
        isAuthenticated,
        login,
        logout,
        setToken,
        setUser
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within AuthProvider');
    }
    return context;
};