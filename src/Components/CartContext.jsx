// src/CartContext.jsx  
import React, { createContext, useContext, useState } from 'react';  

const CartContext = createContext();  

export const useCart = () => {  
  return useContext(CartContext);  
};  

export const CartProvider = ({ children }) => {  
  const [cartItems, setCartItems] = useState([]);  
  const [searchTerm, setSearchTerm] = useState('');  
  
  const addToCart = (product) => {  
    setCartItems((prev) => {  
      const existingProduct = prev.find(item => item.id === product.id);  
      if (existingProduct) {  
        return prev.map(item =>  
          item.id === product.id ? { ...item, qty: item.qty + 1 } : item  
        );  
      }  
      return [...prev, { ...product, qty: 1 }];  
    });  
  };  

  const removeFromCart = (id) => {  
    setCartItems((prev) => prev.filter(item => item.id !== id));  
  };  

  const updateQuantity = (id, qty) => {  
    if (qty <= 0) {  
      removeFromCart(id);  
    } else {  
      setCartItems((prev) =>  
        prev.map(item =>  
          item.id === id ? { ...item, qty } : item  
        )  
      );  
    }  
  };  

  return (  
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, updateQuantity, searchTerm, setSearchTerm }}>  
      {children}  
    </CartContext.Provider>  
  );  
};