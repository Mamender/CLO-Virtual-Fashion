const SearchBar = ({ tempSearch, setTempSearch, handleSearch }) => {
  return (
    <div className="input-group mb-2 filter-bg serach-bar">
      <input
        type="text"
        className="form-control"
        placeholder="Find the items you're looking for"
        id="search-input"
        name="search"
        value={tempSearch}
        onChange={(e) => setTempSearch(e.target.value)}
      />
      <div className="searc-btn" onClick={handleSearch}>
        <i class="bi bi-search"></i>
      </div>
    </div>
  );
};

export default SearchBar;
