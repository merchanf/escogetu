import React from 'react';
import { Route, Switch } from 'react-router-dom';
import routesConst from '@constants/routes.constants';
import { HomeView, Instructions, SettingUp } from '@app/views/index';
import { InitializationWrapper } from '@components/initializationWrapper/initialization-wrapper';

export const routes = (
  <InitializationWrapper>
    <Switch>
      <Route exact path="/" component={SettingUp} />
      <Route path={`/${routesConst.HOME}`}>
        <HomeView />
      </Route>
      <Route path={`/${routesConst.INSTRUCTIONS}`} component={Instructions} />
    </Switch>
  </InitializationWrapper>
);
