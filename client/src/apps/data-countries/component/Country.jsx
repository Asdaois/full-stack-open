import React from 'react';

const Country = ({ country }) => {
  const languages = Object.entries(country.languages);
  console.log(languages);

  return (
    <div>
      <h2>{country.name.common}</h2>
      <p>capital {country.capital[0]}</p>
      <p>population {country.population}</p>
      <h3>languages</h3>
      <ul>
        {languages.map((language) => (
          <li key={language[0]}>{language[1]}</li>
        ))}
      </ul>
      <img src={country.flags.png} alt="" />
    </div>
  );
};

export default Country;
