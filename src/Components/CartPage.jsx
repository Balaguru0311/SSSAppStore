import React from 'react';  
import { Link } from 'react-router-dom';

const CartPage = ({ cartItems, updateQuantity,removeFromCart }) => {  
    
  if (cartItems?.length === 0) {  
    return (
    <div>
        <Link to="/SSSAppStore" className='links'>Go to Products</Link>
        <h3>Your cart is empty.</h3>
    </div>
    )        
  }  

  return (  
    <div>  
      <Link to="/SSSAppStore" className='links'>Go to Products</Link>
      <h1 className='text-4xl mb-3'>Your Cart</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">  
        {cartItems.map((product) => (  
          <div  
            key={product.id}  
            className="border rounded-lg flex flex-col product-card"  
          >  
            <img  
              src={product.image}  
              alt={product.title}  
              className="w-full h-auto object-contain mb-2"  
            />  
            <div className='product-details'>
            <h3 className="mt-2 text-[14px] font-bold text-3xl text-[#0a192f]">{product.title}</h3>  
            <p className="text-gray-700 mt-2">${product.price.toFixed(2)}</p>
            <p className="text-sm text-gray-500">{product.category}</p>  
            
            <span className='text-[#0a192f]'>Qty: </span><input  
              type="number"  
              value={product.qty}  
              onChange={(e) => updateQuantity(product.id, parseInt(e.target.value))}  
              min="1" // Prevent negative quantities  
              className="bg-[#0a192f] mt-2 p-1 w-25 border rounded-lg text-center"  
            />    
            </div>
            <button onClick={() => removeFromCart(product.id)} className='add-cart-btn'>Remove</button>  
          </div>  
          
        ))}  
        </div>  
        <h4>  
        Total: $  
        {cartItems.reduce((total, item) => total + item.price * item.qty, 0).toFixed(2)}  
        </h4>
    </div>  
  );  
};  

export default CartPage;