import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useLocation, Link } from 'react-router-dom';
import Breadcrumb from '../components/Breadcrumb';


export default function ProductList(props) {
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();
    const location = useLocation();
    const [category, setCategory] = useState('');
    const [catAvailable, setCatAvailable] = useState(false);

    // const isCamerasPage = location.pathname === '/products/cameras';
    useEffect(() => {
        setCatAvailable(/products\/[\w]*/.test(location.pathname) ? true : false);
        setCategory(location.pathname.substring(location.pathname.lastIndexOf('/') + 1))
    }, [location.pathname]);

    useEffect(() => {
        const controller = new AbortController();
        const signal = controller.signal;
        let fetchURL = `http://localhost:5000/api/products/${category.substring(0, category.length - 1)}`;

        // Fetch data when the component mounts
        axios.get(fetchURL, { signal })
            .then(response => { setProducts(response.data) })
            .catch(error => console.error('Error fetching products:', error));

        return () => {
            controller.abort();
        }
    }, [location.pathname, category, catAvailable]);

    const handleClick = (e) => {
        //    if (location.pathname === '/products') {
        navigate(`/products/${product.category}s`);
        // } 
    }
    const { product } = props;
    return (
        <div className="bg-white">
            <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
                <Breadcrumb paths={location.pathname} />
                <h2 className="text-2xl font-bold tracking-tight text-gray-900">{category.charAt(0).toUpperCase()+category.slice(1)}</h2>

                <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                    {products.map((product) => (
                        <div key={product.id} className="group relative">
                            <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                                <img
                                    src={product.imageUrl}
                                    alt=""
                                    className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                                />
                            </div>
                            <div className="mt-4 flex justify-between">
                                <div>
                                    <h3 className="text-sm text-gray-700">
                                        <Link to='#'>
                                            <span aria-hidden="true" className="absolute inset-0" />
                                            {catAvailable ? product.model : product.category}
                                        </Link>
                                    </h3>
                                    <p className="mt-1 text-sm text-gray-500">{catAvailable ? product.brand : ''}</p>
                                </div>
                                <p className="text-sm font-medium text-gray-900">{product.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
