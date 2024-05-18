import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = ({ setToken, setIsAuthenticated }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState(''); // Поле для имени
    const [lastName, setLastName] = useState(''); // Поле для фамилии
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('https://diplom-server-pi.vercel.app/login', { username, password, firstName, lastName });
            console.log('Login response:', response); // Логирование ответа от сервера

            if (response.data.token) {
                setToken(response.data.token);
                setIsAuthenticated(true);
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('isAdmin', response.data.isAdmin);

                if (response.data.isAdmin) {
                    navigate('/admin');
                } else {
                    navigate('/dashboard');
                }
            }
        } catch (error) {
            console.error('Login error', error);
            alert('Invalid credentials');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h1>Вход</h1>
            <input type="text" placeholder="Фамилия" value={firstName} onChange={e => setFirstName(e.target.value)} required />
            <input type="text" placeholder="Имя" value={username} onChange={e => setUsername(e.target.value)} required />
            <input type="text" placeholder="Отчество" value={lastName} onChange={e => setLastName(e.target.value)} required />
            <input type="password" placeholder="Пароль" value={password} onChange={e => setPassword(e.target.value)} required />
            <button type="submit">Вход</button>
        </form>
    );
};

export default Login;
