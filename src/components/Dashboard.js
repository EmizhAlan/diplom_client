import React, { useState } from 'react';
import axios from 'axios';
import '../styles/style.css';
import emailjs from '@emailjs/browser';

const Dashboard = () => {
    const [product, setProduct] = useState('');
    const [productos, setProductos] = useState('');
    const [quantity, setQuantity] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [email, setEmail] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Your EmailJS service ID, template ID, and Public Key
        const serviceId = 'service_w10z5ml';
        const templateId = 'template_q83jku5';
        const publicKey = 'V5kQceTF8sz7fIhdk';

        const botToken = '7068074063:AAGRTbh42jFoahHQvwny0cLtvB-RdyQyxTk';
        const chatId = '-4226510360';

        const message = `
            Новый заказ:
            Продукт: ${product}
            Описание: ${productos}
            Количество: ${quantity}
            Номер телефона: ${phoneNumber}
            Email: ${email}
            `;

        // Create a new object that contains dynamic template params
        const templateParams = {
            from_name: product,
            from_email: email,
            to_name: 'Менеджер',
            message: productos,
            messege2: quantity,
            messege3: phoneNumber,
        };

        axios.post(`https://api.telegram.org/bot${botToken}/sendMessage`, {
        chat_id: chatId,
        text: message
        })
        .then(response => {
            console.log('Message sent to Telegram:', response.data);
        })
        .catch(error => {
            console.error('Error sending message to Telegram:', error);
        });

        emailjs.send(serviceId, templateId, templateParams, publicKey)
            .then((response) => {
            console.log('Email sent successfully!', response);
            setProduct('');
            setEmail('');
            setProductos('');
          })
            .catch((error) => {
            console.error('Error sending email:', error);
          });
  

        const token = localStorage.getItem('token'); // Получаем токен из локального хранилища
        try {
            await axios.post('https://diplom-server-wine.vercel.app/order', {
                token,
                product,
                productos,
                quantity,
                phoneNumber,
                email
            });
            alert('Order placed successfully');
            // Очищаем поля после успешного размещения заказа
            setProduct('');
            setProductos('');
            setQuantity('');
            setPhoneNumber('');
            setEmail('');
        } catch (error) {
            console.error('Error placing order:', error);
            alert('Failed to place order');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h1>Форма заявки</h1>
            <input type="text" placeholder="Продукт" value={product} onChange={e => setProduct(e.target.value)} required />
            <input type="text" placeholder="Описание" value={productos} onChange={e => setProductos(e.target.value)} required />
            <input type="number" placeholder="Колличество" value={quantity} onChange={e => setQuantity(e.target.value)} required />
            {/* Добавляем поля для номера телефона и почты */}
            <input type="tel" placeholder="Номер телефона" value={phoneNumber} onChange={e => setPhoneNumber(e.target.value)} required />
            <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required />
            <button type="submit">Отправить</button>
        </form>
    );
};

export default Dashboard;
