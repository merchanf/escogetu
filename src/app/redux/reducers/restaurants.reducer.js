import { createReducer } from '@reduxjs/toolkit';
import { RESTAURANTS_SECTION_NAME, RestaurantsStore } from '@stores/restaurants.store';
import {
  setRestaurants,
  setRestaurantsError,
  setRestaurantsLoading,
} from '@actions/hydrate.action';

const restaurantsReducer = createReducer(RestaurantsStore, (builder) => {
  builder.addCase(setRestaurantsLoading, (state, { payload }) => ({
    ...state,
    loading: payload,
  }));
  builder.addCase(setRestaurantsError, (state, { payload }) => ({
    ...state,
    error: payload,
  }));
  builder.addCase(setRestaurants, (state, { payload }) => ({
    ...state,
    restaurants: payload,
  }));
});

export const RESTAURANTS_PARTIAL = {
  [RESTAURANTS_SECTION_NAME]: restaurantsReducer,
};
