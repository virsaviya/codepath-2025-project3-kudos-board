import { useState } from 'react';

import './BoardActions.css';

const ALL = 'ALL';
const RECENT = 'RECENT';
const CELEBRATION = 'CELEBRATION';
const THANKS = 'THANKS';
const INSPO = 'INSPO';

const options = [RECENT, ALL, CELEBRATION, THANKS, INSPO];

const BoardActions = () => {
  const [selected, setSelected] = useState(options[0]);

  return (
    <div className='actions'>
      <button className='add'>Add Board</button>
      <div className='search'>
        <p>Searh here</p>
      </div>
      {options.map((option) => (
        <button
          key={option}
          className={`tab ${selected === option ? 'active' : ''}`}
          onClick={() => setSelected(option)}>
          {option}
        </button>
      ))}
    </div>
  );
};

export default BoardActions;
