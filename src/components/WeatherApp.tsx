import { useState, useEffect } from "react";

type Weather = {
  id: number;
  cityName: string;
  temperature: number;
  weather: string;
  icon: string;
};

const WeatherApp = () => {
  const [searchCity, setSearchCity] = useState<string>("");
  const [weather, setWeather] = useState<Weather | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [weatherData, setWeatherData] = useState<Weather[]>([]);

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const response = await fetch("/Weather.json");
        const data = await response.json();
        setWeatherData(data.weather);
      } catch (err) {
        console.error("Error fetching weather data:", err);
      }
    };
    fetchWeatherData();
  }, []);

  const handleSearch = () => {
    const foundWeather = weatherData.find((w) =>
      w.cityName.toLowerCase().includes(searchCity.toLowerCase())
    );
    if (foundWeather) {
      setWeather(foundWeather);
      setError(null);
    } else {
      setWeather(null);
      setError("No weather data found for the given city.");
    }
  };

  return (
    <div className="weather-app">
      <div className="search-section">
        <input
          type="text"
          value={searchCity}
          onChange={(e) => setSearchCity(e.target.value)}
          placeholder="Enter city name..."
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      <div className="results-section">
        {error && <p>{error}</p>}
        {weather && (
          <div className="weather-info">
            <img src={weather.icon} alt={weather.weather} className="icon" />
            <p>City: {weather.cityName}</p>
            <p>Temperature: {weather.temperature}°C</p>
            <p>Weather: {weather.weather}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default WeatherApp;
