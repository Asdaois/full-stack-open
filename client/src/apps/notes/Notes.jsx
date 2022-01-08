import React, { useEffect, useState } from 'react';

import axiosAPI from 'api/axiosAPI';

import Note from './components/Note';

const Notes = () => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState('');
  const [showAll, setShowAll] = useState(true);

  useEffect(() => {
    const getNotes = async () => {
      const response = await axiosAPI.get('/notes')
      setNotes(response.data);
    }
    getNotes();
  }, [])
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
