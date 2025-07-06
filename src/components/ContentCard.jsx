const ContentCard = ({ item }) => {
  const pricingText = item.pricingOption === 1 ? `$${item.price}` :
                      item.pricingOption === 0 ? "Free" : "View Only";

  return (
    <div className="card h-100">
      <img src={item.imagePath} className="card-img-top" alt={item.title} />
      <div className="card-body">
        <h5 className="card-title">{item.title}</h5>
        <p className="card-text">{item.creator}</p>
      </div>
      <div className="card-footer">
        <strong>{pricingText}</strong>
      </div>
    </div>
  );
};

export default ContentCard;
