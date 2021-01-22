import React, { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const [weatherData, setWeatherData] = useState({
    place: "",
    temperature: "0",
    event: "",
  });
  const [city, setCity] = useState("");
  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      try {
        axios
          .get(
            `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&exclude=hourly,daily&appid=a7a44ab2657065f88880efe5d40faf0c&units=metric`
          )
          .then((response) => {
            console.log(response.data);
            setWeatherData({
              ...weatherData,
              temperature: response.data.main.temp,
              event: response.data.weather[0].description,
              place: response.data.name,
            });
          });
      } catch (error) {
        console.error(error);
      }
    });
  }, []);

  function handleClick() {
    try {
      axios
        .get(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=a7a44ab2657065f88880efe5d40faf0c&units=metric`
        )
        .then((res) => {
          setWeatherData({
            ...weatherData,
            temperature: res.data.main.temp,
            event: res.data.weather[0].description,
            place: res.data.name,
          });
        });
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <div className="background">
      <div
        className="app"
        style={{
          backgroundImage: `url("https://images.unsplash.com/photo-1457269449834-928af64c684d?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=967&q=80")`,
        }}
      >
        <div className="temperature">
          {" "}
          <h2>{weatherData.place}</h2>
          <h1>{weatherData.temperature} °C</h1>
          <h4>{weatherData.event}</h4>
          <input
            type="text"
            placeholder="Enter City..."
            value={city}
            onChange={(e) => {
              setCity(e.target.value);
            }}
          />
          <button
            onClick={() => {
              handleClick();
            }}
          >
            Show Weather
          </button>
        </div>

        <p>
          Weather App by
          <span className="brand"> Dilip Singh Dangwal</span>
        </p>
        <p>
          contact me at
          <span className="brand">dilipsinghdangwal@gmail.com</span>
        </p>
      </div>
    </div>
  );
}

export default App;
