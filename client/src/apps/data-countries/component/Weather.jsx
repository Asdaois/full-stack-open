import React from 'react';

function Weather({ weather, capital }) {

  if (weather === null) 
    return <div className="">Loading weather...</div>
    
  
  return (
    <div className="">
      <h3>Weather in {capital}</h3>
      <p>
        <strong>temperature:</strong> {weather.main.temp} Celcius
      </p>

      <p>{weather.weather[0].description}</p>
      <img
        src={`https://openweathermap.org/img/w/${weather.weather[0].icon}.png`}
        alt={`${weather.weather[0].main}`}
      />
      <p>
        <strong>wind:</strong> {weather.wind.speed} m/s direction{' '}
        {weather.wind.deg} degrees
      </p>
    </div>
  );
}

export default Weather;
