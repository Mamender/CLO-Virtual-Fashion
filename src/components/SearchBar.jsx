const SearchBar = ({ tempSearch, setTempSearch, handleSearch }) => {
  return (
    <div className="input-group mb-2">
      <input
        type="text"
        className="form-control"
        placeholder="Search by title or creator"
        value={tempSearch}
        onChange={(e) => setTempSearch(e.target.value)}
      />
      <button className="btn btn-primary" onClick={handleSearch}>
        Search
      </button>
    </div>
  );
};

export default SearchBar;
