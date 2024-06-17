import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';
import '../styles/admin.css';

const Dashboard = () => {
    const [orders, setOrders] = useState([]);
    const [selectedOrder, setSelectedOrder] = useState(null); // Хранит информацию о выбранном заказе

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await axios.get('http://localhost:5000/orders');
                setOrders(response.data);
            } catch (error) {
                console.error('Error fetching orders:', error);
            }
        };
        fetchOrders();
    }, []);

    const exportToExcel = () => {
        const data = orders.map(order => ({
            'Фамилия': order.userId ? order.userId.firstName : '',
            'Имя': order.userId ? order.userId.username : '',
            'Отчество': order.userId ? order.userId.lastName : '',
            'Продукт': order.product,
            'Описание': order.productos,
            'Количество': order.quantity,
            'Номер телефона': order.phoneNumber,
            'Почта': order.email,
        }));
        const ws = XLSX.utils.json_to_sheet(data);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Orders');
        const wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
        const blob = new Blob([wbout], { type: 'application/octet-stream' });
        saveAs(blob, 'orders.xlsx');
    };

    // Открыть модальное окно с подробной информацией о заказе
    const openModal = (order) => {
        setSelectedOrder(order);
    };

    // Закрыть модальное окно
    const closeModal = () => {
        setSelectedOrder(null);
    };

    return (
        <div className="normal-table">
            <h1>Заявки</h1>
            <table>
                <thead>
                    <tr>
                        <th>Клиент</th>
                        <th>Продукт</th>
                        <th>Описание</th>
                        <th>Количество</th>
                        <th>Номер телефона</th>
                        <th>Email</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map((order) => (
                        <tr key={order._id}>
                            <td>{order.userId ? `${order.userId.firstName} ${order.userId.username} ${order.userId.lastName}` : ''}</td>
                            <td>{order.product}</td>
                            <td><button onClick={() => openModal(order)}>Описание</button></td>
                            <td>{order.quantity}</td>
                            <td>{order.phoneNumber}</td>
                            <td>{order.email}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {/* Модальное окно */}
            {selectedOrder && (
                <div className="modal">
                    <div className="modal-content">
                        <span className="close" onClick={closeModal}>&times;</span>
                        <h2>Подробное описание</h2>
                        <p>{selectedOrder.productos}</p>
                    </div>
                </div>
            )}
            <div className="export-buttons">
                <button onClick={exportToExcel}>Скачать exel</button>
            </div>
        </div>
    );
};

export default Dashboard;
