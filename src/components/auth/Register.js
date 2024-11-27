import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../../services/authService';
import './Register.css';
import { Link } from 'react-router-dom';

const Register = () => {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    title: '',
    department: '',
    photograph_path: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      await authService.register(formData);
      navigate('/login');
    } catch (err) {
      setError('Registration failed. Please try again.');
    }
  };

  const handleFocus = () => {
    if (error) {
      setError('');
    }
  };

  return (
    <div className="container">
      <div className="register-box">
        {/* Logo Section */}
        <div className="logo-container">
          <img src="/IIIT_Bangalore_Logo.svg.png" alt="Logo" />
        </div>

        <h2>Register as Employee</h2>
        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="text"
              id="first_name"
              name="first_name"
              value={formData.first_name}
              onChange={handleChange}
              placeholder="First Name"
              onFocus={handleFocus}
              required
            />
            <input
              type="text"
              id="last_name"
              name="last_name"
              value={formData.last_name}
              onChange={handleChange}
              placeholder="Last Name"
              onFocus={handleFocus}
              required
            />
          </div>

          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email Address"
            onFocus={handleFocus}
            required
          />

          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
            onFocus={handleFocus}
            required
            minLength="6"
            maxLength="12"
          />

          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Title"
            onFocus={handleFocus}
          />

          <input
            type="number"
            id="department"
            name="department"
            value={formData.department}
            onChange={handleChange}
            placeholder="Department ID"
            onFocus={handleFocus}
          />

          <button type="submit">Register</button>
        </form>

        <p>
        Already have an account?{' '}
        <Link to="/login" className="login-link">Login</Link>
        </p>

      </div>
    </div>
  );
};

export default Register;
