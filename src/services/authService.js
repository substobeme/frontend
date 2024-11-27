import axios from 'axios';

const BASE_URL = 'http://localhost:9001'; 

export const authService = {
  login: async (email, password) => {
    try {
      const response = await axios.post(`${BASE_URL}/api/v1/auth/login`, {
        email,
        password
      }, {
        // Explicitly handle different status codes
        validateStatus: function (status) {
          return status === 200 || status === 401;
        }
      });
      
      // Log the full response for debugging
      console.log('Login Response:', response);

     
      if (response.status === 200) {
       
        localStorage.setItem('token', response.data);
        return response.data;
      } else if (response.status === 401) {
        
        console.error('Login failed: Unauthorized');
        throw new Error('Invalid credentials');
      }
    } catch (error) {
     
      console.error('Login Error:', error);
     
      if (error.response) {
        console.error('Error Response:', error.response.data);
        console.error('Error Status:', error.response.status);
      }
      
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