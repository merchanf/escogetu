import React from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { ConnectedRouter } from 'connected-react-router';
import { Provider } from 'react-redux';
import { Layout } from '@app/components';
import { reduxStore } from '@stores/store';
import { history } from './history';
import { routes } from './routes';

export const App = () => {
  return (
    <Provider store={reduxStore}>
      <HelmetProvider>
        <div id="map" />
        <Layout>
          <ConnectedRouter history={history}>{routes}</ConnectedRouter>
        </Layout>
      </HelmetProvider>
    </Provider>
  );
};
