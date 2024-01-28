import React from 'react';
import { createRoot } from 'react-dom/client';
import { Auth0Provider } from '@auth0/auth0-react';
import App from './App';

const root = createRoot(document.getElementById('root'));

root.render(
  <Auth0Provider
    domain="dev-qn58b6ijj3dhz2zt.us.auth0.com"
    clientId="dyM4UQO0rMVRi45RXtRXYmRrfgoOdZ4p"
    authorizationParams={{
      redirect_uri: window.location.origin
    }}
  >
    <App />

  </Auth0Provider>,
);