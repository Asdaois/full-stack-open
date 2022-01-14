import React, { useEffect, useState } from 'react'

import notesService from 'services/notesService'
import Footer from 'components/Footer'
import Note from 'components/Note'
import NoteForm from 'components/NoteForm'
import Togglable from 'components/Togglable'

const Notes = () => {
  const [notes, setNotes] = useState([])
  const [showAll, setShowAll] = useState(true)

  useEffect(() => {
    const getNotes = async () => {
      const notes = await notesService.getAll('/notes')
      setNotes(notes)
    }
    getNotes()
  }, [])

  const createNote = async (newNote) => {
    try {
      const noteCreated = await notesService.create(newNote)

      if (noteCreated.error === undefined) {
        setNotes(notes.concat(noteCreated))
      }
    } catch (error) {
      console.error(error)
    }
  }

  const toggleImportanceOf = async (location) => {
    try {
      const note = notes[location]
      const changedNote = { ...note, important: !note.important }

      const noteModified = await notesService.update(changedNote.id, changedNote)
      setNotes(
        notes.map((note) => (note.id !== noteModified.id ? note : noteModified))
      )
    } catch (error) {
      console.error(error)
    }
  }
  const notesToShow = showAll ? notes : notes.filter((note) => note.important)

  return (
    <div>
      <h1>Notes</h1>
      <button className={`btn ${showAll ? 'btn-purple' : 'btn-gray'}`} onClick={() => setShowAll(!showAll)}>
        Show {showAll ? 'important' : 'all'}
      </button>
      <Togglable buttonLabel='add a new note'>
        <NoteForm createNote={createNote} />
      </Togglable>
      <ul>
        {notesToShow.map((note, i) => (
          <Note
            key={note.id}
            note={note}
            toggleImportance={() => toggleImportanceOf(i)}
          />
        ))}
      </ul>

      <Footer />
    </div>
  )
}

export default Notes
