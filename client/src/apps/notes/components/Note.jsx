import React from 'react';

const Note = ({ note, toggleImportance }) => {
  const label = note.important ? 'make not important' : 'make important';

  return (
    <li className="text-gray-700 pt-4 text-sm">
      {note.content}
      <button className={'btn ' + `${note.important ? 'btn-red' : 'btn-blue'}`} onClick={toggleImportance}>{label}</button>
    </li>
  );
};

export default Note;
