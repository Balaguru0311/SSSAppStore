import React, { useState } from 'react';  
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';  
import ProductList from './Components/ProductList';  
import CartPage from './Components/CartPage';  

const App = () => {  
  const [cartItems, setCartItems] = useState([]);  

  const addToCart = (product) => {  
    setCartItems((prev) => {  
      const existingProduct = prev.find(item => item.id === product.id);  
      if (existingProduct) {  
        return prev.map(item =>  
          item.id === product.id ? { ...item, qty: item.qty + 1 } : item  
        );  
      }  
      return [...prev, { ...product, qty: 1 }]; // Initialize qty for new items  
    });  
  };  

  const removeFromCart = (id) => {  
    setCartItems((prev) => prev.filter(item => item.id !== id));  
  };  

  const updateQuantity = (id, qty) => {  
    if (qty <= 0) {  
      removeFromCart(id); // Remove item if quantity is 0 or less  
    } else {  
      setCartItems((prev) =>  
        prev.map(item =>  
          item.id === id ? { ...item, qty } : item  
        )  
      );  
    }  
  };  

  return (  
    <Router> 
      <div className='cart'> 
      <h3>Cart: {cartItems.length}</h3>
      </div>
      <Routes>  
        <Route path="/" element={<ProductList addToCart={addToCart} />} />  
        <Route  
          path="/cart"  
          element={<CartPage cartItems={cartItems} updateQuantity={updateQuantity} removeFromCart={removeFromCart} />}  
        />  
      </Routes>  
    </Router>  
  );  
};  

export default App;