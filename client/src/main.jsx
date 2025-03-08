import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { BrowserRouter } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import ContextProvider from './context/ContextProvider';

const googleClientId = "18712848245-keq5olsg1pek72qteod53d00g5t7o4c0.apps.googleusercontent.com";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GoogleOAuthProvider clientId={googleClientId}>
      <BrowserRouter>
        <ContextProvider>
          <App/>
        </ContextProvider>
      </BrowserRouter>
    </GoogleOAuthProvider>
  </StrictMode>
);
