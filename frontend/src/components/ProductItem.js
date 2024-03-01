import React from 'react'
import { useNavigate, useLocation } from 'react-router-dom';

export default function ProductItem(props) {
    const navigate = useNavigate();
    const location = useLocation();
    const isCamerasPage = location.pathname.match(/products\/[\w]+/);
    const handleClick = () => {
    //    if (location.pathname === '/products') {
           navigate(`/products/${product.category}s`);
        // } 
    }
    const { product } = props;
    return (
        <div className=" col my-2 mx-2"  onClick={handleClick}>
            <div className="card " style={{ width: '18rem'}} >
                <div className="card-body">
                    <h5 className="card-title">{isCamerasPage ? product.model : product.category}</h5>
                    <h6 className="card-title">{isCamerasPage ? product.brand : ''}</h6>
                    <img className='itemCard' src={product.imageUrl} alt="" />
                    <p className="card-text">{product.description}</p>
                </div>
            </div>
        </div>
    )
}
