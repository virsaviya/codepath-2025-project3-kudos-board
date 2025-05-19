import { useLocation } from 'react-router-dom';
import { useMemo, useState, useRef } from 'react';

import { categories } from '../config';
import { usePost } from '../hooks';
import { useModalContext } from './Modal';
import './AddButton.css';

const AddButton = ({ onSuccess }) => {
  const { openModal, closeModal } = useModalContext();
  const { postData } = usePost();
  const { pathname } = useLocation();

  const { isBoard, boardId } = useMemo(() => {
    const [_, path, boardId] = pathname.split('/');
    return {
      isBoard: path === 'board',
      boardId,
    };
  }, []);

  const formRef = useRef({});

  const handleCreate = async () => {
    const { message, gif, author } = formRef.current;
    if (message && gif && boardId) {
      try {
        await postData('cards', {
          boardId,
          message,
          gif,
          author,
        });
        closeModal();
        if (onSuccess) onSuccess();
      } catch (err) {
        console.error('Error posting data', err);
      }
    }
  };

  const handleAddClick = () => {
    const actions = (
      <>
        <button className='cancel' onClick={closeModal}>
          Cancel
        </button>
        <button onClick={() => handleCreate()}>Create</button>
      </>
    );
    openModal(
      isBoard ? <NewCard formRef={formRef} /> : <NewBoard formRef={formRef} />,
      {
        title: `New ${isBoard ? 'Card' : 'Board'}`,
        actions,
      },
    );
  };

  return (
    <button className='add' onClick={handleAddClick}>
      <i className='fa-solid fa-plus'></i>
    </button>
  );
};

const NewBoard = () => {
  const [data, setData] = useState({
    title: '',
    category: categories[0],
    author: '',
  });
  return <>new board</>;
};

const NewCard = ({ formRef }) => {
  const MESSAGE = 'Message *';
  const GIF = 'GIF *';
  const AUTHOR = 'Author';
  const fields = [MESSAGE, GIF, AUTHOR];

  const updateData = (e, field) => {
    const { value } = e.target;
    if (field === MESSAGE) formRef.current.message = value;
    if (field === GIF) formRef.current.gif = value;
    if (field === AUTHOR) formRef.current.author = value;
  };
  return (
    <>
      {fields.map((f) => (
        <>
          <label htmlFor={f}>{f}</label>
          <input
            onChange={(e) => updateData(e, f)}
            type='text'
            id={f}
            name={f}
          />
        </>
      ))}
    </>
  );
};

export default AddButton;
