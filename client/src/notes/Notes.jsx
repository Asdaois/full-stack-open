import React, { useState } from 'react';

import Note from './components/Note';

const defaultNotes = [
  {
    id: 'dohg4ue6i4',
    content: 'HTML is easy',
    date: '2019-05-30T17:30:31.098Z',
    important: true,
  },
  {
    id: '4fab4py84',
    content: 'Browser can execute only JavaScript',
    date: '2019-05-30T18:39:34.091Z',
    important: false,
  },
  {
    id: 'a4uoe65f4xe',
    content: 'GET and POST are the most important methods of HTTP protocol',
    date: '2019-05-30T19:20:14.298Z',
    important: true,
  },
];

const Notes = () => {
  const [notes, setNotes] = useState(defaultNotes);
  const [newNote, setNewNote] = useState('');
  const [showAll, setShowAll] = useState(true);

  /**
   *
   * @param {React.FormEvent<HTMLFormElement>} e
   */
  const addNote = (e) => {
    e.preventDefault();

    const noteObject = {
      id: Date.now().toString(),
      content: newNote,
      date: new Date().toISOString(),
      important: Math.random() > 0.5,
    };

    setNotes(notes.concat(noteObject));
    setNewNote('');
  };

  /**
   *
   * @param {React.ChangeEvent<HTMLInputElement>} e
   */
  const handleNoteChange = (e) => {
    setNewNote(e.currentTarget.value);
  };

  const notesToShow = showAll ? notes : notes.filter((note) => note.important);

  return (
    <div>
      <h1>Notes</h1>
      <div className="">
        <button onClick={() => setShowAll(!showAll)}>
          Show {showAll ? 'important' : 'all'}
        </button>
      </div>
      <form onSubmit={addNote}>
        <input
          type="text"
          placeholder="A new note..."
          value={newNote}
          onChange={handleNoteChange}
        />
        <input type="submit" value="Save" />
      </form>
      <ul>
        {notesToShow.map((note) => (
          <Note key={note.id} note={note} />
        ))}
      </ul>
    </div>
  );
};

export default Notes;
