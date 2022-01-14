import React from 'react'

const PersonForm = ({ newPerson, handleSubmit, handleChange }) => {
  return (
    <form onSubmit={handleSubmit} autoComplete='off'>
      <div className=''>
        name:{' '}
        <input
          type='text'
          name='name'
          value={newPerson.name}
          onChange={handleChange}
          required
        />
      </div>
      <div className=''>
        number:{' '}
        <input
          type='tel'
          name='number'
          value={newPerson.number}
          onChange={handleChange}
          required
        />
      </div>
      <div className=''>
        <button type='submit' className='btn btn-green'>Add</button>
      </div>
    </form>
  )
}

export default PersonForm
