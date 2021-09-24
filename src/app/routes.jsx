import React from 'react';
import { Route, Switch } from 'react-router-dom';
import routesConst from '@constants/routes.constants';
import { HomeView, Instructions, SettingUp } from '@app/views/index';
import { InitializationWrapper } from '@components/initializationWrapper/initialization-wrapper';

export const routes = (
  <InitializationWrapper>
    <Switch>
      <Route path="/" component={SettingUp} />
      <Route exact path={routesConst.HomeView} component={HomeView} />
      <Route exact path={routesConst.Instructions} component={Instructions} />
    </Switch>
  </InitializationWrapper>
);
