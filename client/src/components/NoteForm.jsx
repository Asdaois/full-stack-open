import React from 'react'

const NoteForm = ({ handleSubmit, value, handleChange }) => {
  return
    <div className=''>
      <h2>Create a new note</h2>
      <form onSubmit={handleSubmit}>
        <input
          type='text'
          placeholder='A new note...'
          value={value}
          onChange={handleChange}
        />
        <button type='submit' className='btn btn-green'>Save</button>
      </form>
    </div>
}
