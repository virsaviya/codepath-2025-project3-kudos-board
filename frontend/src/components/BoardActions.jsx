import { useState } from 'react';

import { options } from '../config';
import AddButton from './AddButton';
import Search from './Search';
import './BoardActions.css';

const BoardActions = ({ handleSearch, filterBoards, onSuccess }) => {
  const [selected, setSelected] = useState(options[0]);

  const handleTabClick = (option) => {
    setSelected(option);
    filterBoards(option);
  };

  return (
    <div className='actions'>
      <AddButton onSuccess={onSuccess} />
      {options.map((option) => (
        <button
          key={option}
          className={`tab ${selected === option ? 'active' : ''}`}
          onClick={() => handleTabClick(option)}>
          {option}
        </button>
      ))}
      <Search handleSearch={handleSearch} />
    </div>
  );
};

export default BoardActions;
