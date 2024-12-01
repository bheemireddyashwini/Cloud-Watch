import { useState } from 'react';
import { useWeather } from '../context/WeatherContext';

const WeatherInput = () => {
  const { fetchWeatherData } = useWeather();
  const [city, setCity] = useState('');

  const handleSearch = () => {
    if (city.trim()) {
      fetchWeatherData(city);
      setCity('');
    } else {
      alert('Please enter a city name!');
    }
  };

  return (
    <div className="weather-input">
      <h3>Enter a City Name</h3>
      <input
        type="text"
        placeholder="E.g., Germany, London, US"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
      />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
};

export default WeatherInput;
