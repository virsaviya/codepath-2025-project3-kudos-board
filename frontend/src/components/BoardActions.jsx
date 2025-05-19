import { useState } from 'react';

import { options } from '../config';
import AddButton from './AddButton';
import Search from './Search';
import './BoardActions.css';

const BoardActions = ({ handleSearch, filterBoards }) => {
  const [selected, setSelected] = useState(options[0]);

  const handleTabClick = (option) => {
    setSelected(option);
    filterBoards(option);
  };

  return (
    <div className='actions'>
      {options.map((option) => (
        <button
          key={option}
          className={`tab ${selected === option ? 'active' : ''}`}
          onClick={() => handleTabClick(option)}>
          {option}
        </button>
      ))}
      <Search handleSearch={handleSearch} />
      <AddButton />
    </div>
  );
};

export default BoardActions;
