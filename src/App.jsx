import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import FilterPanel from "./components/FilterPanel";
import ContentList from "./components/ContentList";

function App() {
  const [filters, setFilters] = useState({ Paid: false, Free: false, ViewOnly: false });
  const [searchTerm, setSearchTerm] = useState("");
  const [searchParams] = useSearchParams();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const response = await axios.get("https://closet-recruiting-api.azurewebsites.net/api/data");
      setData(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const filterParam = searchParams.get("filter");
    if (filterParam) {
      const activeFilters = filterParam.split(",");
      setFilters({
        Paid: activeFilters.includes("Paid"),
        Free: activeFilters.includes("Free"),
        ViewOnly: activeFilters.includes("ViewOnly"),
      });
    }
  }, [searchParams]);

  const filteredData = data.filter(item => {
    const matchesFilter = (
      (filters.Paid && item.pricingOption === 1) ||
      (filters.Free && item.pricingOption === 0) ||
      (filters.ViewOnly && item.pricingOption === 2) ||
      (!filters.Paid && !filters.Free && !filters.ViewOnly)
    );

    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          item.creator.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesFilter && matchesSearch;
  });

  return (
    <div className="container mt-4">
      <FilterPanel filters={filters} setFilters={setFilters} searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      {loading ? <p>Loading...</p> : <ContentList data={filteredData} />}
    </div>
  );
}

export default App;
