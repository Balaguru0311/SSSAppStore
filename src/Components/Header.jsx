// src/components/Header.jsx  
import React from 'react';  
import { Link, useLocation } from 'react-router-dom';  
import Logo from "../assets/SSSLogo.jpg";

import { useCart } from './CartContext';  

const Header = () => {  
  const { cartItems,searchTerm, setSearchTerm } = useCart();  
  const location = useLocation(); // Get the current route  

  const handleSearchChange = (event) => {  
    setSearchTerm(event.target.value); // Update the search term  
  };  

  return (  
    <header className="fixed top-0 z-1 bg-gray-800 w-full text-white p-4 flex items-center justify-between">  
      <Link to="/">  
        <img src={Logo} alt="Logo" className="w-12 h-12 rounded" />  
      </Link>  

      {/* Conditionally render the search field or the go to products link */}  
      {location.pathname === '/SSSAppStore' ? (  
        <div className="flex-grow mx-4">  
          <input  
            type="text"  
            placeholder="Search..."  
            value={searchTerm}  
            onChange={handleSearchChange}  
            className="sm:w-50 md:w-75 p-2 rounded bg-[#fff] text-gray-700"  
          />  
        </div>  
      ) : (  
        <Link to="/SSSAppStore" className="text-3xl text-[#fff]">Go to Products</Link>  
      )}  

      <div>  
        <Link to="/SSSAppStore/cart" className="relative flex items-center">  
          <h2 className='text-[#fff]'>Cart : </h2>
          <svg   
            xmlns="http://www.w3.org/2000/svg"   
            className="h-6 w-6"   
            viewBox="0 0 24 24"   
            fill="none"   
            stroke="currentColor"   
            strokeWidth="2"  
            color="white"
          >  
             <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h18l-1.68 9H5.21l-.97 5.89A2 2 0 005 21h14a2 2 0 002-2H7M3 3l1 2h14l1-2M5 8h14"></path>  
          </svg>  
            
            <span className="absolute top-0 right-0 -mt-1 -mr-1 bg-red-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">  
              {cartItems.length}  
            </span>  
          
        </Link>  
      </div>  
    </header>  
  );  
};  

export default Header;