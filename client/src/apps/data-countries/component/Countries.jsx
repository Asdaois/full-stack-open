import React from 'react';

import Country from './Country';

const ShowCountries = ({ limit, countries }) => {
  if (countries.length === 0) return <p>Not matches founded</p>;

  if (countries.length === 1) return <Country country={countries[0]} />;

  if (countries.length <= limit)
    return (
      <ul>
        {countries.map((country) => (
          <li key={country.name.official}>{country.name.common}</li>
        ))}
      </ul>
    );

  return <p>Too many matches, specify another filter</p>;
};

export default ShowCountries;
