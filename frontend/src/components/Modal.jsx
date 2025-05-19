import {
  createContext,
  useState,
  useCallback,
  useEffect,
  useContext,
} from 'react';
import './Modal.css';

export const ModalContext = createContext();

const ModalProvider = ({ children }) => {
  const [showModal, setShowModal] = useState(false);
  const [content, setContent] = useState(null);
  const [config, setConfig] = useState({
    title: 'Create New',
    actions: null,
  });

  const openModal = useCallback((newContent, newConfig = {}) => {
    setContent(newContent);
    setConfig(newConfig);
    setShowModal(true);
  }, []);

  useEffect(() => {
    document.addEventListener('keydown', closeModal);
    return () => {
      document.removeEventListener('keydown', closeModal);
    };
  }, []);

  const closeModal = useCallback((e) => {
    const isCloseButton = e?.target.closest('.modal .header .close');
    const isCancelButton = e?.target.closest('.modal .footer .cancel');
    const isOutsideClick = e?.target.dataset.modalContainer === 'true';
    const isEscKey = e?.key === 'Escape';
    if (!e || isOutsideClick || isCloseButton || isCancelButton || isEscKey) {
      setContent(null);
      setConfig({});
      setShowModal(false);
    }
  }, []);

  return (
    <ModalContext.Provider
      value={{ showModal, content, config, openModal, closeModal }}>
      {children}
    </ModalContext.Provider>
  );
};

const ModalRenderer = () => {
  const { showModal, content, config, closeModal } = useModalContext();
  if (!showModal) return null;
  return (
    <Modal closeModal={closeModal} {...config}>
      {content}
    </Modal>
  );
};

const Modal = ({ closeModal, title = 'Create', actions, children }) => {
  return (
    <div
      className='modal-container'
      data-modal-container={true}
      onClick={closeModal}>
      <div className='modal'>
        <div className='header'>
          <button className='close' onClick={closeModal}>
            <i className='fa-solid fa-xmark' />
          </button>
          <div>{title}</div>
        </div>
        <div className='body'>{children}</div>
        <div className='footer'>{actions}</div>
      </div>
    </div>
  );
};

const useModalContext = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('useModalContext must be used within a ModalProvider');
  }
  return context;
};

export { ModalProvider, ModalRenderer, useModalContext };
