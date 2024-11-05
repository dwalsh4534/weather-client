import React, { useState } from 'react';
import axios from 'axios';
import './WeatherCard.css';


function WeatherCard() {
  const [inputValue, setInputValue] = useState('');
  const [responseData, setResponseData] = useState(null);

  const handleChange = (event) => {
    // Access the value of the input field
    const newValue = event.target.value;
    setInputValue(newValue); // Update the state with the new value
};

const handleSubmit = async (event) => {
  event.preventDefault();

    try {
        const response = await axios.post('http://localhost:3001/current_weather', {
            latitude: inputValue,
            longitude: "100"
        }, {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        });
        setResponseData(response.data);
    } catch (error) {
        console.error('Error during Axios request:', error);
        alert('Error: Unable to fetch weather data.'); // Optional: show an alert to the user
    }
}

  return (
  <div className="card">
    <div className="card-content">
      <h3 className="card-title">React Weather App</h3>
      <p className="card-description">This is a description of the card. It provides some information about the content displayed.</p>
      <form action="/current_weather" method="POST" onSubmit={handleSubmit}>
      <div>
        <label>latitude:</label>
        <input type="text" name="latitude" value={inputValue} onChange={handleChange}></input>
      </div>
      <button type="submit">Submit</button>
      </form>

      {responseData && (<div>
      <h1>test</h1>
      <ul>
      <li>Your temperature: {responseData.current_weather.temperature} </li>
      <li>Your windspeed: </li>
      </ul>
    </div>)}

    </div>
  </div>
  );
}


export default WeatherCard;