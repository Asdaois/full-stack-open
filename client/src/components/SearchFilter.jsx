import React from 'react'

const SearchFilter = ({ value, onChange }) => {
  return (
    <div className=''>
      filter show with
      <input
        type='text'
        value={value}
        onChange={onChange}
      />
    </div>
  )
}

export default SearchFilter
