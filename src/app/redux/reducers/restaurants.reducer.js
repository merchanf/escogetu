import { createReducer } from '@reduxjs/toolkit';
import { RESTAURANTS_SECTION_NAME, RestaurantsStore } from '@stores/restaurants.store';

const restaurantsReducer = createReducer(RestaurantsStore, (builder) => {

});

export const RESTAURANTS_PARTIAL = {
  [RESTAURANTS_SECTION_NAME]: restaurantsReducer,
};
