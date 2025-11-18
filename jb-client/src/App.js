import React, { useState, useEffect } from "react";
import io from 'socket.io-client';

import "./styles.css"; 

import { 
  getAllProducts, 
  addProduct, 
  updateProduct, 
  IMG_FILE_NAMES 
} from "./api/products";
import ProductCard from "./components/ProductCard";
import AddBowlForm from "./components/AddBowlForm";
import { API_URL } from "./api/apiClient";

export default function App() {

  const [bowls, setBowls] = useState([]);
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
    const socket = io(API_URL);
    socket.on('updateProduct', (productId, updatedFields) => {
      console.log('updateProduct received', productId, updatedFields);
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
      await updateProduct(
        bowl.id, 
        { stock: bowl.stock - 1 }
      );  
    } catch (error) {
      console.error('Failed to buy bowl', error);
    }
  };

  const handleReturnToStock = async (bowl) => { 
    try {
      await updateProduct(
        bowl.id, 
        { stock: bowl.stock + 1 }
      );  
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
    try {    
      const bowlToAdd = {
        ...newBowl,
        stock: parseInt(newBowl.stock, 10) || 0,
      };
      bowlToAdd.id = await addProduct(bowlToAdd);
      setBowls([...bowls, bowlToAdd ]);
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