import axios from 'axios';

const BASE_URL = 'http://localhost:9001'; 

export const authService = {
  login: async (email, password) => {
    try {
      const response = await axios.post(`${BASE_URL}/api/v1/auth/login`, {
        email,
        password
      }, {
        validateStatus: function (status) {
          return status === 200 || status === 401;
        }
      });

      console.log('Login Response:', response);

      if (response.status === 200) {
        if (response.data && response.data.token) {
          localStorage.setItem('token', response.data.token);  
          return response.data.token;  
        } else {
          console.error('Login failed: Token missing in response.');
          throw new Error('Token missing in response.');
        }
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
    return localStorage.getItem('token');
  }
};
