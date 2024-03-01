import React, { useState, useEffect } from 'react';
import './login.css';
import { Toaster, toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const LoginForm = ({ isloggedIn }) => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleLogin = async () => {
    try {
      // Perform API call here
      toast.loading('Loading', { duration: 500 });
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: username, password }),
      });
      const data = await response.json();
      toast.dismiss();
      if (response.ok) {
        // Handle successful login
        toast.success('Login successful')
        if (data.authToken) {
          console.log('Login successful', data.authToken);
          isloggedIn(true);
          localStorage.setItem("token",data.authToken);
          navigate('/');
        }
      } else {
        // Handle login failure
        toast.error('Login Failed.')
        const data = await response.json();
        setError(data.error || 'Login failed');
        isloggedIn(false);
      }
    } catch (error) {
      console.error('Error during login:', error);
      setError('An unexpected error occurred');
      toast.error('An unexpected error occurred')
    }
  };

  const handleForgotPassword = async () => {
    const toastId = toast.loading('Loading');
    try {
      // Perform API call here
      const response = await fetch('http://localhost:5000/api/auth/forgot-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: username }),
      });
      if (response.ok) {
        toast.success(`Password reset link has been sent to your email address: ${username}`, { id: toastId });
        // Handle successful login
        console.log('Login successful');
      } else {
        // Handle login failure
        const data = await response.json();
        toast.error(`Could not send reset link to your email. ${data.error}`, { id: toastId })
        setError(data.error || 'Login failed');
      }
    } catch (error) {
      console.error('Error during login:', error);
      setError('An unexpected error occurred');
      toast.error('An unexpected error occurred', { id: toastId })
    }
  }

  const handleChangePass = (e) => {
    setPassword(e.target.value)
  }
  const handleChangeUser = (e) => {
    setUsername(e.target.value)
  }

  return (
    <div className="login-container">
      <Toaster reverseOrder={false} />
      <img src="https://thumbs.dreamstime.com/b/demo-icon-demo-147077326.jpg" alt="Logo" className="logo" />
      <h2>Login</h2>
      <form action="#" method="post">
        <label htmlFor="username">Username</label>
        <input type="text" id="username" name="username" required onChange={handleChangeUser} />

        <label htmlFor="password">Password</label>
        <input type="password" id="password" name="password" required onChange={handleChangePass} />

        <div className="form-options">
          <a href="#" className="forgot-password" onClick={handleForgotPassword}>
            Forgot Password?
          </a>
        </div>
        {error && <p className="error-message">{error}</p>}
        <button type="button" onClick={handleLogin}>
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
