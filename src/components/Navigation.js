import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/navigation.css';

const Navigation = ({ isAuthenticated, isAdmin, onLogout }) => {
    return (
        <div className="nav-container">
            <nav>
                <Link to="/" className="logo">Granat</Link>
                <div>
                    {!isAuthenticated ? (
                        <>
                            <Link to="/register">Регистрация</Link>
                            <Link to="/login">Вход</Link>
                        </>
                    ) : (
                        <>
                            {!isAdmin && <Link to="/dashboard">Заявки</Link>}
                            <button onClick={onLogout}>Выход</button>
                        </>
                    )}
                </div>
            </nav>
        </div>
    );
};

export default Navigation;
