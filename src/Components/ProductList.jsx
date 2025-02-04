// src/components/ProductList.jsx  
import React, { useEffect, useState } from 'react';  
import axios from 'axios';   
import "../App.css";  
import { Link } from 'react-router-dom';
import { useCart } from './CartContext';

const ProductList = () => {  
  const [products, setProducts] = useState([]);  
  const [loading, setLoading] = useState(true);  
  const [error, setError] = useState(null);  
  const { addToCart, searchTerm } = useCart();

  useEffect(() => {  
    const fetchProducts = async () => {  
        try {
          const response = await axios.get('https://fakestoreapi.com/products');    
          setProducts(response.data);  
        } catch (err) {  
          setError('Error fetching products:',err);  
        } finally {  
          setLoading(false);  
        }
    };  
    fetchProducts();  
  }, []);  

  const filteredProducts = products.filter(product =>  
    product.title.toLowerCase().includes(searchTerm.toLowerCase())  
  );  

  
  
  if (loading) return <div className="spinner text-4xl text-[#0a192f] mt-[100px]">Loading...</div>;  
  if (error) return <div className="error">{error}</div>;  

  return (  
    <div>  
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mx-8 my-24">  
        {filteredProducts.map((product) => (  
          <div  
            key={product.id}  
            className="border rounded-lg flex flex-col product-card"  
          >  
            <img  
              src={product.image}  
              alt={product.title}  
              className="w-full h-auto object-contain mb-2"  
            />  
            <h3 className="mt-2 text-[14px] font-bold text-3xl text-[#0a192f]">{product.title}</h3>  
            <p className="text-gray-700 mt-2">${product.price}</p>  
            <p className="text-sm text-gray-500">{product.category}</p>  
            <p className="text-yellow-500">{'⭐'.repeat(Math.round(product.rating.rate))}</p> 
            <button className='add-cart-btn' onClick={()=>addToCart(product)}>Add Cart</button>  
          </div>  
          
        ))}  
      </div>  
    </div>  
  );  
};  

export default ProductList;