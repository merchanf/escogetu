import { createReducer } from '@reduxjs/toolkit';
import { HYDRATE_SECTION_NAME, HydrateStore } from '@stores/hydrate.store';
import {
  setGoogleMapsClient,
  setGoogleMapsError,
  setGoogleMapsLoading,
} from '@actions/googleMaps.action';

const hydrateReducer = createReducer(HydrateStore, (builder) => {
  builder.addCase(setGoogleMapsLoading, (state, { payload }) => ({
    ...state,
    googleMaps: {
      ...state.googleMaps,
      loading: payload,
    },
  }));
  builder.addCase(setGoogleMapsError, (state, { payload }) => ({
    ...state,
    googleMaps: {
      ...state.googleMaps,
      error: payload,
    },
  }));
  builder.addCase(setGoogleMapsClient, (state, { payload }) => ({
    ...state,
    googleMaps: {
      ...state.googleMaps,
      client: payload,
    },
  }));
});

export const HYDRATE_PARTIAL = {
  [HYDRATE_SECTION_NAME]: hydrateReducer,
};
