import { routerMiddleware } from 'connected-react-router';
import { combineReducers, configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { ROUTER_PARTIAL } from '@reducers/router.reducer';
import { USER_PARTIAL } from '@reducers/user.reducer';
import { RESTAURANTS_PARTIAL } from '@reducers/restaurants.reducer';
import { history } from '@app/history';
import { HYDRATE_PARTIAL } from '@reducers/hydrate.reducer';

export function getBaseReducer() {
  return combineReducers({
    ...USER_PARTIAL,
    ...ROUTER_PARTIAL,
    ...RESTAURANTS_PARTIAL,
    ...HYDRATE_PARTIAL,
  });
}

export function createStore(initialState, baseReducer) {
  const middleware = [
    ...getDefaultMiddleware({
      immutableCheck: {
        warnAfter: 300,
      },
      serializableCheck: false,
    }),
    routerMiddleware(history),
  ];

  const enhancers = [];
  return configureStore({
    reducer: baseReducer || getBaseReducer(),
    middleware,
    enhancers,
    ...(initialState ? { preloadedState: initialState } : {}),
  });
}

export const reduxStore = createStore();
