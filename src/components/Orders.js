import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/style.css';

const Orders = () => {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await axios.get('http://https://diplom-server-wine.vercel.app/orders');
                setOrders(response.data);
            } catch (error) {
                console.error('Error fetching orders:', error);
            }
        };
        fetchOrders();
    }, []);

    return (
        <div>
            <h1>Ордер</h1>
            <table>
                <thead>
                    <tr>
                        <th>Продукт</th>
                        <th>Количество</th>
                        <th>Клиент</th>
                        <th>Номер телефона</th>
                        <th>Email</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map(order => (
                        <tr key={order._id}>
                            <td>{order.product}</td>
                            <td>{order.quantity}</td>
                            <td>{`${order.userId.firstName} ${order.userId.lastName}`}</td>
                            <td>{order.phoneNumber}</td>
                            <td>{order.email}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Orders;
