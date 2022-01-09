import React from 'react';

import Country from './Country';

const Countries = ({ limit, countries, showCountry }) => {
  if (countries.length === 0) return <p>Not matches founded</p>;

  if (countries.length === 1) return <Country country={countries[0]} />;

  if (countries.length <= limit)
    return (
      <ul>
        {countries.map((country, i) => (
          <li key={country.name.official}>
            {country.name.common}{' '}
            <button className='btn' onClick={(e) => showCountry(i)}>Show</button>
          </li>
        ))}
      </ul>
    );

  return <p>Too many matches, specify another filter</p>;
};

export default Countries;
