import React, { useEffect, useState } from 'react';

import axiosAPI from 'api/axiosAPI';

import Weather from './Weather';

const Country = ({ country }) => {
  const {
    name: { common: nameCommon },
    capital: [capital],
    population,
  } = country;

  const languages = Object.entries(country.languages);

  const [weather, setWeather] = useState(null);

  useEffect(() => {
    const getWeather = async () => {
      const URI = process.env.REACT_APP_OPENWEATHER_API;
      const KEY = process.env.REACT_APP_OPENWEATHER_KEY_API;
      const lat = country.capitalInfo.latlng[0];
      const lon = country.capitalInfo.latlng[1];
      const response = await axiosAPI.get(
        `${URI}?lat=${lat}&lon=${lon}&units=metric&appid=${KEY}`
      );
      setWeather(response.data);
    };
    getWeather();
  }, []);

  return (
    <div>
      <h2>{nameCommon}</h2>
      <p>capital {capital}</p>
      <p>population {population}</p>
      <h3>languages</h3>
      <ul>
        {languages.map((language) => (
          <li key={language[0]}>{language[1]}</li>
        ))}
      </ul>

      <img src={country.flags.png} alt="" />

      <Weather weather={weather} capital={capital}/>
      
    </div>
  );
};

export default Country;
