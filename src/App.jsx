import React, { useState } from 'react';  
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';  
import ProductList from './Components/ProductList';  
import CartPage from './Components/CartPage';  
import { CartProvider, useCart } from './Components/CartContext';  
import Header from './Components/Header';

const CartStatus = () => {  
  const { cartItems } = useCart(); // Get cartItems from context  
  return (
  <div className='cart'> 
  <Link to="/cart"><span>Cart: </span><span>{cartItems.length}</span></Link>
  </div>
  ) 
}; 
const App = () => {  
  return (  
    <CartProvider>
    <Router>
    <Header />
      <Routes>  
        <Route path="/SSSAppStore" element={<ProductList />} />  
        <Route path="/SSSAppStore/cart"  element={<CartPage />}  />  
      </Routes>  
      <div className='footer'>
        <p>@SSS Emart - All rights reserved 2025</p>
      </div>
    </Router>  
    </CartProvider>
  );  
};  

export default App;