import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { FirebaseContextProvider } from './Context/FirebaseContext';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <FirebaseContextProvider>
    <App />
  </FirebaseContextProvider>

);

reportWebVitals();
