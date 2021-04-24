import { createReducer } from '@reduxjs/toolkit';
import { USER_SECTION_NAME, UserStore } from '@stores/user.store';
import { setGeoLocation, setGeoLocationLoading } from '@actions/hydrate.action';

const userReducer = createReducer(UserStore, (builder) => {
  builder.addCase(setGeoLocationLoading, (state, { payload }) => ({
    ...state,
    geoLocation: {
      ...state.geoLocation,
      loading: payload,
    },
  }));
  builder.addCase(setGeoLocation, (state, { payload }) => ({
    ...state,
    geoLocation: {
      ...state.geoLocation,
      location: payload,
    },
  }));
});

export const USER_PARTIAL = {
  [USER_SECTION_NAME]: userReducer,
};
