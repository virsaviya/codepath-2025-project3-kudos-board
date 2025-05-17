import { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';

import Boards from './Boards';
import Cards from './Cards';
import Layout from './Layout';
import NotFound from './NotFound';
import './App.css';

function App() {
  const [filter, setFilter] = useState(null);
  const [query, setQuery] = useState('');
  const [cards, setCards] = useState(null);

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
