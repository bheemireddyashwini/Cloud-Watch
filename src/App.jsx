import { WeatherProvider } from './context/WeatherContext';
import WeatherInput from './components/WeatherInput';
import CurrentWeather from './components/CurrentWeather';
import ForecastCards from './components/ForecastCards';
import './App.css';

const App = () => {
  return (
    <WeatherProvider>
      <div className="app">
        <h1>CloudWatch</h1>
        <div className="container">
          <WeatherInput />
          <div className="weather-data">
            <CurrentWeather />
            <ForecastCards />
          </div>
        </div>
      </div>
    </WeatherProvider>
  );
};

export default App;
