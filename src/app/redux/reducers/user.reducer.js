import { createReducer } from '@reduxjs/toolkit';
import { USER_SECTION_NAME, UserStore } from '@stores/user.store';
import {
  setGeoLocation,
  setGeoLocationLoading,
  setSession,
  setUserUid,
} from '@actions/hydrate.action';
import { addLike, addRestaurant } from '@actions/user.actions';

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
  builder.addCase(setSession, (state, { payload }) => ({
    ...state,
    sessionId: payload,
  }));
  builder.addCase(setUserUid, (state, { payload }) => ({
    ...state,
    userUid: payload,
  }));
  builder.addCase(addLike, (state, { payload }) => ({
    ...state,
    likes: { ...state.likes, ...payload },
  }));
});

export const USER_PARTIAL = {
  [USER_SECTION_NAME]: userReducer,
};
