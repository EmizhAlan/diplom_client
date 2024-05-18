import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            alert('Passwords do not match');
            return;
        }
        try {
            await axios.post('https://diplom-server-pi.vercel.app/register', {
                username,
                password,
                firstName, // Обновляем отправляемые данные для включения имени
                lastName // Обновляем отправляемые данные для включения фамилии
            });
            alert('User registered successfully');
            navigate('/login');
        } catch (error) {
            console.error('Registration error:', error);
            alert('Registration failed');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h1>Регистрация</h1>
            <input type="text" placeholder="Фамилия" value={firstName} onChange={e => setFirstName(e.target.value)} required />
            <input type="text" placeholder="Имя" value={username} onChange={e => setUsername(e.target.value)} required />
            <input type="text" placeholder="Отчество" value={lastName} onChange={e => setLastName(e.target.value)} required />
            <input type="password" placeholder="Пароль" value={password} onChange={e => setPassword(e.target.value)} required />
            <input type="password" placeholder="Пароль (снова)" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} required />
            <button type="submit">Регистрация</button>
        </form>
    );
};

export default Register;
