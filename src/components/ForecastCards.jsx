import { useWeather } from '../context/WeatherContext';

const ForecastCards = () => {
  const { forecast } = useWeather();

  if (!forecast || forecast.length === 0) {
    return <p className="loading-message">Loading forecast data...</p>;
  }

  return (
    <div className="days-forecast">
      <h2>5-Day Forecast</h2>
      <div className="forecast-container">
        {forecast.map((item, index) => {
          const { dt_txt, main, wind, weather } = item;
          
          // Format the date to display as "DD MMMM YYYY" (e.g., "01 December 2024")
          const date = new Date(dt_txt);
          const formattedDate = new Intl.DateTimeFormat('en-GB', {
            day: '2-digit',
            month: 'long',
            year: 'numeric',
          }).format(date);
          
          const temp = (main.temp - 273.15).toFixed(1); // Convert from Kelvin to Celsius
          const iconUrl = `https://openweathermap.org/img/wn/${weather[0].icon}@4x.png`;

          return (
            <div key={index} className="forecast-card">
              <h3 className="date">{formattedDate}</h3>
              <img
                src={iconUrl}
                alt={`${weather[0].description} icon`}
                className="weather-icon"
              />
              <div className="weather-details">
                <p className="temp">Temp: {temp}°C</p>
                <p className="wind">Wind: {wind.speed} m/s</p>
                <p className="humidity">Humidity: {main.humidity}%</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ForecastCards;
