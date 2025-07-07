import { useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toggleFilter, resetFilters, setSearchTerm } from "../redux/filterSlice";
import SearchBar from "./SearchBar";
import { useState } from "react";

const FilterPanel = () => {
  const dispatch = useDispatch();
  const filters = useSelector(state => state.filter);
  const [searchParams, setSearchParams] = useSearchParams();
  const [tempSearch, setTempSearch] = useState(filters.searchTerm);

  const handleChange = (option) => {
    dispatch(toggleFilter(option));

    const updatedFilters = {
      ...filters,
      [option]: !filters[option],
    };

    const activeFilters = Object.keys(updatedFilters).filter(k => updatedFilters[k] && (k === 'Paid' || k === 'Free' || k === 'ViewOnly'));

    if (activeFilters.length) {
      searchParams.set("filter", activeFilters.join(","));
    } else {
      searchParams.delete("filter");
    }
    setSearchParams(searchParams);
  };

  const handleReset = () => {
    dispatch(resetFilters());
    setTempSearch("");
    searchParams.delete("filter");
    setSearchParams(searchParams);
  };

  const handleSearch = () => {
    dispatch(setSearchTerm(tempSearch));
  };

  return (
    <div className="filter-panel mb-3 filter-bg">
      <SearchBar
        tempSearch={tempSearch}
        setTempSearch={setTempSearch}
        handleSearch={handleSearch}
      />
      <div className="filter-options d-flex flex-row align-items-center">
        <span className="filter-title">Pricing Option</span>
      <label className="me-2">
        <input type="checkbox" checked={filters.Paid} onChange={() => handleChange("Paid")} /> Paid
      </label>
      <label className="me-2">
        <input type="checkbox" checked={filters.Free} onChange={() => handleChange("Free")} /> Free
      </label>
      <label className="me-2">
        <input type="checkbox" checked={filters.ViewOnly} onChange={() => handleChange("ViewOnly")} /> View Only
      </label>
      <div className="rest-btn" onClick={handleReset}>REST</div>
      </div>
    </div>
  );
};

export default FilterPanel;
