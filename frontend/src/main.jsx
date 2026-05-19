import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './styles/index.css';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext.jsx';
import { MovieProvider } from './context/MovieContext.jsx';
import { FavoriteProvider } from './context/FavoriteContext.jsx';
import { AdminProvider } from './context/AdminContext.jsx';
import { Toaster } from 'react-hot-toast';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <MovieProvider>
          <FavoriteProvider>
            <AdminProvider>
              <App />
              <Toaster
                position="top-right"
                toastOptions={{
                  style: {
                    background: '#121212',
                    color: '#fff',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    fontFamily: 'Outfit, sans-serif',
                  },
                }}
              />
            </AdminProvider>
          </FavoriteProvider>
        </MovieProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
