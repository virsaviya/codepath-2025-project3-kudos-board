import { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';

import Footer from './Footer';
import Header from './Header';
import Modal from './Modal';
import './Layout.css';

const Layout = ({ modalContent }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <Header />
      <main>
        {showModal && <Modal>{modalContent}</Modal>}
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default Layout;
