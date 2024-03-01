import React, { useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Services from './components/Services';
import Products from './components/Products';
// import Navbar from './components/Navbar';
import Navbar from './tailwindComponents/Navbar';
import ContactUs from './components/ContactUs';
import Footer from './components/Footer';
import NotFound from './tailwindComponents/NotFound';
import LoginForm from './components/LoginForm';
import ResetPassword from './components/ResetPassword';
import ContactList from './components/ContactList';

import { useEffect } from 'react';
import CategoryPreview from './tailwindComponents/CategoryPreview';
import ProductList from './tailwindComponents/ProductList';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const checkLogin = async ()=>{
    const token = await localStorage.getItem('token');
    if (token) {
      setLoggedIn(true);
    }
  }
  useEffect(() => {
    checkLogin();
  }, [])
  
  const isloggedIn = (value) => {
    setLoggedIn(value);
  }
  return (
    <div className="App">

      <Router>
        {/* <Navbar loggedIn={loggedIn} /> */}
        <Navbar/>
        <Routes>
          <Route path="/" exact Component={Home} />
          <Route path="/services" exact Component={CategoryPreview} />
          {/* <Route path="/products" exact Component={Products} /> */}
          <Route path="/contact" exact Component={ContactUs} />
          <Route path="/contact-list" exact Component={ContactList} />
          <Route path="/login" exact Component={(props) => <LoginForm {...props} isloggedIn={isloggedIn} />} />
          <Route path="/products" exact Component={CategoryPreview} />
          <Route path="/products/:category" exact Component={ProductList} />
          <Route path="/reset-password" exact Component={ResetPassword} />
          {/* <Route path="/category" exact Component={CategoryPreview} /> */}
          {/* <Route path="/productlist" exact Component={ProductList} /> */}
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
