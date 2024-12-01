import { createContext, useState, useContext } from 'react';
import PropTypes from 'prop-types';

const WeatherContext = createContext();

export const WeatherProvider = ({ children }) => {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null); 

  const API_KEY = "acb815fbe0ce5cdd5aa848684413b58f";

  const fetchWeatherData = async (cityName) => {
    setLoading(true);
    setError(null); // Reset error state before making a request
    try {
      // Step 1: Get geolocation data
      const geoResponse = await fetch(
        `https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${API_KEY}`
      );

      if (!geoResponse.ok) {
        throw new Error(`Error fetching geolocation data: ${geoResponse.statusText}`);
      }

      const geoData = await geoResponse.json();

      if (!geoData.length) {
        alert("City not found!");
        setLoading(false);
        return;
      }

      const { lat, lon, name } = geoData[0];

      // Step 2: Get weather forecast data
      const weatherResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}`
      );

      if (!weatherResponse.ok) {
        throw new Error(`Error fetching weather data: ${weatherResponse.statusText}`);
      }

      const weatherData = await weatherResponse.json();

      // Filter the forecast to get a unique set of days (one entry per day)
      const uniqueForecastDays = [];
      const fiveDayForecast = weatherData.list.filter((item) => {
        const date = new Date(item.dt_txt).getDate();
        if (!uniqueForecastDays.includes(date)) {
          uniqueForecastDays.push(date);
          return true;
        }
        return false;
      });

      // Set the current weather (the first item of the filtered forecast)
      setCurrentWeather({ city: name, ...fiveDayForecast[0] });
      setForecast(fiveDayForecast.slice(1));
    } catch (error) {
      console.error("An error occurred while fetching the weather data:", error);
      setError("An error occurred while fetching the weather data. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <WeatherContext.Provider value={{ currentWeather, forecast, fetchWeatherData, loading, error }}>
      {children}
    </WeatherContext.Provider>
  );
};

WeatherProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useWeather = () => {
  return useContext(WeatherContext);
};
