import React from 'react';
import ReactDOM from 'react-dom/client';
import "./main.css";
import App from './App';
import { FirebaseContextProvider } from './Context/FirebaseContext';
import { AppContextProvider } from './Context/AppContext';
import { Provider } from 'react-redux';
import { store } from './Store/store';

ReactDOM.createRoot(document.getElementById('root')).render(
  
    <FirebaseContextProvider>
      <AppContextProvider>
        <Provider store={store}>
        <App />
        </Provider>
      </AppContextProvider>
    </FirebaseContextProvider>
  
);