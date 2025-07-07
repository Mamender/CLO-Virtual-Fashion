const SkeletonCard = () => {
  return (
    <div className="card h-100 placeholder-glow">
      
      <div className="card-img-top bg-secondary placeholder" style={{ height: "150px" }}></div>
      
      <div className="card-body d-flex justify-content-between align-items-start">
        
        <div className="w-75">
          <h5 className="card-title placeholder col-6 mb-2"></h5>
          <p className="card-text placeholder col-8"></p>
        </div>

        <div className="card-price ms-2">
          <strong className="placeholder col-4"></strong>
        </div>
        
      </div>
    </div>
  );
};

export default SkeletonCard;
