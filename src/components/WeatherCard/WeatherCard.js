import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './WeatherCard.css';


function WeatherCard() {
  const [submitted, setSubmitted] = useState(false);
  const [fetchedData, setFetchedData] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const data = await axios.get(
        "http://localhost:3001/current_weather?latitude=30&longitude=70"      //Could directly hit the weather API, but hitting the app's backend instead just for demonstration
      );
      setFetchedData(data);
    };
    getData();
  }, []);

  console.log(fetchedData);

  if (!fetchedData || fetchedData.length === 0) {
    return <div>Loading...</div>; // or any placeholder
}

  console.log("data 1: ", fetchedData);

  const newData = fetchedData.data;

  console.log("newData 1: ", newData.data);


  const {latitude, longitude, ...current_weather} = newData;


  function handleSubmit(event) {
    event.preventDefault();
    setSubmitted(true);
  }


  return (
  <div class="card">
    <div class="card-content">
      <h3 class="card-title">React Weather App</h3>
      {!submitted && (<><p class="card-description">This is a description of the card. It provides some information about the content displayed.</p>
      <form action="/current_weather" method="GET" onSubmit={handleSubmit}>
      <div>
        <label>latitude:</label>
        <input type="text" name="latitude"></input>
      </div>
      <div>
        <label>longitude:</label>
        <input type="text" name="longitude"></input>
      </div>
      <button type="submit">Submit</button>
      </form></>)}

      {submitted && (    <div>
      <h1>test</h1>
      <ul>
      <li>Your latitude: {latitude}</li>
      <li>Your longitude: {longitude}</li>
      </ul>
    </div>)}

    </div>
  </div>
  );
}


export default WeatherCard;