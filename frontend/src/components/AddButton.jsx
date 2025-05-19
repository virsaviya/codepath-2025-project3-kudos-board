import { useLocation } from 'react-router-dom';
import { useMemo, useState, useRef } from 'react';

import { categories, CELEBRATION } from '../config';
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
    if (isBoard) {
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
          console.error('Error adding card', err);
        }
      }
    } else {
      const { title, category, gif } = formRef.current;
      if (title && category) {
        try {
          await postData('boards', { title, category, gif });
          closeModal();
          if (onSuccess) onSuccess();
        } catch (err) {
          console.error('Error adding board', err);
        }
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

const NewBoard = ({ formRef }) => {
  const TITLE = 'Title *';
  const CATEGORY = 'Category *';
  const AUTHOR = 'Author';

  const updateData = (e) => {
    const { name, value } = e.target;
    console.log(formRef.current, !('category' in formRef.current));
    // if (!'category' in formRef.current) console.log('here');
    if (!('category' in formRef.current))
      formRef.current.category = CELEBRATION;
    if (name === TITLE) formRef.current.title = value;
    if (name === CATEGORY) formRef.current.category = value;
    if (name === AUTHOR) formRef.current.author = value;
  };

  return (
    <>
      <label htmlFor='title'>Title</label>
      <input onChange={updateData} type='text' id={TITLE} name={TITLE} />
      <label htmlFor='category'>Category</label>
      <select onChange={updateData} id={CATEGORY} name={CATEGORY}>
        {categories.map((c) => (
          <option key={c} value={c}>
            {c}
          </option>
        ))}
      </select>
      <label htmlFor='author'>Author</label>
      <input onChange={updateData} type='text' id={AUTHOR} name={AUTHOR} />
    </>
  );
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
