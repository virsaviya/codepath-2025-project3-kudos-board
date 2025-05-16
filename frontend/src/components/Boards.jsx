import { useOutletContext } from 'react-router-dom';

const Boards = () => {
  const { showModal } = useOutletContext();

  return (
    <div>
      <h2>aaaaaall a board</h2>
      <button onClick={showModal}>show Modal</button>
    </div>
  );
};

export default Boards;
