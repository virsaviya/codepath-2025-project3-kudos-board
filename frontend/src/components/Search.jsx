import './Search.css';

const Search = ({ handleSearch }) => {
  return (
    <div className='search'>
      <input
        type='search'
        onChange={handleSearch}
        placeholder='Search boards...'
      />
      <button>
        <i className='fa-solid fa-magnifying-glass' />
      </button>
    </div>
  );
};

export default Search;
