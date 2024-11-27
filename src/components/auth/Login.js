import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../../services/authService';
import './login.css';  
import { Link } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      await authService.login(email, password);
      navigate('/dashboard');
    } catch (err) {
      console.error('Login Catch Block:', err);
      
      // More specific error messaging
      if (err.response) {
        // Server responded with an error
        switch(err.response.status) {
          case 401:
            setError('Invalid email or password');
            break;
          case 404:
            setError('User not found');
            break;
          default:
            setError('Login failed. Please try again.');
        }
      } else if (err.message) {
        // Network error or other error
        setError(err.message);
      } else {
        setError('An unexpected error occurred');
      }
    }
  };
  const handleFocus = () => {
    if (error) {
      setError('');
    }
  };

  return (
    <div className="container">
      <div className="login-box">
        {/* Logo Section */}
        <div className="logo-container">
          <img src="/IIIT_Bangalore_Logo.svg.png" alt="Logo" />
        </div>
   
        <h2>Welcome Back to Portal</h2>

        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleSubmit}>
        
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onFocus={handleFocus}
            placeholder="Email Address"
            required
          />

          
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password" 
            onFocus={handleFocus}
            required 
          />

         
          <button
            type="submit"
          >
            Log In
          </button>
        </form>

       
        <p>
          Already have an account? 
          <Link to="/register" className="register-link">Register</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;

