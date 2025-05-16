import Boards from './Boards';
import Footer from './Footer';
import Header from './Header';
import Modal from './Modal';

import './App.css';

function App() {
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
