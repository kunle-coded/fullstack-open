/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import countryService from "../services/countries";

function Country({ country, isDetails = false, onClick }) {
  const [languages, setLanguages] = useState(Object.values(country.languages));
  const [isShow, setIsShow] = useState(false);
  const [weather, setWeather] = useState({});

  const api_key = import.meta.env.VITE_SOME_KEY;

  useEffect(() => {
    const tempWeather = {
      temp: 0,
      wind: 0,
      icon: "",
    };
    const weatherData = {
      lat: country.latlng[0],
      lon: country.latlng[1],
      key: api_key,
    };

    countryService.getWeather(weatherData).then((res) => {
      tempWeather.temp = res.main.temp - 273.15;
      tempWeather.icon = res.weather[0].icon;
      tempWeather.wind = res.wind.speed;

      setWeather(tempWeather);
    });
  }, [api_key, country.latlng]);

  function handleClick() {
    setIsShow((prevState) => !prevState);
  }

  return isDetails || isShow ? (
    <div>
      <h2>{country.name.common}</h2>
      <p>Capital: {country.capital[0]}</p>
      <p>Area: {country.area}</p>

      <h3>Languages</h3>
      <ul>
        {languages.map((language, index) => (
          <li key={index}>{language}</li>
        ))}
      </ul>

      <img
        style={{ width: "200px", height: "200px" }}
        src={country.flags.png}
      />

      <div>
        <h2>{`Weather in ${country.capital[0]}`}</h2>
        <h3>Temperature {weather.temp.toFixed(2)} Celcius</h3>
        <img
          src={`https://openweathermap.org/img/wn/${weather.icon}@4x.png`}
          alt=""
        />
        <h3>Wind {weather.wind} m/s</h3>
      </div>

      {!isDetails && (
        <div>
          <button onClick={handleClick}>hide</button>
        </div>
      )}
    </div>
  ) : (
    <div>
      {country.name.common}
      <button onClick={handleClick}>show</button>
    </div>
  );
}

export default Country;
