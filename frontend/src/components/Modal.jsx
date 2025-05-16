const Modal = ({ children }) => {
  return (
    <div className='modal-container'>
      <div className='modal'>
        <div className='modal-header'></div>
        <div className='modal-body'>{children}</div>
        <div className='modal-footer'></div>
      </div>
    </div>
  );
};

export default Modal;
