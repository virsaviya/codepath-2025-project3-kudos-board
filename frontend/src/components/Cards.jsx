import { useState, useMemo } from 'react';
import { useParams } from 'react-router-dom';

import { useFetch, useDelete } from '../hooks';

const Cards = () => {
  const [options, setOptions] = useState({});
  const { id: boardId } = useParams();

  const { loading, error, data, fetchData } = useFetch(
    `boards/${boardId}`,
    options,
  );

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
          deleteCard={(e) => console.log('deleting card...')}
          onUpvote={(e) => console.log('upvoting card...')}
          // deleteCard={(e) => deleteCard(e, id)}
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
    <div>
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
