import React from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { Router } from 'react-router-dom';
import { history } from './history';
import { routes } from './routes';

export const App = () => {
  return (
    <HelmetProvider>
      <Router history={history}>{routes}</Router>
    </HelmetProvider>
  );
};
