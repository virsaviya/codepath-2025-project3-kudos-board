import { useState } from 'react';

import Search from './Search';
import './BoardActions.css';

const ALL = 'ALL';
const RECENT = 'RECENT';
const CELEBRATION = 'CELEBRATION';
const THANKS = 'THANKS';
const INSPO = 'INSPO';

const options = [RECENT, ALL, CELEBRATION, THANKS, INSPO];

const BoardActions = () => {
  const [selected, setSelected] = useState(options[0]);
  const handleSearch = (e) => {
    console.log('searching...', e);
  };
  return (
    <div className='actions'>
      {options.map((option) => (
        <button
          key={option}
          className={`tab ${selected === option ? 'active' : ''}`}
          onClick={() => setSelected(option)}>
          {option}
        </button>
      ))}
      <Search />
      <button className='add'>
        <i className='fa-solid fa-plus'></i>
      </button>
    </div>
  );
};

export default BoardActions;
