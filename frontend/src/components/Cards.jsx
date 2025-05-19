import { useState, useMemo, useCallback } from 'react';
import { useParams } from 'react-router-dom';

import { useFetch, useDelete, usePost } from '../hooks';
import AddButton from './AddButton';

const Cards = () => {
  const [options, setOptions] = useState({});
  const { id: boardId } = useParams();
  const endpoint = useMemo(() => `boards/${boardId}`, [boardId]);

  const { loading, error, data, fetchData } = useFetch(endpoint, options);
  const { deleteData } = useDelete();
  const { postData } = usePost();

  const handleUpvoteCard = useCallback(
    async (e, cardId) => {
      e.stopPropagation();
      await postData(`cards/${cardId}/upvote`);
      await fetchData(endpoint, options);
    },
    [endpoint, options],
  );

  const handleDeleteCard = async (e, cardId) => {
    e.stopPropagation();
    await deleteData(`cards/${cardId}`);
    await fetchData(endpoint, options);
  };

  const handleAddSuccess = useCallback(() => {
    fetchData(endpoint, options);
  }, [endpoint]);

  const content = useMemo(() => {
    if (!data && loading) return <div>loading...</div>;
    if (error) return <div>{error}</div>;
    if (Array.isArray(data.cards))
      return data.cards.map(({ id, message, gif, upvotes }) => (
        <Card
          key={id}
          message={message}
          gif={gif}
          upvotes={upvotes}
          onUpvote={(e) => handleUpvoteCard(e, id)}
          deleteCard={(e) => handleDeleteCard(e, id)}
        />
      ));
    else return <div>Oopsie.</div>;
  }, [loading, data, error]);

  const header = useMemo(
    () =>
      data && (
        <>
          <h2>{data.title}</h2>
          <p>{`a board for ${data.category.toLowerCase()}${
            data.author ? ` created by ${data.author}` : ''
          }`}</p>
        </>
      ),
    [data],
  );

  return (
    <div className='cards'>
      <AddButton onSuccess={handleAddSuccess} />
      <div>{header || 'Welcome'}</div>
      <div className='list'>{content}</div>
    </div>
  );
};

const Card = ({ message, gif, upvotes, onUpvote, deleteCard }) => {
  const defaultImg = 'https://place-hold.it/300/09a875?text=Add Cards';
  return (
    <div className='card'>
      <div className='upvote'>
        <div>{upvotes}</div>
        <button onClick={onUpvote}>
          <i className='fa-solid fa-circle-up'></i>
        </button>
      </div>
      <button className='delete' onClick={deleteCard}>
        <i className='fa-solid fa-trash'></i>
      </button>
      <img alt={`image for ${message}`} src={gif || defaultImg} />
      <p>{message}</p>
    </div>
  );
};

export default Cards;
