import React, { useState } from "react";
import "./styles.css"; // 

import large_green_bowl from  './assets/large_green_bowl.jpg'
import large_white_bowl from  './assets/large_white_bowl.jpg'

const initBowls = [
  {
    name: "Big Green Bowl",
    image: large_green_bowl,
    diameter: '9"',
    depth: '4.5"',
    material: "Glazed Ceramic",
    color: "Green",
    price: "$24.99",
    stock: 14,
  },
  {
    name: "Big White Bowl",
    image: large_white_bowl,
    diameter: '7.5"',
    depth: '4.5"',
    material: "Plant-based plastic",
    color: "White",
    price: "$17.99",
    stock: 36,
  },
];

function ProductCard({ bowl, isLoggedIn, onReturnToStock }) {

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
        <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
          <button className="buy-button">Buy Now!</button>
          {isLoggedIn && (
            <button 
              className="buy-button"
              onClick={() => onReturnToStock(bowl)}
              style={{ backgroundColor: '#90EE90' }}
            >
              Return to Stock
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const [bowls, setBowls] = useState(initBowls);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [newBowl, setNewBowl] = useState({
    name: '',
    image: '',
    diameter: '',
    depth: '',
    material: '',
    color: '',
    price: '',
    stock: '',
  });

  const handleAuthClick = () => {
    setIsLoggedIn(!isLoggedIn);
  };

  const handleReturnToStock = (bowl) => {
    setBowls(bowls.map(b => 
      b === bowl ? { ...b, stock: b.stock + 1 } : b
    ));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewBowl({ ...newBowl, [name]: value });
  };

  const handleAddBowl = (e) => {
    e.preventDefault();
    const bowlToAdd = {
      ...newBowl,
      stock: parseInt(newBowl.stock) || 0,
    };
    setBowls([...bowls, bowlToAdd]);
    setNewBowl({
      name: '',
      image: '',
      diameter: '',
      depth: '',
      material: '',
      color: '',
      price: '',
      stock: '',
    });
  };

  return (
    <main className="container">
      <header style={{ display: 'flex', alignItems: 'center', marginBottom: '20px', position: 'relative' }}>
        <div style={{ flex: 1 }}></div>
        <h1 className="site-title" style={{ flex: 1, textAlign: 'center' }}>Just Bowls</h1>
        <div style={{ flex: 1, display: 'flex', justifyContent: 'flex-end' }}>
          <button 
            onClick={handleAuthClick}
            style={{
              padding: '8px 16px',
              fontSize: '16px',
              cursor: 'pointer',
              border: '1px solid #ccc',
              borderRadius: '4px',
              backgroundColor: '#fff'
            }}
          >
            {isLoggedIn ? 'Logout' : 'Login'}
          </button>
        </div>
      </header>
      {bowls.map((bowl, index) => (
        <ProductCard 
          key={index} 
          bowl={bowl} 
          isLoggedIn={isLoggedIn}
          onReturnToStock={handleReturnToStock}
        />
      ))}
      {isLoggedIn && (
        <form 
          onSubmit={handleAddBowl}
          style={{
            marginTop: '40px',
            padding: '20px',
            border: '2px solid #ccc',
            borderRadius: '8px',
            display: 'flex',
            flexDirection: 'column',
            gap: '15px'
          }}
        >
          <h2 style={{ marginTop: 0 }}>Add New Bowl</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <label>
              Name:
              <input
                type="text"
                name="name"
                value={newBowl.name}
                onChange={handleInputChange}
                required
                style={{ width: '100%', padding: '8px', marginTop: '5px' }}
              />
            </label>
            <label>
              Image URL:
              <input
                type="text"
                name="image"
                value={newBowl.image}
                onChange={handleInputChange}
                required
                style={{ width: '100%', padding: '8px', marginTop: '5px' }}
              />
            </label>
            <label>
              Diameter:
              <input
                type="text"
                name="diameter"
                value={newBowl.diameter}
                onChange={handleInputChange}
                required
                style={{ width: '100%', padding: '8px', marginTop: '5px' }}
              />
            </label>
            <label>
              Depth:
              <input
                type="text"
                name="depth"
                value={newBowl.depth}
                onChange={handleInputChange}
                required
                style={{ width: '100%', padding: '8px', marginTop: '5px' }}
              />
            </label>
            <label>
              Material:
              <input
                type="text"
                name="material"
                value={newBowl.material}
                onChange={handleInputChange}
                required
                style={{ width: '100%', padding: '8px', marginTop: '5px' }}
              />
            </label>
            <label>
              Color:
              <input
                type="text"
                name="color"
                value={newBowl.color}
                onChange={handleInputChange}
                required
                style={{ width: '100%', padding: '8px', marginTop: '5px' }}
              />
            </label>
            <label>
              Price:
              <input
                type="text"
                name="price"
                value={newBowl.price}
                onChange={handleInputChange}
                required
                style={{ width: '100%', padding: '8px', marginTop: '5px' }}
              />
            </label>
            <label>
              Stock:
              <input
                type="number"
                name="stock"
                value={newBowl.stock}
                onChange={handleInputChange}
                required
                style={{ width: '100%', padding: '8px', marginTop: '5px' }}
              />
            </label>
          </div>
          <button 
            type="submit"
            className="buy-button"
            style={{ alignSelf: 'flex-start' }}
          >
            Add Bowl
          </button>
        </form>
      )}
    </main>
  );
}
