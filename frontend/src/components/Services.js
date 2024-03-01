import axios from 'axios'
import React, { useState, useEffect } from 'react'
import ServiceItem from './ServiceItem';

const Services = () => {
    const [services, setServices] = useState([]);
    const fetchURL = 'http://localhost:5000/api/services';
    useEffect(() => {
        axios.get(fetchURL)
        .then(response => { setServices(response.data) })
        .catch(error => console.error('Error fetching products:', error));
    }, [])
    
  return (
    <div>
        <h2 className='my-4 px-4'>{'All Services'}</h2>
    <div className="row my-2">
        { services.map(service =>
            //   (<li key={product._id}>{product.name} - {product.description}</li>)
            { return <ServiceItem service={service} key={service.id} /> }
            )
        }
    </div></div>
  )
}

export default Services