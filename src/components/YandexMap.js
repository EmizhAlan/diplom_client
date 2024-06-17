import { useEffect } from 'react';

const YandexMap = () => {
    useEffect(() => {
        const initMap = () => {
            if (window.ymaps) {
                if (!window.ymaps.mapInitialized) {
                    window.ymaps.mapInitialized = true; // Устанавливаем флаг, чтобы карта создавалась только один раз
                    try {
                        const map = new window.ymaps.Map('map', {
                            center: [45.032057,38.976407], // Изменение координаты
                            zoom: 17 // Уменьшение увеличения карты
                        });

                        // Создаем маркер в центре карты (Краснодар)
                        const placemark = new window.ymaps.Placemark([45.032057,38.976407], {
                            hintContent: 'Драматический театр',
                            balloonContent: 'Драматический театр г. Краснодар'
                        });

                        // Добавляем маркер на карту
                        map.geoObjects.add(placemark);

                        return map; // Возвращаем созданный объект карты
                    } catch (error) {
                        console.error('Failed to create map:', error);
                    }
                }
            } else {
                console.error('Yandex Maps API not loaded');
            }
        };

        // Проверяем, существует ли скрипт, чтобы не загружать его несколько раз
        if (!document.querySelector('script[src="https://api-maps.yandex.ru/2.1/?apikey=f0df228a-03a5-4961-8af6-9316e3fe2a73&lang=ru_RU"]')) {
            const script = document.createElement('script');
            script.src = 'https://api-maps.yandex.ru/2.1/?apikey=f0df228a-03a5-4961-8af6-9316e3fe2a73&lang=ru_RU';
            script.async = true;
            script.onload = () => window.ymaps.ready(initMap);
            document.body.appendChild(script);
        } else {
            window.ymaps.ready(initMap);
        }

        return () => {
            // Очищаем флаг при размонтировании компонента
            if (window.ymaps) {
                window.ymaps.mapInitialized = false;
            }

            // Удаляем скрипт после размонтирования компонента, если необходимо
            const script = document.querySelector('script[src="https://api-maps.yandex.ru/2.1/?apikey=f0df228a-03a5-4961-8af6-9316e3fe2a73&lang=ru_RU"]');
            if (script) {
                document.body.removeChild(script);
            }
        };
    }, []);

    return <div id="map" style={{ width: '100%', height: '400px' }}></div>;
};

export default YandexMap;
