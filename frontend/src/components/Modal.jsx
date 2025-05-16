import './Modal.css';

const Modal = ({ header, body, footer, closeModal }) => {
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
          {header}
        </div>
        <div className='body'>{body}</div>
        <div className='footer'>{footer}</div>
      </div>
    </div>
  );
};

export default Modal;
