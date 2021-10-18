import { createReducer } from '@reduxjs/toolkit';
import { HYDRATE_SECTION_NAME, HydrateStore } from '@stores/hydrate.store';
import {
  setGoogleMapsClient,
  setGoogleMapsError,
  setGoogleMapsLoading,
  setGoogleMapsInstance,
} from '@actions/googleMaps.action';
import {
  setFirebaseLoading,
  setFirebaseError,
  setFirebaseInstance,
  setDatabaseInstance,
  setFirebaseStorage,
} from '@actions/firebase.actions';

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
  builder.addCase(setGoogleMapsInstance, (state, { payload }) => ({
    ...state,
    googleMaps: {
      ...state.googleMaps,
      googleMaps: payload,
    },
  }));
  builder.addCase(setFirebaseLoading, (state, { payload }) => ({
    ...state,
    firebase: {
      ...state.firebase,
      loading: payload,
    },
  }));
  builder.addCase(setFirebaseError, (state, { payload }) => ({
    ...state,
    firebase: {
      ...state.firebase,
      error: payload,
    },
  }));
  builder.addCase(setFirebaseInstance, (state, { payload }) => ({
    ...state,
    firebase: {
      ...state.firebase,
      instance: payload,
    },
  }));
  builder.addCase(setDatabaseInstance, (state, { payload }) => ({
    ...state,
    firebase: {
      ...state.firebase,
      database: payload,
    },
  }));
  builder.addCase(setFirebaseStorage, (state, { payload }) => ({
    ...state,
    firebase: {
      ...state.firebase,
      storage: payload,
    },
  }));
});

export const HYDRATE_PARTIAL = {
  [HYDRATE_SECTION_NAME]: hydrateReducer,
};
