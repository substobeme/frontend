import axios from 'axios';

const BASE_URL = 'http://localhost:9001'; 

export const authService = {
  login: async (email, password) => {
    try {
      const response = await axios.post(`${BASE_URL}/api/v1/auth/login`, {
        email,
        password
      });
      
  
      if (response.data) {
        localStorage.setItem('token', response.data);
        return response.data;
      }
      return null;
    } catch (error) {
      console.error('Login failed:', error.response?.data || error.message);
      throw error;
    }
  },

  register: async (employeeData) => {
    try {
      const response = await axios.post(`${BASE_URL}/employee/`, employeeData);
      return response.data;
    } catch (error) {
      console.error('Registration failed:', error.response?.data || error.message);
      throw error;
    }
  },

  logout: () => {
    localStorage.removeItem('token');
  },

  isAuthenticated: () => {
    return !!localStorage.getItem('token');
  }
};