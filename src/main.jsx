import React from 'react';
import ReactDOM from 'react-dom/client';
import "./main.css";
import App from './App';
import { FirebaseContextProvider } from './Context/FirebaseContext';
import { AppContextProvider } from './Context/AppContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  
    <FirebaseContextProvider>
      <AppContextProvider>
        <App />
      </AppContextProvider>
    </FirebaseContextProvider>
  
);