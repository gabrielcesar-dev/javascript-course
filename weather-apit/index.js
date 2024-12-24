const API_KEY = "";
const API_URL = `https://api.openweathermap.org/data/2.5/weather?lat=%s&lon=%s&appid=${API_KEY}&units=metric&lang=en`;
const GEO_API_URL = `http://api.openweathermap.org/geo/1.0/direct?q=%s&appid=${API_KEY}`;

const weatherForm = document.querySelector('form');
const cityInput = document.querySelector('input');
const card = document.querySelector('.card');

const placeholder = cityInput.placeholder;

getWeatherUserLocation();

weatherForm.addEventListener('submit', async event => {
    event.preventDefault();

    const city = cityInput.value;

    if(!city) return getErrorDisplay();

    let latitude = "";
    let longitude = "";

    try {
        const data = await getGeoLocation(city);
        latitude = data[0].lat;
        longitude = data[0].lon;
    }
    catch(error) {
        getErrorDisplay(error);
    }

    try {
        const data = await getWeatherData(latitude, longitude);
        getWeatherDisplay(data);
    }
    catch(error) {
        getErrorDisplay(error);
    }

    cityInput.value = "";
});

async function getWeatherUserLocation() {
    navigator.geolocation.getCurrentPosition(async (position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
      
        try {
            const data = await getWeatherData(latitude, longitude);
            getWeatherDisplay(data);
        }
        catch(error) {
            getErrorDisplay(error);
        }
      });   
}

async function getGeoLocation(city) {
    const response = await fetch(GEO_API_URL.replace('%s', city));

    if(!response.ok) throw new Error(response.statusText);

    return await response.json();

}

async function getWeatherData(latitude, longitude) {
    const response = await fetch(API_URL.replace('%s', latitude).replace('%s', longitude));

    if(!response.ok) throw new Error(response.statusText);

    return await response.json();
}

function getWeatherDisplay(data) {
    const nameCity = data.name;
    const temperatureCity = data.main.temp;
    const humidityCity = data.main.humidity;
    const statusCity = data.weather[0].description;
    const statusIdCity = data.weather[0].icon;

    card.innerHTML = `
                <h1 class="city">${nameCity}</h1>
                <p class="temperature">${temperatureCity}°C</p>
                <p class="humidity">Humidity: ${humidityCity}%</p>
                <p class="status">${statusCity}</p>
                <p class="status-emoji">${getWeatherEmoji(statusIdCity)}</p>
    `;

    card.style.display = 'flex';
}

function getWeatherEmoji(icon) {
    const iconMap = {
        '01d': '☀️', // Clear sky (day)
        '01n': '🌙', // Clear sky (night)
        '02d': '🌤️', // Few clouds (day)
        '02n': '🌑', // Few clouds (night)
        '03d': '☁️', // Scattered clouds (day)
        '03n': '☁️', // Scattered clouds (night)
        '04d': '🌥️', // Broken clouds (day)
        '04n': '🌥️', // Broken clouds (night)
        '09d': '🌧️', // Shower rain (day)
        '09n': '🌧️', // Shower rain (night)
        '10d': '🌦️', // Rain (day)
        '10n': '🌧️', // Rain (night)
        '11d': '🌩️', // Thunderstorm (day)
        '11n': '🌩️', // Thunderstorm (night)
        '13d': '❄️', // Snow (day)
        '13n': '❄️', // Snow (night)
        '50d': '🌫️', // Mist (day)
        '50n': '🌫️', // Mist (night)
    };

    return iconMap[icon] || '❓';
}

function getErrorDisplay(error="") {
    if(error) {
        cityInput.placeholder = 'Invalid city name';
        cityInput.value = "";
    }

    cityInput.classList.add('error-popup');

    cityInput.addEventListener('focus', event => {
        event.target.classList.remove('error-popup');
        cityInput.placeholder = placeholder;
    });
}