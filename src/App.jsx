import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import Header from "./components/Header";
import FilterPanel from "./components/FilterPanel";
import ContentList from "./components/ContentList";
import { useSelector, useDispatch } from "react-redux";
import { setFiltersFromURL } from "./redux/filterSlice";
import SkeletonCard from "./components/SkeletonCard";


function App() {
  const { Paid, Free, ViewOnly, searchTerm } = useSelector(state => state.filter);
  const dispatch = useDispatch();

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
      dispatch(setFiltersFromURL(activeFilters));
    }
  }, [searchParams, dispatch]);

  const filteredData = data.filter(item => {
    const matchesFilter = (
      (Paid && item.pricingOption === 1) ||
      (Free && item.pricingOption === 0) ||
      (ViewOnly && item.pricingOption === 2) ||
      (!Paid && !Free && !ViewOnly)
    );

    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          item.creator.toLowerCase().includes(searchTerm.toLowerCase());
                          
    return matchesFilter && matchesSearch;

  });

  return (
    
    <>
      <Header />
      <div className="filter-bg">
        <div className="container">
           <FilterPanel />
          { loading ? (
            <div className="row">
              {Array.from({ length: 8 }).map((_, index) => (
                <div key={index} className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4">
                  <SkeletonCard />
                </div>
              ))}
             </div>
          ):(
            filteredData.length === 0 ? (
              <div className="text-center mt-5">
                <h2>No product found</h2>
              </div>
            ) : ( 
            <ContentList data={filteredData} />
          )
             )}
        </div>
       
      </div>
      
    </>
  );
}

export default App;
