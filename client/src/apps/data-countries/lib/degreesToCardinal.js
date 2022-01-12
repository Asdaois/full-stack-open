const degreesToCardinal = (degree) => {
  const directions = [
    'N',
    'NNE',
    'NE',
    'ENE',
    'E',
    'ESE',
    'SE',
    'SSE',
    'S',
    'SSW',
    'SW',
    'WSW',
    'W',
    'WNW',
    'NW',
    'NNW'
  ]
  const ix = Math.floor((degree + 11.25) / 22.5)
  return directions[ix % 16]
}

export default degreesToCardinal
