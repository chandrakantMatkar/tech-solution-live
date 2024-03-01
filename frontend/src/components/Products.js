import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductItem from './ProductItem';
import { useLocation } from 'react-router-dom';


const Products = () => {
    const [products, setProducts] = useState([]);
    const location = useLocation();
    const [category, setCategory] = useState('');
    const [catAvailable, setCatAvailable] = useState(false);

    // const isCamerasPage = location.pathname === '/products/cameras';
    useEffect(() => {
      setCatAvailable(/products\/[\w]*/.test(location.pathname) ? true : false);
      setCategory(location.pathname.substring(location.pathname.lastIndexOf('/') + 1))
    }, [location.pathname])
    

    useEffect(() => {
        const controller = new AbortController();
        const signal = controller.signal;
        let fetchURL;
        if (catAvailable) {
            fetchURL = `http://localhost:5000/api/products/${category.substring(0, category.length - 1)}`;
        } else {
            fetchURL = 'http://localhost:5000/api/products';
        }
        // Fetch data when the component mounts
        axios.get(fetchURL, { signal })
        .then(response => { setProducts(response.data) })
        .catch(error => console.error('Error fetching products:', error));
        
        return () => {
            controller.abort();
        }
    }, [location.pathname, category, catAvailable]);
    

    return (
        <div>
            <h2 className='my-4 px-4'>{catAvailable ? category : 'All Products'}</h2>
            <div className="row my-2 ">
                {catAvailable ? products.map(product =>
                //   (<li key={product._id}>{product.name} - {product.description}</li>)
                { return <ProductItem product={product} type={category} key={product.id} /> }
                ) : products.map(product =>
                //   (<li key={product._id}>{product.name} - {product.description}</li>)
                { 
                    return <ProductItem product={product} key={product.id} />
                //   return  <MultiActionAreaCard product={product} description={product.description} key={product.id} />
                 }
                )
                }
            </div>
        </div>
    );
};

export default Products;
