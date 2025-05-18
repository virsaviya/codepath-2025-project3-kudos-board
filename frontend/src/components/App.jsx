import { Routes, Route } from 'react-router-dom';

import Boards from './Boards';
import Cards from './Cards';
import Layout from './Layout';
import NotFound from './NotFound';
import './App.css';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Layout modalContent={'bar'} />}>
        <Route index element={<Boards />} />
        <Route path='board/:id' element={<Cards />} />
        <Route path='*' element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
