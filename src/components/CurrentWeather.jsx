import { useWeather } from '../context/WeatherContext';

const CurrentWeather = () => {
  const { currentWeather } = useWeather();

  if (!currentWeather || !currentWeather.weather || currentWeather.weather.length === 0) {
    return <div>Loading...</div>;
  }

  const { city, dt_txt, main, weather, wind } = currentWeather;

  if (!main || !weather[0] || !wind) {
    return <div>Invalid data received.</div>;
  }

  // Format the date to display as "DD MMMM YYYY"
  const date = new Date(dt_txt);
  const formattedDate = new Intl.DateTimeFormat('en-GB', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  }).format(date);

  return (
    <div className="current-weather">
      <div className="details">
        <h2>
          {city} ({formattedDate})
        </h2>
        <h6>Temperature: {(main.temp - 273.15).toFixed(2)}°C</h6>
        <h6>Wind: {wind.speed} m/s</h6>
        <h6>Humidity: {main.humidity}%</h6>
      </div>
      <div className="icon">
        <img
          src={`https://openweathermap.org/img/wn/${weather[0].icon}@4x.png`}
          alt="weather-icon"
        />
        <h6>{weather[0].description}</h6>
      </div>
    </div>
  );
};

export default CurrentWeather;

