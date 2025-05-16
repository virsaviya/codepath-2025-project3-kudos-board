import { useEffect } from 'react';

import Boards from './Boards';
import Footer from './Footer';
import Header from './Header';
import Modal from './Modal';
import { baseUrl } from '../config';

import './App.css';

function App() {
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
    <>
      <Header />
      <main>
        <Modal>
          <div>modal body here</div>
        </Modal>
        <div>hello you beautiful world</div>
        <Boards />
      </main>
      <Footer />
    </>
  );
}

export default App;
