import React, { useEffect } from 'react';
import { Link, useLocation } from "react-router-dom";

export default function Navbar({loggedIn}) {
    const location = useLocation();
    useEffect(() => {
      console.log(loggedIn)
    }, [])
    
    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary ">
            <div className="container-fluid text-align-center">
                <Link className="navbar-brand" to="">Tech Solution</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className={`nav-link ${location.pathname==='/'?'active':''}`} aria-current="page" to="/">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className={`nav-link ${location.pathname.startsWith('/products') ?'active':''}`} to="/products">Products</Link>
                        </li>
                        <li className="nav-item">
                            <Link className={`nav-link ${location.pathname==='/services'?'active':''}`} to="/services">Services</Link>
                        </li>
                        <li className="nav-item">
                            <Link className={`nav-link ${location.pathname==='/contact'?'active':''}`} to="/contact">Contact Us</Link>
                        </li>
                      {loggedIn && (<li className="nav-item">
                            <Link className={`nav-link ${location.pathname==='/contact-list'?'active':''}`} to="/contact-list">Contact List</Link>
                        </li>)}
                        <li className="nav-item">
                            <Link className={`nav-link ${location.pathname==='/login'?'active':''}`} to="/login">Login</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}