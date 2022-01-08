import React, { useEffect, useState } from 'react';

import PersonForm from './components/PersonForm';
import Persons from './components/Persons';
import SearchFilter from './components/SearchFilter';
import data from './MOCK_DATA.json';

const PERSON_EMPTY = { id: '', name: '', number: '' };

const ThePhonebook = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '414-7504147', id: new Date().toString() },
  ]);
  const [newPerson, setNewPerson] = useState({ ...PERSON_EMPTY });
  const [filterShown, setFilterShown] = useState('');
  const [personsFiltered, setPersonsFiltered] = useState([]);

  useEffect(() => {
    setPersons(data);
  }, []);
  /**
   * @param {React.FormEvent<HTMLFormElement>} e */
  const handleSubmit = (e) => {
    e.preventDefault();

    if (persons.some((person) => person.name === newPerson.name)) {
      alert(`${newPerson.name} is already added to phonebook`);
      return;
    }

    const personObject = {
      ...newPerson,
      id: new Date().toString(),
    };

    setPersons([...persons, personObject]);
    setNewPerson({ ...PERSON_EMPTY });
  };

  /**
   * @param {React.ChangeEvent<HTMLInputElement>} e
   */
  const handleChange = (e) => {
    setNewPerson({
      ...newPerson,
      [e.currentTarget.name]: e.currentTarget.value,
    });
  };

  useEffect(() => {
    if (filterShown === '') setPersonsFiltered(persons);

    const regex = new RegExp(`${filterShown}`, 'i');

    setPersonsFiltered([
      ...persons.filter((person) => {
        // TODO: For texting
        // console.log({
        //   regex,
        //   testing: person.name,
        //   result: regex.test(person.name),
        // });
        return regex.test(person.name);
      }),
    ]);
    return () => {};
  }, [filterShown, persons]);

  return (
    <div>
      <h1>The Phonebook</h1>

      <SearchFilter
        value={filterShown}
        onChange={(e) => setFilterShown(e.target.value)}
      />

      <PersonForm
        newPerson={newPerson}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />

      <h2>Numbers</h2>
      <Persons persons={personsFiltered} />
    </div>
  );
};

export default ThePhonebook;
