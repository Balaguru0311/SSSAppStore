// src/components/ProductList.jsx  
import React, { useEffect, useState } from 'react';  
import axios from 'axios';   
import "../App.css";  
import { Link } from 'react-router-dom';

const ProductList = ({addToCart}) => {  
  const [products, setProducts] = useState([]);  
  const [loading, setLoading] = useState(true);  
  const [error, setError] = useState(null);  
  const [searchTerm, setSearchTerm] = useState('');  
  
  useEffect(() => {  
    const fetchProducts = async () => {  
      try {  
        const response = await axios.get('https://fakestoreapi.com/products');  
        setProducts(response.data);  
      } catch (err) {  
        setError('Error fetching products');  
      } finally {  
        setLoading(false);  
      }  
    };  
    fetchProducts();  
  }, []);  

  const filteredProducts = products.filter(product =>  
    product.title.toLowerCase().includes(searchTerm.toLowerCase())  
  );  

  
  
  if (loading) return <div className="spinner">Loading...</div>;  
  if (error) return <div className="error">{error}</div>;  

  return (  
    <div>    
      <h1 className='text-4xl mb-3'>Product Lists</h1>
      <Link to="/cart" className='links'>Go to Cart</Link>
      
      <input  
        type="text"  
        placeholder="Search products..."  
        value={searchTerm}  
        onChange={(e) => setSearchTerm(e.target.value)}  
        className="mb-4 p-2 w-75 border rounded-lg"  
      />  
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">  
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
            <div className='product-details'>
            <h3 className="mt-2 text-[14px] font-bold text-3xl text-[#0a192f]">{product.title}</h3>  
            <p className="text-gray-700 mt-2">${product.price}</p>  
            <p className="text-sm text-gray-500">{product.category}</p>  
            <p className="text-yellow-500">{'⭐'.repeat(Math.round(product.rating.rate))}</p> 
            </div>
            <button className='add-cart-btn' onClick={()=>addToCart(product)}>Add Cart</button>  
          </div>  
          
        ))}  
      </div>  
      
    </div>  
  );  
};  

export default ProductList;