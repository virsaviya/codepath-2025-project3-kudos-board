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

  useEffect(() => {
    document.addEventListener('keydown', closeModal);
    return () => {
      document.removeEventListener('keydown', closeModal);
    };
  }, []);

  const modalHeader = <div>New Board</div>;
  const modalFooter = (
    <>
      <button>Cancel</button>
      <button>Create</button>
    </>
  );

  const closeModal = (e) => {
    const isCloseButton = e.target.closest('.close');
    const isOutsideClick = e?.target.dataset.modalContainer === 'true';
    const isEscKey = e?.key === 'Escape';
    if (isOutsideClick || isCloseButton || isEscKey) {
      setShowModal(false);
    }
  };

  const context = {
    showModal: () => setShowModal(true),
  };

  return (
    <>
      <Header />
      <main>
        {showModal && (
          <Modal
            header={modalHeader}
            body={modalContent}
            footer={modalFooter}
            closeModal={closeModal}
          />
        )}
        <Outlet context={context} />
      </main>
      <Footer />
    </>
  );
};

export default Layout;
