import React, { useEffect, useState } from 'react';

import axiosAPI from 'api/axiosAPI';

import Countries from './component/Countries';

const DataCountries = () => {
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    const getCountries = async () => {
      const response = await axiosAPI.get('https://restcountries.com/v3.1/all');
      setCountries(response.data);
    };
    getCountries();
  }, []);

  useEffect(() => {
    const regex = new RegExp('' + filter, 'i');
    const filteredCountries = countries.filter((country) =>
      regex.test(country.name.common)
    );

    setFilteredCountries(filteredCountries);
  }, [filter, countries]);

  return (
    <div>
      <div className="">
        <label htmlFor="filter">find countries</label>
        <input
          type="text"
          name="filter"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />
      </div>

      <Countries countries={filteredCountries} limit={10} />
    </div>
  );
};

export default DataCountries;
