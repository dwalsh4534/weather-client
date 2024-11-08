import React, { useState } from 'react';
import axios from 'axios';
import './WeatherCard.css';

function WeatherCard() {
  const [latitudeInput, setLatitudeInput] = useState('');
  const [longitudeInput, setLongitudeInput] = useState('');
  const [cityInput, setCityInput] = useState('');

  const [coordinatesResponseData, setCoordinatesResponseData] = useState(null);

  const handleLatitudeChange = (event) => setLatitudeInput(event.target.value);
  const handleLongitudeChange = (event) => setLongitudeInput(event.target.value);
  const handleCityChange = (event) => setCityInput(event.target.value);

  const fetchWeatherForCity = async (latitude, longitude) => {
    try {
      const response = await axios.post(
        'http://localhost:3001/coordinates_weather',
        { latitude, longitude },
        { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
      );
      setCoordinatesResponseData(response.data);
    } catch (error) {
      console.error('Error fetching weather data:', error);
      alert('Error: Unable to fetch weather data.');
    }
  };

  const handleCitySubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.get(
        `https://geocoding-api.open-meteo.com/v1/search?name=${cityInput}&language=en&format=json`,
        { headers: { 'Content-Type': 'application/json' } }
      );
      const cityData = response.data;

      if (cityData.results && cityData.results[0]) {
        const latitude = cityData.results[0].latitude;
        const longitude = cityData.results[0].longitude;
        fetchWeatherForCity(latitude, longitude);
      } else {
        alert('City not found.');
      }
    } catch (error) {
      console.error('Error fetching location data:', error);
      alert('Error: Unable to fetch location data.');
    }
  };

  const handleCoordinatesSubmit = async (event) => {
    event.preventDefault();
    fetchWeatherForCity(latitudeInput, longitudeInput);
  };

  return (
    <div className="card">
      <div className="card-content">
        <h3 className="card-title">React Weather App</h3>

        <p className="card-description">Find the weather for your city/country:</p>
        <form action="/city_weather" method="POST" onSubmit={handleCitySubmit}>
          <label>City:</label>
          <input type="text" name="city" value={cityInput} onChange={handleCityChange}></input>
          <br />
          <button type="submit">Submit</button>
        </form>

        <p className="card-description">Or find the weather at a specific location:</p>
        <form action="/coordinates_weather" method="POST" onSubmit={handleCoordinatesSubmit}>
          <label>Latitude:</label>
          <input type="text" name="latitude" value={latitudeInput} onChange={handleLatitudeChange}></input>
          <br />
          <label>Longitude:</label>
          <input type="text" name="longitude" value={longitudeInput} onChange={handleLongitudeChange}></input>
          <button type="submit">Submit</button>
        </form>

        {coordinatesResponseData && (
          <div>
            <h1>Weather Data</h1>
            <ul>
              <li>Temperature: {coordinatesResponseData.current_weather.temperature}</li>
              <li>Windspeed: {coordinatesResponseData.current_weather.windspeed}</li>
              <li>Wind Direction: {coordinatesResponseData.current_weather.winddirection}</li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default WeatherCard;
