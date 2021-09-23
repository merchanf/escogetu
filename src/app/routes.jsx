import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { HomeView } from '@app/views/index';
import { InitializationWrapper } from '@components/initializationWrapper/initialization-wrapper';

export const routes = (
  <InitializationWrapper>
    <Switch>
      <Route exact path="/" component={HomeView} />
    </Switch>
  </InitializationWrapper>
);
