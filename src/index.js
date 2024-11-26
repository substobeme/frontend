import React from 'react';
import ReactDOM from 'react-dom';
import './index.css'; // Include your global styles if you have any
import App from './App'; // Import the App component

// Render the App component into the root div of the HTML
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
