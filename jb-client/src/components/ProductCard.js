import React from 'react';

export default function ProductCard({ bowl, isLoggedIn, onBuy, onReturnToStock }) {

  return (
    <div className="product-card">
      <img src={bowl.image} alt={bowl.name} className="product-image" />
      <div className="product-info">
        <h2 className="product-title">{bowl.name}</h2>
        <ul className="product-details">
          <li><strong>Diameter:</strong> {bowl.diameter}</li>
          <li><strong>Depth:</strong> {bowl.depth}</li>
          <li><strong>Material:</strong> {bowl.material}</li>
          <li><strong>Color:</strong> {bowl.color}</li>
          <li><strong>Price:</strong> {bowl.price}</li>
          <li><strong>In Stock:</strong> {bowl.stock}</li>
        </ul>
        <div className="product-actions">
          {!isLoggedIn && (
            <button 
              className="buy-button"
              onClick={() => onBuy(bowl)}
            >
              Buy Now!
            </button>
          )}
          {isLoggedIn && (
            <button 
              className="buy-button return-button"
              onClick={() => onReturnToStock(bowl)}
            >
              Return to Stock
            </button>
          )}
        </div>
      </div>
    </div>
  );
}