import { useEffect, useState } from "react";
import ContentCard from "./ContentCard";

const ContentList = ({ data }) => {
  const [visibleCount, setVisibleCount] = useState(12);

  const handleScroll = () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 50) {
      setVisibleCount(prev => prev + 8);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="row">
      {data.slice(0, visibleCount).map(item => (
        <div key={item.id} className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4">
          <ContentCard item={item} />
        </div>
      ))}
    </div>
  );
};

export default ContentList;
