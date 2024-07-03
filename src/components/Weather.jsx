import React, { useEffect, useState } from "react";
import axios from "axios";

const Weather = () => {
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");

  const apiKey = "1a972490a4c8887a477cd8a4a9526b36";
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          getWeather(latitude, longitude);
        },
        (error) => {
          setError("Joylashuvni aniqlash mumkin emas");
        }
      );
    } else {
      setError("Brauzeringiz geolokatsiyani qo'llab-quvvatlamaydi");
    }
  }, []);

  const getWeather = async (lat, lon) => {
    try {
      setError("");
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`
      );
      setWeather(response.data);
    } catch (error) {
      setError("Ob-havo ma'lumotlarini olishda xatolik yuz berdi");
    }
  };
  return (
    <>
      {!weather && (
        <span className="loading loading-ring loading-xs mr-2"></span>
      )}
      {weather && (
        <div>
          {/* <p>{weather.name}</p> */}
          <p className=" mr-2"> {weather.main.temp} °C</p>
        </div>
      )}
    </>
  );
};

export default Weather;
