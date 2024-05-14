import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [latitude, setLatitude] = useState(12.579939); // Valeur pour Ziguinchor
  const [longitude, setLongitude] = useState(-16.283950); // Valeur pour Ziguinchor
  const [isReady, setReady] = useState(false);
  const [weatherType, setWeatherType] = useState('');

  const handleSelectChange = (event) => {
    const { name, value } = event.target;
    if (name === 'latitude') {
      setLatitude(value);
    } else if (name === 'longitude') {
      setLongitude(value);
    }
  };

  const handleSearch = () => {
    fetchData();
  };

  const fetchData = () => {
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=37353b3ce0c274ca659dbd239ed254c7&units=metric`)
      .then(response => response.json())
      .then(data => {
        setWeatherData(data);
        setReady(true);
        if (data.main.temp > 25) {
          setWeatherType('chaud');
        } else if (data.weather[0].main === 'Rain') {
          setWeatherType('pluie');
        } else {
          setWeatherType('froid');
        }
      })
      .catch(error => {
        console.error(error);
        setReady(true);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className={`App ${weatherType}`}>
      <h1 className="app-title">Application Météo</h1>
      <div className="search-box transparent-box">
        <h2>Recherche</h2>
        <div className="selects">
          <select name="latitude" value={latitude} onChange={handleSelectChange}>
            <option value="12.579939">Ziguinchor</option>
            {/* Ajoutez d'autres options de latitude ici */}
          </select>
          <select name="longitude" value={longitude} onChange={handleSelectChange}>
            <option value="-16.283950">Ziguinchor</option>
            {/* Ajoutez d'autres options de longitude ici */}
          </select>
          <button onClick={handleSearch}>Rechercher</button>
        </div>
      </div>
      <div className="content-container">
        <div className="weather-container">
          <div className="weather-box transparent-box">
            {isReady && weatherData && (
              <>
                <h2 className="city">Météo à {weatherData.name}</h2>
                <h3 className="title">Temps ensoleillé</h3>
                <div>
                  <p className="temperature"><strong>Température:</strong> {weatherData.main.temp} °C</p>
                  <p className="description"><strong>Description:</strong> {weatherData.weather[0].description}</p>
                  <p className="main"><strong>Météo principale:</strong> {weatherData.weather[0].main}</p>
                  <p className="wind"><strong>Vitesse du vent:</strong> {weatherData.wind.speed} m/s</p>
                  <p className="humidity"><strong>Humidité:</strong> {weatherData.main.humidity}%</p>
                  <p className="pressure"><strong>Pression atmosphérique:</strong> {weatherData.main.pressure} hPa</p>
                  <p className="sunrise"><strong>Lever du soleil:</strong> {new Date(weatherData.sys.sunrise * 1000).toLocaleTimeString()}</p>
                  <p className="sunset"><strong>Coucher du soleil:</strong> {new Date(weatherData.sys.sunset * 1000).toLocaleTimeString()}</p>
                </div>
              </>
            )}
          </div>
        </div>
        <div className="coordinates-container transparent-box">
          <h2>Coordonnées</h2>
          <div>
            <p><strong>Latitude:</strong> {latitude}</p>
            <p><strong>Longitude:</strong> {longitude}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;

