import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Admin from './components/Admin';
import Home from './components/Home';
import Navigation from './components/Navigation';
import './styles/style.css';

const App = () => {
    const [token, setToken] = useState('');
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        const savedToken = localStorage.getItem('token');
        const savedIsAdmin = localStorage.getItem('isAdmin') === 'true';

        if (savedToken) {
            setToken(savedToken);
            setIsAuthenticated(true);
            setIsAdmin(savedIsAdmin);
        }
    }, []);

    const handleLogout = () => {
        setIsAuthenticated(false);
        setToken('');
        setIsAdmin(false);
        localStorage.removeItem('token');
        localStorage.removeItem('isAdmin');
    };

    const handleLogin = (newToken, isAdmin) => {
        setToken(newToken);
        setIsAuthenticated(true);
        setIsAdmin(isAdmin);
        localStorage.setItem('token', newToken);
        localStorage.setItem('isAdmin', isAdmin);
    };

    return (
        <Router>
            <Navigation isAuthenticated={isAuthenticated} isAdmin={isAdmin} onLogout={handleLogout} />
            <Routes>
                
                <Route path="/" element={isAuthenticated ? (isAdmin ? <Navigate to="/admin" /> : <Home />) : <Home />} />
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login setToken={handleLogin} setIsAuthenticated={setIsAuthenticated} />} />
                <Route path="/dashboard" element={isAuthenticated && !isAdmin ? <Dashboard token={token} /> : <Navigate to="/login" />} />
                <Route path="/admin" element={isAuthenticated && isAdmin ? <Admin /> : <Navigate to="/login" />} />
                <Route path="*" element={<Navigate to="/" />} />
            </Routes>
        </Router>
    );
};

export default App;