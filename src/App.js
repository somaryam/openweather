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
    <div>
    
      
      <div className={`App ${weatherType}`}>
        <div className="search-box transparent-box">
          <h2>Recherche</h2>
          <div className="selects">
          <select name="latitude" value={latitude} onChange={handleSelectChange}>
  <option value="12.579939">12.579939</option>
  <option value="14.6937">14.6937</option>
  <option value="14.6576">14.6576</option>
  <option value="14.7814">14.7814</option>
  <option value="12.8642">12.8642</option>
  <option value="13.1133">13.1133</option>
  <option value="13.5667">13.5667</option>
  <option value="14.6742">14.6742</option>
  <option value="12.8919">12.8919</option>
  <option value="14.1039">14.1039</option>
  <option value="14.3086">14.3086</option>
  <option value="15.1217">15.1217</option>
  <option value="15.8647">15.8647</option>
  <option value="16.0748">16.0748</option>
  <option value="16.0273">16.0273</option>
  
</select>
<select name="longitude" value={longitude} onChange={handleSelectChange}>
  <option value="-16.283950">-16.283950</option>
  <option value="-17.4441">-17.4441</option>
  <option value="-16.926">-16.926</option>
  <option value="-16.2052">-16.2052</option>
  <option value="-14.9609">-14.9609</option>
  <option value="-13.6534">-13.6534</option>
  <option value="-16.2559">-16.2559</option>
  <option value="-16.2519">-16.2519</option>
  <option value="-16.1342">-16.1342</option>
  <option value="-16.4389">-16.4389</option>
  <option value="-16.9631">-16.9631</option>
  <option value="-13.5086">-13.5086</option>
  <option value="-15.896">-15.896</option>
  <option value="-12.862">-12.862</option>
  <option value="-12.708">-12.708</option>
 
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
    </div>
  );
}

export default App;
