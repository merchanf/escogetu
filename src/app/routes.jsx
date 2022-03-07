import React from 'react';
import { Route, Switch } from 'react-router-dom';
import routesConst from '@constants/routes.constants';
import { HomeView, Instructions, SettingUp, Launcher, Match } from '@app/views/index';
import { InitializationWrapper } from '@components/initializationWrapper/initialization-wrapper';

export const routes = (
  <InitializationWrapper>
    <Switch>
      <Route exact path="/">
        <Launcher />
      </Route>
      <Route path={routesConst.SETTING_UP}>
        <SettingUp />
      </Route>
      <Route path={routesConst.SWIPE}>
        <HomeView />
      </Route>
      <Route path={routesConst.INSTRUCTIONS}>
        <Instructions />
      </Route>
      <Route path={routesConst.PROFILE}>
        <Match />
      </Route>
    </Switch>
  </InitializationWrapper>
);
