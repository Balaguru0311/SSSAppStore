import React, { useEffect, useState } from 'react';  
import axios from 'axios';  

const ProductList = () => {  
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
      <div className='text-center'>
      <input  
        type="text"  
        placeholder="Search products..."  
        value={searchTerm}  
        onChange={(e) => setSearchTerm(e.target.value)}  
        className="mb-4 p-2 border rounded"  
      />  
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">  
        {filteredProducts.map((product) => (  
          <div key={product.id} className="border rounded-lg p-4">  
            <img src={product.image} alt={product.title} className="w-full h-48 object-cover" />  
            <h3 className="mt-2 text-lg">{product.title}</h3>  
            <p>${product.price}</p>  
            <p>{product.category}</p>  
            <p>{'⭐'.repeat(Math.round(product.rating.rate))}</p>  
          </div>  
        ))}  
      </div>  
    </div>  
  );  
};  

export default ProductList;