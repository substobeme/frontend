import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../../services/authService';
import './login.css';  

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
      navigate('/dashboard'); // Redirect to dashboard after successful login
    } catch (err) {
      setError('Login failed. Please check your credentials.');
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
        
        {/* Heading */}
        <h2>Login as Employee</h2>

        {/* Error Message */}
        {error && <div className="error-message">{error}</div>}

        {/* Login Form */}
        <form onSubmit={handleSubmit}>
          {/* Email Input */}
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onFocus={handleFocus}
            placeholder="Email Address"
            required
          />

          {/* Password Input */}
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password" 
            onFocus={handleFocus}
            required 
          />

          {/* Submit Button */}
          <button
            type="submit"
          >
            Log In
          </button>
        </form>

        {/* Register Link */}
        <p className="register-link">
          Don't have an account? 
          <button
            onClick={() => navigate('/register')}
          >
            Register
          </button>
        </p>
      </div>
    </div>
  );
};

export default Login;

