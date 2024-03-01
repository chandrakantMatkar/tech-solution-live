import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useLocation } from 'react-router-dom';

const callouts = [
    {
      name: 'Desk and Office',
      description: 'Work from home accessories',
      imageSrc: 'https://tailwindui.com/img/ecommerce-images/home-page-02-edition-01.jpg',
      imageAlt: 'Desk with leather desk pad, walnut desk organizer, wireless keyboard and mouse, and porcelain mug.',
      href: '#',
    },
    {
      name: 'Self-Improvement',
      description: 'Journals and note-taking',
      imageSrc: 'https://tailwindui.com/img/ecommerce-images/home-page-02-edition-02.jpg',
      imageAlt: 'Wood table with porcelain mug, leather journal, brass pen, leather key ring, and a houseplant.',
      href: '#',
    },
    {
      name: 'Travel',
      description: 'Daily commute essentials',
      imageSrc: 'https://tailwindui.com/img/ecommerce-images/home-page-02-edition-03.jpg',
      imageAlt: 'Collection of four insulated travel bottles on wooden shelf.',
      href: '#',
    },
  ]

  
  
  export default function CategoryPreview() {
    const [products, setProducts] = useState([]);
    const location = useLocation();
    const [category, setCategory] = useState('');
    const [catAvailable, setCatAvailable] = useState(false);

    // const isCamerasPage = location.pathname === '/products/cameras';
    useEffect(() => {
      setCatAvailable(/products\/[\w]*/.test(location.pathname) ? true : false);
      setCategory(location.pathname.substring(location.pathname.lastIndexOf('/') + 1))
      setProducts([])
    }, [location.pathname])
    

    useEffect(() => {
        const controller = new AbortController();
        const signal = controller.signal;
        let fetchURL;
        if (catAvailable) {
            // fetchURL = `http://localhost:5000/api/products/${category.substring(0, category.length - 1)}`;
            fetchURL = `http://localhost:5000/api${location.pathname}/${category.substring(0, category.length - 1)}`;
        } else {
            fetchURL = `http://localhost:5000/api${location.pathname}`;
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
      <div className="bg-gray-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl py-16 sm:py-24 lg:max-w-none lg:py-32">
            <h2 className="text-2xl font-bold text-gray-900">{catAvailable ? category : `All ${location.pathname.slice(1).charAt(0).toUpperCase() + location.pathname.slice(2)}`}</h2>
  
            <div className="mt-6 space-y-12 lg:grid lg:grid-cols-3 lg:gap-x-6 lg:space-y-0">
              {products.length===0?<h5>No Items to display</h5>:products.map((product) => (
                <div key={product.category} className="group relative">
                  <div className="relative h-80 w-full overflow-hidden rounded-lg bg-white sm:aspect-h-1 sm:aspect-w-2 lg:aspect-h-1 lg:aspect-w-1 group-hover:opacity-75 sm:h-64">
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      className="h-full w-full object-cover object-center"
                    />
                  </div>
                  <h3 className="mt-6 text-sm text-gray-500">
                    <Link to={`/products/${product.category}s`}>
                      <span className="absolute inset-0" />
                      {product.category.charAt(0).toUpperCase()+product.category.slice(1)}
                    </Link>
                  </h3>
                  <p className="text-base font-semibold text-gray-900">{product.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }
  