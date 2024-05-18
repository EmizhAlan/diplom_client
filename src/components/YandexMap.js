import React, { useEffect } from 'react';

const YandexMap = () => {
    useEffect(() => {
        const loadYandexMapScript = () => {
            const script = document.createElement('script');
            script.src = 'https://api-maps.yandex.ru/2.1/?apikey=02cfc29c-5cea-430a-a62c-ed4193f2350a&lang=ru_RU';
            script.type = 'text/javascript';
            script.async = true;
            script.onload = initMap;
            document.body.appendChild(script);
        };

        const initMap = () => {
            if (typeof window.ymaps !== 'undefined') {
                const map = new window.ymaps.Map("map", {
                    center: [45.029530, 39.046018],
                    zoom: 15
                });

                const placemark = new window.ymaps.Placemark([45.029530, 39.046018]);
                map.geoObjects.add(placemark);
            }
        };

        if (typeof window.ymaps === 'undefined') {
            loadYandexMapScript();
        } else {
            initMap();
        }
    }, []);

    return <div id="map" style={{ width: '100%', height: '400px' }}></div>;
};

export default YandexMap;
