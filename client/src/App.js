import React from 'react';

import DataCountries from 'apps/data-countries';
import Notes from 'apps/notes';

const App = () => {
  return (
    <div className="">
      <Notes />
      <DataCountries />
    </div>
  );
};

export default App;
