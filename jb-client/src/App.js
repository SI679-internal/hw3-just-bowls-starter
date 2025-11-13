import React, { useEffect, useState } from "react";
import io from 'socket.io-client';

import "./styles.css"; 

import { getAllProducts, addProduct, updateProduct } from "./api/products";
import ProductCard from "./components/ProductCard";
import AddBowlForm from "./components/AddBowlForm";

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:6790';
const IMG_BASE_URL = `${API_BASE_URL}/images/`;

const IMG_FILE_NAMES = [
  'large_green_bowl.jpg',
  'large_white_bowl.jpg',
  'shallow_green_bowl.jpg',
  'shallow_jade_bowl.jpg',
  'small_blue_pattern_bowl.jpg',
];

const initBowls = [
  {
    name: "Big Green Bowl",
    image: 'large_green_bowl.jpg',
    diameter: '9"',
    depth: '4.5"',
    material: "Glazed Ceramic",
    color: "Green",
    price: "$24.99",
    stock: 14,
  },
  {
    name: "Big White Bowl",
    image: 'large_white_bowl.jpg',
    diameter: '7.5"',
    depth: '4.5"',
    material: "Plant-based plastic",
    color: "White",
    price: "$17.99",
    stock: 36,
  },
];

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

  useEffect(() => {
    const fetchBowls = async () => {
      let bowls = await getAllProducts();
      bowls = bowls.map(bowl => ({
        ...bowl,
      }));
      setBowls(bowls);
    };
    fetchBowls();
    const socket = io(API_BASE_URL);
    socket.on('updateProduct', (productId, updatedFields) => {
      console.log('updateProduct', productId, updatedFields);
      setBowls(bowls => bowls.map(b => 
        b.id === productId ? { ...b, ...updatedFields } : b
      ));
    });
  }, []);

  const handleAuthClick = () => {
    setIsLoggedIn(!isLoggedIn);
  };

  const handleBuy = async (bowl) => {
    try {
      await updateProduct(bowl.id, { stock: bowl.stock - 1 });
      console.log('updated bowl', bowl.id);
      // setBowls(bowls.map(b => 
      //   b.id === bowl.id ? { ...b, stock: b.stock - 1 } : b
      // ));
    } catch (error) {
      console.error('Failed to buy bowl', error);
    }
  };

  const handleReturnToStock = async (bowl) => { 
    try {
      await updateProduct(bowl.id, { stock: bowl.stock + 1 });
      // setBowls(bowls.map(b => 
      //   b.id === bowl.id ? { ...b, stock: b.stock + 1 } : b
      // ));
    } catch (error) {
      console.error('Failed to return bowl to stock', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewBowl({ ...newBowl, [name]: value });
  };

  const handleAddBowl = async (e) => {
    e.preventDefault();
    const bowlToAdd = {
      ...newBowl,
      image: newBowl.image ? `${IMG_BASE_URL}${newBowl.image}` : '',
      stock: parseInt(newBowl.stock, 10) || 0,
    };
    try {
      await addProduct(bowlToAdd);
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
    } catch (error) {
      console.error('Failed to add bowl', error);
    }
  };

  return (
    <main className="container">
      <header className="site-header">
        <div className="header-spacer" />
        <h1 className="site-title header-title">Just Bowls</h1>
        <div className="header-actions">
          <button 
            onClick={handleAuthClick}
            className="auth-button"
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
          onBuy={handleBuy}
          onReturnToStock={handleReturnToStock}
        />
      ))}
      {isLoggedIn && (
        <AddBowlForm
          newBowl={newBowl}
          imgFileNames={IMG_FILE_NAMES}
          onChange={handleInputChange}
          onSubmit={handleAddBowl}
        />
      )}
    </main>
  );
}