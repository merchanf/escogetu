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
import { setRestaurantDetails, setRestaurantDetailsPictures } from '@actions/session.action';
import { setHydrating, setLoading, setNewBatch } from '@actions/hydrate.action';

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
  builder.addCase(setHydrating, (state, { payload }) => ({
    ...state,
    hydrating: payload,
  }));
  builder.addCase(setRestaurantDetails, (state, { payload }) => {
    const { ref, ...restaurantDetails } = payload;
    return {
      ...state,
      application: {
        ...state.application,
        restaurants: {
          ...state.application.restaurants,
          [restaurantDetails.placeId]: restaurantDetails,
        },
      },
    };
  });
  builder.addCase(setRestaurantDetailsPictures, (state, { payload }) => {
    const { placeId, pictures, lowResPictures } = payload;
    const restaurant = state.application.restaurants[placeId];
    const newRestaurant = {
      ...restaurant,
      pictures,
      lowResPictures,
    };
    return {
      ...state,
      application: {
        ...state.application,
        restaurants: {
          ...state.application.restaurants,
          [placeId]: newRestaurant,
        },
      },
    };
  });
  builder.addCase(setLoading, (state, { payload }) => {
    return {
      ...state,
      application: {
        ...state.application,
        loading: payload,
      },
    };
  });
  builder.addCase(setNewBatch, (state, { payload }) => {
    return {
      ...state,
      application: {
        ...state.application,
        newBatch: payload,
      },
    };
  });
});

export const HYDRATE_PARTIAL = {
  [HYDRATE_SECTION_NAME]: hydrateReducer,
};
