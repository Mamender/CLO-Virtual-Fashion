const ContentCard = ({ item }) => {
  const pricingText = item.pricingOption === 1 ? `$${item.price}` :
                      item.pricingOption === 0 ? "Free" : "View Only";
if (!item || !item.imagePath || !item.title || !item.creator) {
    return ('<h1>No Data</h1>'); // Render nothing if item data is incomplete
  }
  return (
    <div className="card h-100">
      <img src={item.imagePath} className="card-img" alt={item.title} />
      <div className="card-body d-flex flex-row">
        <div className="d-flex justify-content-betweenmb-2 flex-column">
          <h5 className="card-title">{item.title}</h5>
          <p className="card-text">{item.creator}</p>
        </div>
        
        <div className="card-price">
          <strong>{pricingText}</strong>
      </div>
      </div>
      
    </div>
  );
};

export default ContentCard;
