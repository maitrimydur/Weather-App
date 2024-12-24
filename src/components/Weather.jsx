import React, { useEffect, useState } from 'react'; // Include useState here
import './Weather.css';
import search_icon from '../assets/search.png';
import clear_icon from '../assets/clear.png';
import cloud_icon from '../assets/cloud.png';
import drizzle_icon from '../assets/drizzle.png';
import humidity_icon from '../assets/humidity.png';
import rain_icon from '../assets/rain.png';
import snow_icon from '../assets/snow.png';
import wind_icon from '../assets/wind.png';

const Weather = () => {
    const [weatherData, setWeatherData] = useState(null); // Initialize to null for better handling

    const allIcons = {
        "01d": clear_icon,
        "01n": clear_icon,
        "02d": cloud_icon,
        "02n": cloud_icon,
        "03d": cloud_icon,
        "03n": cloud_icon,
        "04d": drizzle_icon,
        "04n": drizzle_icon,
        "09d": rain_icon,
        "09n": rain_icon,
        "10d": rain_icon,
        "10n": rain_icon,
        "13d": snow_icon,
        "13n": snow_icon,
    };

    const search = async (city) => {
        try {
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${import.meta.env.VITE_APP_ID}`;
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const data = await response.json();
            const icon = allIcons[data.weather[0].icon] || clear_icon;
            setWeatherData({
                humidity: data.main.humidity,
                windSpeed: data.wind.speed,
                temperature: Math.round(data.main.temp), // Correct conversion method
                location: data.name,
                icon: icon
            });
        } catch (error) {
            console.error('Failed to fetch weather data:', error);
            setWeatherData(null); // Handle error by resetting state or setting an error state
        }
    };

    useEffect(() => {
        search("Fremont");
    }, []);

    if (!weatherData) {
        return <div>Loading...</div>; // Handle loading state
    }

    return (
        <div className='weather'>
            <div className="search-bar">
                <input type="text" placeholder='Search' />
                <img src={search_icon} alt="Search Icon" />
            </div>
            <img src={weatherData.icon} alt="Weather Icon" className='weather-icon' />
            <p className='temperature'>{`${weatherData.temperature}°F`}</p>
            <p className='location'>{weatherData.location}</p>
            <div className="weather-data">
                <div className="col">
                    <img src={humidity_icon} alt="Humidity Icon" />
                    <div>
                        <p>{`${weatherData.humidity}%`}</p>
                        <span>Humidity</span>
                    </div>
                </div>
                <div className="col">
                    <img src={wind_icon} alt="Wind Icon" />
                    <div>
                        <p>{`${weatherData.windSpeed} Km/h`}</p>
                        <span>Wind Speed</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Weather;
