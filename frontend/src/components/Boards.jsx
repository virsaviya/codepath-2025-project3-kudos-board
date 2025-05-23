import { useMemo, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import { ALL } from '../config';
import { useFetch, useDelete } from '../hooks';
import BoardActions from './BoardActions';
import './Boards.css';

const Boards = () => {
  const [options, setOptions] = useState({});
  const [filter, setFilter] = useState(ALL);
  const [query, setQuery] = useState('');

  const endpoint = useMemo(() => {
    const params = new URLSearchParams();

    if (query) params.set('query', query);
    if (filter !== ALL) params.set('filter', filter);

    const queryString = params.toString();
    return `boards${queryString ? `?${queryString}` : ''}`;
  }, [filter, query]);

  const navigate = useNavigate();
  const { loading, error, data, fetchData } = useFetch(endpoint, options);
  const { deleteData } = useDelete();

  const content = useMemo(() => {
    if (!data && loading) return <div>loading...</div>;
    if (error) return <div>{error}</div>;
    if (Array.isArray(data))
      return data.map(({ id, title, cards }) => (
        <BoardCard
          key={id}
          title={title}
          img={cards[0]?.gif}
          deleteBoard={(e) => deleteBoard(e, id)}
          openBoard={() => navigate(`board/${id}`)}
        />
      ));
    else return <div>Oopsie.</div>;
  }, [loading, data, error]);

  const deleteBoard = async (e, id) => {
    e.stopPropagation();
    await deleteData(`boards/${id}`);
    await fetchData(endpoint, options);
  };

  const handleSearch = (e) => {
    setQuery(e.target.value);
  };

  const filterBoards = (filterBy) => {
    setFilter(filterBy);
  };

  const handleAddSuccess = useCallback(() => {
    fetchData(endpoint, options);
  }, [endpoint]);

  return (
    <div className='boards'>
      <BoardActions
        handleSearch={handleSearch}
        filterBoards={filterBoards}
        onSuccess={handleAddSuccess}
      />
      <h2>aaaaaall a board the kudos train 🚂 🚂</h2>
      <div className='list'>{content}</div>
    </div>
  );
};

const BoardCard = ({ title, img, openBoard, deleteBoard }) => {
  const defaultImg = 'https://place-hold.it/300/09a875?text=Add Cards';
  return (
    <div className='card' onClick={openBoard}>
      <button className='delete' onClick={deleteBoard}>
        <i className='fa-solid fa-trash'></i>
      </button>
      <img alt={`image for ${title}`} src={img || defaultImg} />
      <h3>{title}</h3>
    </div>
  );
};

export default Boards;
