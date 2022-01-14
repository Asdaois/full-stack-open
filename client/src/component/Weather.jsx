import React from 'react'

import degreesToCardinal from '../lib/degreesToCardinal'

function Weather ({ weather, capital }) {
  if (weather === null) { return <div className=''>Loading weather...</div> }

  const { main: { temp }, wind: { deg, speed }, weather: [{ description, icon, main }] } = weather

  const cardinalDirection = degreesToCardinal(deg)

  return (
    <div className=''>
      <h3>Weather in {capital}</h3>
      <p>
        <strong>temperature:</strong> {temp} Celcius
      </p>

      <p>{description}</p>
      <img
        src={`https://openweathermap.org/img/w/${icon}.png`}
        alt={`${main}`}
      />
      <p>
        <strong>wind:</strong> {speed} m/s direction {cardinalDirection}-
        {deg} degrees
      </p>
    </div>
  )
}

export default Weather
