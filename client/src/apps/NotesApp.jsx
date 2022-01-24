import React, { useEffect, useRef, useState } from 'react'

import notesService from 'services/notesService'
import Footer from 'components/Footer'
import NoteForm from 'components/NoteForm'
import Togglable from 'components/Togglable'
import Notes from 'components/Notes'
import { Route, Routes } from 'react-router-dom'
import NoteInfo from 'components/NoteInfo'

const NotesApp = () => {
  const [notes, setNotes] = useState([])
  const [showAll, setShowAll] = useState(true)
  const noteFormRef = useRef()

  useEffect(() => {
    const getNotes = async () => {
      const notes = await notesService.getAll('/notes')
      setNotes(notes)
    }
    getNotes()
  }, [])

  const createNote = async newNote => {
    try {
      const noteCreated = await notesService.create(newNote)

      if (noteCreated.error === undefined) {
        setNotes(notes.concat(noteCreated))
      }
    } catch (error) {
      console.error(error)
    }

    noteFormRef.current.toggleVisibility()
  }

  const updateNote = async note => {
    try {
      const updatedNote = await notesService.update(note.id, note)
      setNotes(
        notes.map(note => (note.id !== updatedNote.id ? note : updatedNote))
      )
    } catch (error) {
      console.error(error)
    }
  }
  const notesToShow = showAll ? notes : notes.filter(note => note.important)

  return (
    <div>
      <h1>Notes</h1>

      <Routes>
        <Route path=':noteId' element={<NoteInfo notes={notes} />} />
        <Route
          path=''
          element={
            <div className=''>
              <button
                className={`btn ${showAll ? 'btn-purple' : 'btn-gray'}`}
                onClick={() => setShowAll(!showAll)}
              >
                Show {showAll ? 'important' : 'all'}
              </button>
              <Togglable buttonLabel='add a new note' ref={noteFormRef}>
                <NoteForm createNote={createNote} />
              </Togglable>
              <Notes notes={notesToShow} updateNote={updateNote} />
            </div>
          }
        />
      </Routes>
      <Footer />
    </div>
  )
}

export default NotesApp
