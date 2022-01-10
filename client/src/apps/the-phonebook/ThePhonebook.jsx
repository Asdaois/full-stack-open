import React, { useEffect, useState } from 'react';

import phonebookAPI from './api/phonebookAPI';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';
import SearchFilter from './components/SearchFilter';

const PERSON_EMPTY = { id: '', name: '', number: '' };

const ThePhonebook = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '414-7504147', id: new Date().toString() },
  ]);
  const [newPerson, setNewPerson] = useState({ ...PERSON_EMPTY });
  const [filterShown, setFilterShown] = useState('');
  const [personsFiltered, setPersonsFiltered] = useState([]);

  useEffect(() => {
    const getPersons = async () => {
      const persons = await phonebookAPI.getALl();
      setPersons(persons);
    };
    getPersons();
  }, []);

  useEffect(() => {
    if (filterShown === '') setPersonsFiltered(persons);

    const regex = new RegExp(`${filterShown}`, 'i');

    setPersonsFiltered([
      ...persons.filter((person) => {
        return regex.test(person.name);
      }),
    ]);
    return () => {};
  }, [filterShown, persons]);

  /**
   * @param {React.FormEvent<HTMLFormElement>} e */
  const handleSubmit = (e) => {
    e.preventDefault();

    if (persons.some((person) => person.name.toLowerCase() === newPerson.name.toLowerCase())) {
      updatePerson({...newPerson});
      return;
    }

    const personObject = {
      ...newPerson,
    };

    (async () => {
      try {
        const personCreated = await phonebookAPI.create(personObject);
        setPersons([...persons, personCreated]);
        setNewPerson({ ...PERSON_EMPTY });
      } catch (error) {}
    })();
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

  const deletePerson = async (personToRemove) => {
    const confirmed = window.confirm(`Delete ${personToRemove.name} ?`);

    if (confirmed) {
      try {
        const response = await phonebookAPI.deleteOne(personToRemove.id);

        setPersons(persons.filter((person) => person.id !== personToRemove.id));
      } catch (error) {
        alert(error);
      }
    }
  };

  const updatePerson = async (person) => {
    const confirmed = window.confirm(
      `${person.name} is already adde to phonebook, replace the old number with a new one?`
    );

    if (confirmed) {
      try {
        const location = persons.findIndex(p => p.name.toLowerCase() === person.name.toLowerCase())
        if (location === -1) throw Error('Person not founded');
          
        const newPersonData = {...persons[location], number: newPerson.number}
        
        const personChanged = await phonebookAPI.update(newPersonData);

        setPersons(
          persons.map((person) =>
            personChanged.id !== person.id ? person : personChanged 
          )
        );

        setNewPerson({...PERSON_EMPTY})
      } catch (error) {}
    }
  };

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
      <Persons persons={personsFiltered} handleDelete={deletePerson} />
    </div>
  );
};

export default ThePhonebook;
