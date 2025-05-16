import { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';

import Boards from './Boards';
import Cards from './Cards';
import Layout from './Layout';
import NotFound from './NotFound';
import { baseUrl } from '../config';
import './App.css';

function App() {
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState(null);
  const [query, setQuery] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [boards, setBoards] = useState(null);
  const [cards, setCards] = useState(null);

  useEffect(() => {
    getBoards();
  }, []);

  const getBoards = async (filter, search) => {
    console.log(baseUrl);
    const resp = await fetch(`${baseUrl}/boards`);
    if (!resp.ok) console.log('ERROR HANDLING NEEDED'); // @TODO
    const data = await resp.json();
    console.log(data);
  };

  return (
    <Routes>
      <Route path='/' element={<Layout modalContent={'bar'} />}>
        <Route index element={<Boards />} />
        <Route path='/board' element={<Cards />} />
        <Route path='*' element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
