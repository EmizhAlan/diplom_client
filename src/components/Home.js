import React from 'react';
import { Link } from 'react-router-dom';
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import '../styles/home.css';
import YandexMap from './YandexMap';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const Home = () => {
    const data = {
        labels: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль'],
        datasets: [
            {
                label: 'Продажи',
                data: [65, 59, 80, 81, 56, 55, 40],
                fill: false,
                borderColor: 'rgba(75,192,192,1)',
            },
            {
                label: 'Доход',
                data: [28, 48, 40, 19, 86, 27, 90],
                fill: false,
                borderColor: '#742774',
            },
        ],
    };

    const photos = [
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSxrcrsU4N_PCYZhuiVO4yTF_ltovVG2PReQxcA1dlXhQ&s",
        "https://tortsnab-msk.ru/wp-content/uploads/2014/11/f786c534bb5-e1416508047242.png",
        "https://content.onliner.by/news/970x485/354edd8d8381faa4dcef337e7919e6c2.jpeg",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRWTTX2lUFYcWRmHhR_Mj0C7LDqvcvAARRxLkeMV452Dg&s",
    ];

    return (
        <div className="home">
            <header>
                <h1>Добро пожаловать в Granat</h1>
                <img src="https://smartprogress.do/uploadImages/000155114_l_crop.jpg" alt="Главное изображение"/>
                <p>Ваш надежный оптовый поставщик качественных товаров</p>
                <div className="contact-top">
                    <p>Телефон: +7 (918) 456-78-90 | Email: granat@gmail.com</p>
                </div>
            </header>
            <main>
                <section className="description">
                    <h2>О нашем магазине</h2>
                    <p>
                        Granat - ведущий оптовый поставщик товаров в России. Мы предлагаем широкий ассортимент продукции высокого качества
                        по конкурентоспособным ценам. Наш ассортимент включает в себя продукты питания, бытовую химию, косметику и многое другое.
                        Мы работаем с надежными производителями и гарантируем своевременную доставку по всей территории страны.
                    </p>
                    <p>
                        Мы стремимся к долгосрочным партнёрским отношениям и нацелены на предоставление лучшего сервиса для наших клиентов.
                        Наша команда специалистов всегда готова помочь вам в выборе продукции и ответить на все ваши вопросы.
                    </p>
                </section>

                <section className="charts">
                    <h2>Статистика продаж и доходов</h2>
                    <Line data={data} />
                </section>

                <section className="photos">
                    <h2>Наши Фотографии</h2>
                    <div className="photo-gallery">
                        {photos.map((photo, index) => (
                            <img key={index} src={photo} alt={`Фото ${index + 1}`} />
                        ))}
                    </div>
                </section>

                <section className="location">
                    <h2>Наше местоположение</h2>
                    <YandexMap />
                </section>

                <section className="reviews">
                    <h2>Отзывы клиентов</h2>
                    <div className="review">
                        <p><strong>Иван Петров:</strong> Отличный магазин! Всегда большой выбор и отличное качество товаров.</p>
                    </div>
                    <div className="review">
                        <p><strong>Мария Иванова:</strong> Пользуюсь услугами Granat уже несколько лет, всегда довольна обслуживанием.</p>
                    </div>
                    <div className="review">
                        <p><strong>Алексей Смирнов:</strong> Быстрая доставка и вежливый персонал. Рекомендую всем!</p>
                    </div>
                </section>

                <section className="faq">
                    <h2>Часто задаваемые вопросы</h2>
                    <div className="faq-item">
                        <h3>Какие товары вы предлагаете?</h3>
                        <p>Мы предлагаем широкий ассортимент продукции, включая продукты питания, бытовую химию, косметику и многое другое.</p>
                    </div>
                    <div className="faq-item">
                        <h3>Как оформить заказ?</h3>
                        <p>Вы можете оформить заказ через наш сайт, зарегистрировавшись и добавив товары в корзину.</p>
                    </div>
                    <div className="faq-item">
                        <h3>Как долго длится доставка?</h3>
                        <p>Время доставки зависит от вашего местоположения, обычно доставка занимает от 3 до 7 рабочих дней.</p>
                    </div>
                </section>

                <section className="news">
                    <h2>Новости</h2>
                    <div className="news-item">
                        <h3>Новое поступление товаров</h3>
                        <p>Мы рады сообщить о поступлении новой партии товаров. Ознакомьтесь с новинками в нашем каталоге!</p>
                    </div>
                    <div className="news-item">
                        <h3>Скидки на летний сезон</h3>
                        <p>Спешите воспользоваться летними скидками на всю продукцию! Акция действует до конца сезона.</p>
                    </div>
                    <div className="news-item">
                        <h3>Расширение ассортимента</h3>
                        <p>Мы расширили ассортимент бытовой химии. Теперь у нас ещё больше качественных товаров по низким ценам.</p>
                    </div>
                </section>

                <div className="auth-links">
                    <Link to="/register">
                        <button>Регистрация</button>
                    </Link>
                    <Link to="/login">
                        <button>Вход</button>
                    </Link>
                </div>
            </main>
            <footer>
                <div className="contact-bottom">
                    <p>Контакты: +7 (123) 456-78-90 | info@granat.ru</p>
                </div>
                <div className="social-links">
                    <p>Мы в социальных сетях:</p>
                    <a href="https://web.telegram.org/a/#-1002175133639" target="_blank" rel="noopener noreferrer">Телеграм</a>
                    <a href="https://vk.com/club224839008" target="_blank" rel="noopener noreferrer">ВК</a>
                    <a href="https://ok.ru/" target="_blank" rel="noopener noreferrer">Одноклассники</a>
                </div>
                <div className="additional-info">
                    <p>Дополнительная информация: График работы - Пн-Пт с 9:00 до 18:00</p>
                </div>
            </footer>
        </div>
    );
};

export default Home;
