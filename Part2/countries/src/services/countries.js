/* eslint-disable no-unused-vars */
import axios from "axios";

const baseUrl = "https://studies.cs.helsinki.fi/restcountries/api/all";

function getCountry() {
  const request = axios.get(baseUrl);
  return request.then((res) => res.data);
}
function getWeather(data) {
  const request = axios.get(
    `https://api.openweathermap.org/data/2.5/weather?lat=${data.lat}&lon=${data.lon}&appid=${data.key}`
  );
  return request.then((res) => res.data);
}

export default { getCountry, getWeather };
