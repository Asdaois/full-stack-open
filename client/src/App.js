import React from 'react'

import Notes from 'apps/notes'
import ThePhonebook from 'apps/the-phonebook'

const App = () => {
  return (
    <div className='p-4 box-border'>
      <Notes />
      <ThePhonebook />
    </div>
  )
}

export default App
