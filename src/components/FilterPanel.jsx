import { useSearchParams } from "react-router-dom";
import { useState } from "react";
import SearchBar from "./SearchBar";

const FilterPanel = ({ filters, setFilters, searchTerm, setSearchTerm }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [tempSearch, setTempSearch] = useState(searchTerm);

  const handleChange = (option) => {
    const newFilters = { ...filters, [option]: !filters[option] };
    setFilters(newFilters);

    const activeFilters = Object.keys(newFilters).filter(k => newFilters[k]);
    if (activeFilters.length) {
      searchParams.set("filter", activeFilters.join(","));
    } else {
      searchParams.delete("filter");
    }
    setSearchParams(searchParams);
  };

  const handleReset = () => {
    setFilters({ Paid: false, Free: false, ViewOnly: false });
    setSearchTerm("");
    setTempSearch("");
    searchParams.delete("filter");
    setSearchParams(searchParams);
  };

  const handleSearch = () => {
    setSearchTerm(tempSearch);
  };

  return (
    <div className="filter-panel mb-3">
      <SearchBar
        tempSearch={tempSearch}
        setTempSearch={setTempSearch}
        handleSearch={handleSearch}
      />

      <label className="me-2">
        <input type="checkbox" checked={filters.Paid} onChange={() => handleChange("Paid")} /> Paid
      </label>
      <label className="me-2">
        <input type="checkbox" checked={filters.Free} onChange={() => handleChange("Free")} /> Free
      </label>
      <label className="me-2">
        <input type="checkbox" checked={filters.ViewOnly} onChange={() => handleChange("ViewOnly")} /> View Only
      </label>
      <button className="btn btn-secondary btn-sm ms-3" onClick={handleReset}>Reset</button>
    </div>
  );
};

export default FilterPanel;
