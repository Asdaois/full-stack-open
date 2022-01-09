import React from 'react';

import Notes from 'apps/notes';
import ThePhonebook from 'apps/the-phonebook';

const App = () => {
  return (
    <div className="box-border p-4">
      <Notes />
      <ThePhonebook/>
    </div>
  );
};

export default App;
