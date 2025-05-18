import { useState } from 'react';

import { options } from '../config';
import { useModalContext } from './Modal';
import Form from './Form';
import Search from './Search';
import './BoardActions.css';

const BoardActions = ({ handleSearch, filterBoards }) => {
  const { openModal } = useModalContext();
  const [selected, setSelected] = useState(options[0]);

  const handleTabClick = (option) => {
    setSelected(option);
    filterBoards(option);
  };

  const handleAddClick = (e) => {
    console.log('adding...');
    openModal(<div>hello</div>, { title: 'Create Board' });
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
      <button className='add' onClick={handleAddClick}>
        <i className='fa-solid fa-plus'></i>
      </button>
    </div>
  );
};

export default BoardActions;
