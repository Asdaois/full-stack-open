import React, { useEffect, useState } from 'react';

import notesAPI from './api/notesAPI';
import Note from './components/Note';

const Notes = () => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState('');
  const [showAll, setShowAll] = useState(true);

  useEffect(() => {
    const getNotes = async () => {
      const notes = await notesAPI.getAll('/notes');
      setNotes(notes);
    };
    getNotes();
  }, []);

  /**
   *
   * @param {React.FormEvent<HTMLFormElement>} e
   */
  const addNote = (e) => {
    e.preventDefault();

    const noteObject = {
      content: newNote,
      date: new Date().toISOString(),
      important: Math.random() > 0.5,
    };

    (async () => {
      const noteCreated = await notesAPI.create(noteObject);
      setNotes(notes.concat(noteCreated));
      setNewNote('');
    })();
  };

  /**
   *
   * @param {React.ChangeEvent<HTMLInputElement>} e
   */
  const handleNoteChange = (e) => {
    setNewNote(e.currentTarget.value);
  };

  const toggleImportanceOf = async (location) => {
    const note = notes[location];
    const changedNote = { ...note, important: !note.important };

    try {
      const noteModified = await notesAPI.update(changedNote.id, changedNote);
      setNotes(
        notes.map((note) => (note.id !== noteModified.id ? note : noteModified))
      );
    } catch (error) {
      alert(error)
    }
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
        {notesToShow.map((note, i) => (
          <Note
            key={note.id}
            note={note}
            toggleImportance={() => toggleImportanceOf(i)}
          />
        ))}
      </ul>
    </div>
  );
};

export default Notes;
