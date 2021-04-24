import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Home } from '@app/views/home.view';

export const routes = (
  <Switch>
    <Route exact path="/" component={Home} />
  </Switch>
);
