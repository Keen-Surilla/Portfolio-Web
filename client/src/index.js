import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/theme.css';   // colors, fonts, sizes (edit this one to restyle)
import './styles/global.css';  // shared styles built from the theme tokens
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

reportWebVitals();